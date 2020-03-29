import React from "react"
import { TreePlaceholder } from "./TreePlaceholder"
import styles from "./PlayerRepoBoard.module.scss"

export function PlayerRepoBoard() {
  return (
    <div className={styles.wrapper}>
      <TreePlaceholder />
      Board
    </div>
  )
}
