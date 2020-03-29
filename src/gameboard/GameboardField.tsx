import React from "react"
import { Circle } from "react-konva"
import Konva from "konva"
// import { KonvaNodeComponent } from "konva"

export interface GameboardFieldProps extends Konva.CircleConfig {}

export const GameboardField = ({ ...props }: GameboardFieldProps) => (
  <Circle stroke="black" strokeWidth={3} {...props} />
)
