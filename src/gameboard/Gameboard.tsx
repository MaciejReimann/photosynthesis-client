import React from "react"
import { Layer } from "react-konva"

import { GameboardConfig } from "../config/gameboardConfig"
import { SunPosition } from "../models/sun"
import { GameboardField } from "./GameboardField"
import { SpriteComponent } from "./SpriteComponent"
import { Sun } from "./Sun"

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
        const distanceFromCenter = field.getDistanceFromCenterField()
        const fieldCenter = field.getOffsetFromCenter(offset, center)

        const onFieldClick = (i: number) => {
          field.tree.grow()
          onClick()
        }

        const isSun = () => {
          const fieldOnSunnyBorder = hasNoNeighbourInDirection(
            field,
            sunPosition
          )
          // const neighbours = gameboard.grid
          //   .neighborsOf(field)
          //   .filter((f: any) => f !== undefined)
          fieldOnSunnyBorder && console.log(fieldOnSunnyBorder)

          return fieldOnSunnyBorder && fieldOnSunnyBorder.distance(field) === 0
        }

        const hasNoNeighbourInDirection = (
          field: any,
          direction: SunPosition
        ) => {
          const neighbour = gameboard.grid.neighborsOf(field, direction)[0]
          if (neighbour === undefined) {
            return field || null
          }
          hasNoNeighbourInDirection(neighbour, direction)
        }

        const getKey = () => `${field.x}${i}`

        return distanceFromCenter < 4 ? (
          <GameboardField
            opacity={0.5 + 1 / (distanceFromCenter + 1)}
            fill={colors.background[distanceFromCenter]}
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
          isSun() && <Sun x={fieldCenter.x} y={fieldCenter.y} key={getKey()} />
        )
      })}
    </Layer>
  )
}
