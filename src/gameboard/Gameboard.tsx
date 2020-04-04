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
  onClick: any
}

export function Gameboard({
  config,
  sunPosition,
  gameboard,
  onClick,
}: GameboardProps) {
  const { center, gamefield, colors } = config

  console.log(gameboard.grid)

  return (
    <Layer>
      {gameboard.grid.map((field: any, i: number) => {
        const offset = gamefield.radius + gamefield.distance
        const distanceFromCenter = field.getDistanceFromCenterField()
        const fieldCenter = field.getOffsetFromCenter(offset, center)

        const onFieldClick = (i: number) => {
          field.tree.grow()
          onClick()
        }

        return (
          <GameboardField
            opacity={0.5 + 1 / (distanceFromCenter + 1)}
            fill={colors.background[distanceFromCenter]}
            radius={gamefield.radius}
            x={fieldCenter.x}
            y={fieldCenter.y}
            key={`${field.x}${i}`}
            onClick={() => onFieldClick(i)}
          >
            <SpriteComponent
              tree={field.tree.get()}
              x={fieldCenter.x}
              y={fieldCenter.y}
            />
          </GameboardField>
        )
      })}
    </Layer>
  )
}
