import React from "react"
import { Layer } from "react-konva"

import { SunViewController } from "../../view-controllers/sun-view-controller"

import { Sunray } from "./Sunray"

interface SunraysProps {
  controller: SunViewController
}

export function Sun({ controller }: SunraysProps) {
  console.log(controller)
  return (
    <Layer>
      <Sunray x={100} y={100} />
    </Layer>
  )
}
