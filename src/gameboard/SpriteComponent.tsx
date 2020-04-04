import React from "react"
import { Layer, Circle } from "react-konva"

import { Point } from "../utils/Point"
import { Tree } from "../models/gamefield"

interface SpriteComponentProps extends Point {
  tree: Tree
}

export function SpriteComponent({ tree, ...props }: SpriteComponentProps) {
  switch (tree) {
    case Tree.Small:
      return <SmallTree {...props} />
    default:
      return null
  }
}

const SmallTree = (props: any) => (
  <Circle radius={10} {...props} fill={"black"} />
)
