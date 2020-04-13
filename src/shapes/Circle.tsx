import React from "react"

interface TreeProps {
  size: number
  strokeWidth: number
  strokeColor: string
  fillColor: string
}

export function Circle({
  size,
  strokeWidth,
  strokeColor,
  fillColor
}: TreeProps) {
  const sizeWithStroke = size + strokeWidth
  const halfSizeWithStroke = sizeWithStroke / 2
  return (
    <svg height={sizeWithStroke} width={sizeWithStroke}>
      <circle
        cx={halfSizeWithStroke}
        cy={halfSizeWithStroke}
        r={size / 2}
        stroke={strokeColor}
        stroke-width={strokeWidth}
        fill={fillColor}
      />
    </svg>
  )
}
