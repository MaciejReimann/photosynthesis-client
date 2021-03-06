import React from "react"
import { Circle } from "react-konva"

import { Point } from "../../models/point-model"

interface SpriteComponentProps extends Point {}

export function Sunray({ ...props }: SpriteComponentProps) {
  return <Circle radius={10} {...props} fill={"yellow"} />
}
