import React from "react"
import { Layer } from "react-konva"

import { GameboardViewController } from "../../view-controllers/gameboard-view-controller"
import { GamefieldViewController } from "../../view-controllers/gamefield-view-controller"

import { GameboardField } from "./GameboardField"
import { SpriteComponent } from "./SpriteComponent"

interface GameboardProps {
  controller: GameboardViewController
  onClick: (i: number) => void
}

export function Gameboard({ controller, onClick }: GameboardProps) {
  return (
    <Layer>
      {controller.gamefieldControllers.map(
        (field: GamefieldViewController, i: number) => {
          const fieldCenter = field.getCenter()
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
              radius={field.getRadius()}
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
        }
      )}
    </Layer>
  )
}
