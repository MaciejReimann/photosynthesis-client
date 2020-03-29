import React from "react"
import { Circle } from "../shapes/Circle"
import { TreeSize } from "../photosynthesis/types"

interface TreePlaceholderProps {
  size?: TreeSize
}

export function TreePlaceholder({
  size = TreeSize.Small
}: TreePlaceholderProps) {
  const numericSize = treeSizesNumericValues[size]

  return (
    <Circle
      size={numericSize}
      strokeWidth={2}
      strokeColor={"black"}
      fillColor="green"
    />
  )
}

const treeSizesNumericValues: { [key in TreeSize]: number } = {
  small: 30,
  medium: 50,
  large: 70
}
