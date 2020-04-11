import React from "react"
import { Layer } from "react-konva"

import { GameConfig } from "../../config/gameboardConfig"
import { SunPosition } from "../../models/sun-model"
import { GameboardField } from "./GameboardField"
import { SpriteComponent } from "./SpriteComponent"
import { SunRay } from "./SunRay"

import { GamefieldViewController } from "../../view-controllers/gamefield-view-controller"

interface GameboardProps {
  config: GameConfig
  sunPosition: SunPosition
  shadowDirection: SunPosition
  controller: any
  onClick: any
}

export function Gameboard({
  config,
  sunPosition,
  shadowDirection,
  controller,
  onClick,
}: GameboardProps) {
  const { gamefieldConfig, colorsConfig } = config
  const gameFields = controller.getGameFields()

  // console.log("sunPosition", sunPosition)

  return (
    <Layer>
      {gameFields.map((field: GamefieldViewController, i: number) => {
        const distanceFromCenter = field.getDistanceFromCenter()
        const fieldCenter = field.getCenterCoords()
        const tree = field.getTree()
        const opacity = field.isDesaturated ? 0.5 : 1

        console.log("opacity", opacity)

        const key = `${fieldCenter.x}${i}`

        const handleClick = () => {
          controller.onClickField(i)
          field.onClick()
          onClick()
        }

        return !field.isOnOuterRing() ? (
          <GameboardField
            opacity={opacity}
            fill={colorsConfig.background[distanceFromCenter]}
            radius={gamefieldConfig.radius}
            x={fieldCenter.x}
            y={fieldCenter.y}
            key={key}
            onClick={handleClick}
            onMouseover={() => controller.onMouseoverField(i)}
          >
            <SpriteComponent tree={tree} x={fieldCenter.x} y={fieldCenter.y} />
          </GameboardField>
        ) : (
          <SunRay x={fieldCenter.x} y={fieldCenter.y} key={key} />
        )
      })}
    </Layer>
  )
}
