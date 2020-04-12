import React from "react"

import { Input } from "./Input"
import styles from "./Header.module.scss"

interface HeaderProps {
  children?: JSX.Element
}

export function Header(props: HeaderProps) {
  return (
    <div className={styles.wrapper}>
      <div>Invite players</div>
      <div className={styles["name-input"]}>
        <Input></Input>
      </div>
    </div>
  )
}
