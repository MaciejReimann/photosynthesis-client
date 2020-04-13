import React from "react"
import { Circle } from "react-konva"

import { TreeSize } from "../../models/tree-model"
import { Point } from "../../models/point-model"

interface SpriteComponentProps extends Point {
  tree: TreeSize
}

export function SpriteComponent({ tree, ...props }: SpriteComponentProps) {
  // console.log(tree)
  switch (tree) {
    case TreeSize.Seed:
      return <Seed {...props} />
    case TreeSize.Small:
      return <SmallTree {...props} />
    case TreeSize.Medium:
      return <MediumTree {...props} />
    case TreeSize.Large:
      return <LargeTree {...props} />
    default:
      return null
  }
}
const Seed = (props: any) => <Circle radius={5} {...props} fill={"black"} />

const SmallTree = (props: any) => (
  <Circle radius={10} {...props} fill={"black"} />
)

const MediumTree = (props: any) => (
  <Circle radius={15} {...props} fill={"black"} />
)

const LargeTree = (props: any) => (
  <Circle radius={20} {...props} fill={"black"} />
)
