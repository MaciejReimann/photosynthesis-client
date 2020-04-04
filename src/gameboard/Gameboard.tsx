import React from "react"
import { Layer } from "react-konva"

import { GameboardConfig } from "../config/gameboardConfig"
import { GameboardField } from "./GameboardField"
import { SpriteComponent } from "./SpriteComponent"

export enum SunPosition {
  West = "west",
}

interface GameboardProps {
  config: GameboardConfig
  sunPosition: SunPosition
  gameboard: any
}

export function Gameboard({ config, sunPosition, gameboard }: GameboardProps) {
  const { center, gamefield, colors } = config

  console.log(gameboard.grid)

  return (
    <Layer>
      {gameboard.grid.map((field: any, i: number) => {
        const offset = gamefield.radius + gamefield.distance
        const distanceFromCenter = field.getDistanceFromCenterField()
        const fieldCenter = field.getOffsetFromCenter(offset, center)

        console.log(field.props.getTree())

        return (
          <GameboardField
            opacity={0.5 + 1 / (distanceFromCenter + 1)}
            fill={colors.background[distanceFromCenter]}
            radius={gamefield.radius}
            x={fieldCenter.x}
            y={fieldCenter.y}
            key={`${field.x}${i}`}
          >
            <SpriteComponent
              tree={field.props.getTree()}
              x={field.x + center.x}
              y={field.y + center.y}
            />
          </GameboardField>
        )
      })}
    </Layer>
  )
}
