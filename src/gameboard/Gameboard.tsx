import React from "react"
import { Layer } from "react-konva"

import { GameboardConfig } from "../config/gameboardConfig"
import { SunPosition } from "../models/sun"
import { GameboardField } from "./GameboardField"
import { SpriteComponent } from "./SpriteComponent"
import { SunRay } from "./SunRay"

interface GameboardProps {
  config: GameboardConfig
  sunPosition: SunPosition
  shadowDirection: SunPosition
  gameboard: any
  onClick: any
}

export function Gameboard({
  config,
  sunPosition,
  shadowDirection,
  gameboard,
  onClick,
}: GameboardProps) {
  const { center, gamefield, colors } = config

  console.log("sunPosition", sunPosition)

  return (
    <Layer>
      {gameboard.grid.map((field: any, i: number) => {
        const offset = gamefield.radius + gamefield.distance
        const ringIndex = field.ringIndex
        const fieldCenter = field.getOffsetFromCenter(offset, center)

        const onFieldClick = (i: number) => {
          field.tree.grow()
          onClick()
        }

        const getKey = () => `${field.x}${i}`

        return field.tree ? (
          <GameboardField
            opacity={0.5 + 1 / (ringIndex + 1)}
            fill={colors.background[ringIndex]}
            radius={gamefield.radius}
            x={fieldCenter.x}
            y={fieldCenter.y}
            key={getKey()}
            onClick={() => onFieldClick(i)}
          >
            <SpriteComponent
              tree={field.tree.get()}
              x={fieldCenter.x}
              y={fieldCenter.y}
            />
          </GameboardField>
        ) : (
          field.isSun(sunPosition) && (
            <SunRay x={fieldCenter.x} y={fieldCenter.y} key={getKey()} />
          )
        )
      })}
    </Layer>
  )
}
