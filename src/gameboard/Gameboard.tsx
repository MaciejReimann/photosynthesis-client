import React from "react"
import { Layer, Circle } from "react-konva"
import { GridGenerator } from "react-hexgrid"

import { Point } from "../utils/Point"

import { GameboardField, GameboardFieldProps } from "./GameboardField"
import { offsetToPixel } from "./helpers"

type GameboardConfig = {
  center: Point
  gamefield: GameboardFieldProps
}

interface GameboardProps {
  config: GameboardConfig
}

enum SpriteType {
  Seed = "seed",
  SmallTree = "small tree"
}

class SmallTree {}
class Seed {}

type Sprite = SmallTree | Seed

function SpriteFactory(type: SpriteType): Sprite {
  if (type === SpriteType.SmallTree) return new SmallTree()
  return new Seed()
}

class HexGameField {
  constructor(readonly coords: HexCubeCoords, readonly populatedBy?: Sprite) {
    this.coords = coords
    this.populatedBy = populatedBy
  }
}

export function Gameboard({ config }: GameboardProps) {
  const { center, gamefield } = config
  const grid = GridGenerator.hexagon(3).map(
    (hex: any, i: number) =>
      new HexGameField(
        new HexCubeCoords(hex.s, hex.r, hex.q),
        i < 5 ? SpriteFactory(SpriteType.SmallTree) : undefined
      )
  )

  return (
    <Layer>
      {grid.map((field: HexGameField, i: number) => {
        const offset = offsetToPixel(
          field.coords,
          gamefield.radius + gamefield.distance
        )
        // console.log(field)

        return (
          <GameboardField
            opacity={0.5 + 1 / (getRingIndex(field.coords) + 1)}
            fill={getColorForHex(field.coords)}
            radius={gamefield.radius}
            x={offset.x + center.x}
            y={offset.y + center.y}
            key={`${offset.x}${i}`}
          >
            {field.populatedBy && (
              <SpriteComponent
                sprite={field.populatedBy}
                x={offset.x + center.x}
                y={offset.y + center.y}
              />
            )}
          </GameboardField>
        )
      })}
    </Layer>
  )
}

interface SpriteComponentProps extends Point {
  sprite: Sprite
}

function SpriteComponent({ sprite, ...props }: SpriteComponentProps) {
  console.log(sprite)
  return <Circle radius={10} {...props} fill={"black"} />
}

enum GamefieldBackground {
  Center = "#2a5413",
  FirstRow = "#5f913a",
  SecondRow = "#8eb354",
  ThirdRow = "#adbd53"
}

function getColorForHex(hex: HexAxialCoords): string {
  const colors = [
    GamefieldBackground.Center,
    GamefieldBackground.FirstRow,
    GamefieldBackground.SecondRow,
    GamefieldBackground.ThirdRow
  ]
  return colors[getRingIndex(hex)]
}

function getRingIndex(hex: HexAxialCoords): number {
  if (hex.q === 0 && hex.r === 0) return 0
  return getHexDistance(hex, new CentralHexCoords())
}

class CentralHexCoords implements HexAxialCoords {
  readonly q = 0
  readonly r = 0
}

class HexAxialCoords {
  constructor(readonly q: number, readonly r: number) {
    this.q = q
    this.r = r
  }
}

class HexCubeCoords extends HexAxialCoords {
  constructor(readonly s: number, readonly q: number, readonly r: number) {
    super(q, r)
    this.s = s
  }
}

function getCubeDistance(hex1: HexCubeCoords, hex2: HexCubeCoords): number {
  return Math.max(
    Math.abs(hex1.q - hex2.q),
    Math.abs(hex1.r - hex2.r),
    Math.abs(hex1.s - hex2.s)
  )
}

function getHexDistance(hex1: HexAxialCoords, hex2: HexAxialCoords): number {
  var cubeHex1 = axialToCube(hex1)
  var cubeHex2 = axialToCube(hex2)
  return getCubeDistance(cubeHex1, cubeHex2)
}

function axialToCube(hex: HexAxialCoords): HexCubeCoords {
  const x = hex.q
  const z = hex.r
  const y = -x - z
  return new HexCubeCoords(x, z, y)
}
