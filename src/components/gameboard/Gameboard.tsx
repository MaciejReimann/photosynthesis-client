import React from "react"
import { Layer } from "react-konva"

import { GameConfig } from "../../config/gameboardConfig"
import { SunPosition } from "../../models/sun-model"
import { GameboardField } from "./GameboardField"
import { SpriteComponent } from "./SpriteComponent"
import { SunRay } from "./SunRay"

import {
  SunRayDisplay,
  GamefieldViewController,
} from "../../view-controllers/gamefield-view-controller"

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
  const { gamefieldConfig } = config
  const gameFields = controller.getGameFields()

  return (
    <Layer>
      {gameFields.map(
        (field: GamefieldViewController | SunRayDisplay, i: number) => {
          const fieldCenter = field.getCenterCoords()
          const key = `${fieldCenter.x}${i}`

          if (field instanceof GamefieldViewController) {
            const opacity = field.getOpacity()
            const color = field.getColor()
            const tree = field.getTree()

            const handleClick = () => {
              controller.onClickField(i)
              field.onClick()
              onClick()
            }

            return (
              <GameboardField
                opacity={opacity}
                fill={color}
                radius={gamefieldConfig.radius}
                x={fieldCenter.x}
                y={fieldCenter.y}
                key={key}
                onClick={handleClick}
                onMouseover={() => controller.onMouseoverField(i)}
              >
                <SpriteComponent
                  tree={tree}
                  x={fieldCenter.x}
                  y={fieldCenter.y}
                />
              </GameboardField>
            )
          } else {
            return <SunRay x={fieldCenter.x} y={fieldCenter.y} key={key} />
          }
        }
      )}
    </Layer>
  )
}
