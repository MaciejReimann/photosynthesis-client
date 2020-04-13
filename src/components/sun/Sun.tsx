import React from "react"
import { Layer } from "react-konva"

import { Point } from "../../models/point-model"
import { SunViewController } from "../../view-controllers/sun-view-controller"

import { Sunray } from "./Sunray"

interface SunraysProps {
  controller: SunViewController
}

export function Sun({ controller }: SunraysProps) {
  const anchorPoints = controller.getSunrayRenderCoordinates()

  return (
    <Layer>
      {anchorPoints.map((point: Point) => (
        <Sunray x={point.x} y={point.y} />
      ))}
    </Layer>
  )
}
