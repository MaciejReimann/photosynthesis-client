import React from "react"

import { TreeSize } from "../photosynthesis/types"
import { TreePlaceholder } from "./TreePlaceholder"
import styles from "./PlayerRepoBoard.module.scss"

export function PlayerRepoBoard() {
  return (
    <div className={styles.wrapper}>
      Board
      <div className={styles["placeholders-wrapper"]}>
        <div className={styles["placeholders"]}>
          <TreePlaceholder /> <TreePlaceholder /> <TreePlaceholder />
          <TreePlaceholder />
        </div>
        <div className={styles["placeholders"]}>
          <TreePlaceholder size={TreeSize.Medium} />
          <TreePlaceholder size={TreeSize.Medium} />
          <TreePlaceholder size={TreeSize.Medium} />
        </div>
        <div className={styles["placeholders"]}>
          <TreePlaceholder size={TreeSize.Large} />
          <TreePlaceholder size={TreeSize.Large} />
        </div>
      </div>
    </div>
  )
}
