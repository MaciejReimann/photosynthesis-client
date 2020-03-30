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

export enum SunPosition {
  West = "west"
}

function getShadedFields(
  sunPosition: SunPosition,
  field: HexGameField
): HexCubeCoords[] {
  if (sunPosition === SunPosition.West) {
    return [
      new HexCubeCoords(field.coords.s - 1, field.coords.q, field.coords.r + 1)
    ]
  }
  return [new HexCubeCoords(field.coords.s + 1, field.coords.q, field.coords.r)]
}

function getFieldsInShadow(
  sunPosition: SunPosition,
  grid: HexGameField[]
): HexCubeCoords[] {
  const fieldsWithTrees = grid.filter(
    (field: HexGameField) => field.populatedBy
  )

  let shadedFields: HexCubeCoords[] = []

  fieldsWithTrees.forEach((field: HexGameField) => {
    const shadedField = getShadedFields(sunPosition, field)
    shadedFields.push(...shadedField)
  })
  return shadedFields
}

function hexFieldsAreEqual(hex1: HexCubeCoords, hex2: HexCubeCoords): boolean {
  //   console.log("hex1", hex1)
  //   console.log("hex2", hex2)
  return hex1.q === hex2.q && hex1.r === hex2.r && hex1.s === hex2.s
}

interface GameboardProps {
  config: GameboardConfig
  sunPosition: SunPosition
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

export function Gameboard({ config, sunPosition }: GameboardProps) {
  const { center, gamefield } = config
  const grid = GridGenerator.hexagon(3).map(
    (hex: any, i: number) =>
      new HexGameField(
        new HexCubeCoords(hex.s, hex.q, hex.r),
        i > 5 && i < 10 ? SpriteFactory(SpriteType.SmallTree) : undefined
      )
  )

  const fieldsInShadow = getFieldsInShadow(sunPosition, grid)

  return (
    <Layer>
      {grid.map((field: HexGameField, i: number) => {
        const offset = offsetToPixel(
          field.coords,
          gamefield.radius + gamefield.distance
        )

        const isInShade = fieldsInShadow.some(f =>
          hexFieldsAreEqual(f, field.coords)
        )

        const shadeFill = isInShade ? "black" : undefined

        return (
          <GameboardField
            opacity={0.5 + 1 / (getRingIndex(field.coords) + 1)}
            fill={shadeFill || getColorForHex(field.coords)}
            radius={gamefield.radius}
            x={offset.x + center.x}
            y={offset.y + center.y}
            key={`${offset.x}${i}`}
          >
            {field.populatedBy && (
              <SpriteComponent
                {...field}
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
  console.log(props)
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
