import React from "react"

import styles from "./Button.module.scss"

interface ButtonProps {
  onClick: () => void
}

export function Button({ ...props }: ButtonProps) {
  return (
    <button className={styles.button} {...props}>
      Next Round
    </button>
  )
}
