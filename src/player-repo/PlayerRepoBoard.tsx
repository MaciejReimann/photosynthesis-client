import React from "react"

import { TreeSize } from "../photosynthesis/types"
import { TreePlaceholder } from "./TreePlaceholder"
import styles from "./PlayerRepoBoard.module.scss"

export function PlayerRepoBoard() {
  return (
    <div className={styles.wrapper}>
      <TreePlaceholder />
      <TreePlaceholder size={TreeSize.Medium} />
      <TreePlaceholder size={TreeSize.Large} />
      Board
    </div>
  )
}
