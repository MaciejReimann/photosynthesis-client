import React from "react"
import { Layer, Text } from "react-konva"
import { GridGenerator } from "react-hexgrid"

import { Point } from "../utils/Point"

import { GameboardField, GameboardFieldProps } from "./GameboardField"
import { offsetToPixel, HexAxial } from "./helpers"

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

        return (
          <GameboardField
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
