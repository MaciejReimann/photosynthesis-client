import React from "react"
import { Layer } from "react-konva"

import { GamefieldViewController } from "../../view-controllers/gamefield-view-controller"

import { GameboardField } from "./GameboardField"
import { SpriteComponent } from "./SpriteComponent"

interface GameboardProps {
  controller: any
  onClick: any
}

export function Gameboard({ controller, onClick }: GameboardProps) {
  return (
    <Layer>
      {controller
        .getGameFieldControllers()
        .map((field: GamefieldViewController, i: number) => {
          // no sun display here
          const fieldCenter = field.getCenterCoords()
          const key = `${fieldCenter.x}${i}`

          const handleClick = () => {
            // controller.onClickField(i)
            // field.onClick()
            onClick(i)
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
        })}
    </Layer>
  )
}
