import React from "react"
import { Layer, Text } from "react-konva"
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

export function Gameboard({ config }: GameboardProps) {
  const { center, gamefield } = config
  const grid = GridGenerator.hexagon(3)

  return (
    <Layer>
      {grid.map((hex: HexAxial, i: number) => {
        const offset = offsetToPixel(hex, gamefield.radius + gamefield.distance)

        console.log(hex)
        console.log(getRingIndex(hex))

        return (
          <GameboardField
            opacity={0.5 + 1 / (getRingIndex(hex) + 1)}
            fill={getColorForHex(hex)}
            radius={gamefield.radius}
            x={offset.x + center.x}
            y={offset.y + center.y}
            key={`${offset.x}${i}`}
          >
            {/* <Text text="Some text on canvas" fontSize={15} /> */}
          </GameboardField>
        )
      })}
    </Layer>
  )
}

function getColorForHex(hex: HexAxial): string {
  const colors = [
    GamefieldBackground.Center,
    GamefieldBackground.FirstRow,
    GamefieldBackground.SecondRow,
    GamefieldBackground.ThirdRow
  ]
  return colors[getRingIndex(hex)]
}

function getRingIndex(hex: HexAxial): number {
  if (hex.q === 0 && hex.r === 0) return 0
  return getHexDistance(hex, new CentralHex())
}

enum GamefieldBackground {
  Center = "#2a5413",
  FirstRow = "#5f913a",
  SecondRow = "#8eb354",
  ThirdRow = "#adbd53"
}

class CentralHex implements HexAxial {
  readonly q = 0
  readonly r = 0
}

class HexAxial {
  constructor(readonly q: number, readonly r: number) {
    this.q = q
    this.r = r
  }
}

class HexCube extends HexAxial {
  constructor(readonly s: number, readonly q: number, readonly r: number) {
    super(q, r)
    this.s = s
  }
}

function getCubeDistance(hex1: HexCube, hex2: HexCube): number {
  return Math.max(
    Math.abs(hex1.q - hex2.q),
    Math.abs(hex1.r - hex2.r),
    Math.abs(hex1.s - hex2.s)
  )
}

function getHexDistance(hex1: HexAxial, hex2: HexAxial): number {
  var cubeHex1 = axialToCube(hex1)
  var cubeHex2 = axialToCube(hex2)
  return getCubeDistance(cubeHex1, cubeHex2)
}

function axialToCube(hex: HexAxial): HexCube {
  const x = hex.q
  const z = hex.r
  const y = -x - z
  return new HexCube(x, z, y)
}
