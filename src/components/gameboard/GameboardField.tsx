import React from "react"
import { Circle } from "react-konva"
import Konva from "konva"
// import { KonvaNodeComponent } from "konva"

export interface GameboardFieldProps extends Konva.CircleConfig {}

export const GameboardField = ({ children, ...props }: GameboardFieldProps) => (
  <>
    <Circle stroke="black" strokeWidth={3} {...props} />
    {children}
  </>
)
