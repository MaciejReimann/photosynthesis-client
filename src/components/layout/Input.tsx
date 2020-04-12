import React from "react"

import styles from "./Input.module.scss"

interface InputProps {
  children?: JSX.Element
}

export function Input(props: InputProps) {
  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        placeholder="What's your name?"
        className={styles.wrapper}
      ></input>
    </div>
  )
}
