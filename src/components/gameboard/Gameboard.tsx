import React from "react"
import { Layer } from "react-konva"

import { SunPosition } from "../../models/sun-model"

import {
  SunRayDisplay,
  GamefieldViewController,
} from "../../view-controllers/gamefield-view-controller"

import { GameboardField } from "./GameboardField"
import { SpriteComponent } from "./SpriteComponent"
import { SunRay } from "./SunRay"

interface GameboardProps {
  sunPosition: SunPosition
  shadowDirection: SunPosition
  controller: any
  onClick: any
}

export function Gameboard({
  sunPosition,
  shadowDirection,
  controller,
  onClick,
}: GameboardProps) {
  return (
    <Layer>
      {controller
        .getGameFieldControllers()
        .map((field: GamefieldViewController | SunRayDisplay, i: number) => {
          const fieldCenter = field.getCenterCoords()
          const key = `${fieldCenter.x}${i}`

          if (field instanceof GamefieldViewController) {
            const handleClick = () => {
              controller.onClickField(i)
              field.onClick()
              onClick()
            }

            return (
              <GameboardField
                opacity={field.getOpacity()}
                fill={field.getColor()}
                radius={controller.getGameboardRadius()}
                x={fieldCenter.x}
                y={fieldCenter.y}
                key={key}
                onClick={handleClick}
                onMouseover={() => controller.onMouseoverField(i)}
              >
                <SpriteComponent
                  tree={field.getTree()}
                  x={fieldCenter.x}
                  y={fieldCenter.y}
                />
              </GameboardField>
            )
          } else {
            return <SunRay x={fieldCenter.x} y={fieldCenter.y} key={key} />
          }
        })}
    </Layer>
  )
}
