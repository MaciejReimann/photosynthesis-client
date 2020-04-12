import React from "react"
import { Circle } from "../shapes/Circle"
import { TreeSize } from "../photosynthesis/types"

import styles from "./TreePlaceholder.module.scss"

interface TreePlaceholderProps {
  size?: TreeSize
}

export function TreePlaceholder({
  size = TreeSize.Small
}: TreePlaceholderProps) {
  const numericSize = treeSizesNumericValues[size]

  const pricetagSize = 20

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.pricetag}
        style={getPriceTagPosition({
          placeholderSize: numericSize,
          pricetagSize
        })}
      >
        <Circle
          size={20}
          strokeWidth={2}
          strokeColor={"black"}
          fillColor="white"
        />
      </div>
      <div className={styles.placeholder}>
        <Circle
          size={numericSize}
          strokeWidth={2}
          strokeColor={"black"}
          fillColor="green"
        />
      </div>
    </div>
  )
}

const treeSizesNumericValues: { [key in TreeSize]: number } = {
  small: 40,
  medium: 60,
  large: 80
}

function getPriceTagPosition({
  placeholderSize,
  pricetagSize
}: {
  placeholderSize: number
  pricetagSize: number
}): AbsolutePosition {
  return {
    top: `-${pricetagSize / 2 - placeholderSize / 10}px`,
    right: `-${pricetagSize / 2 - placeholderSize / 10}px`
  }
}

type AbsolutePosition = {
  top: string
  right: string
}
