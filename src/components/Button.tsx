import React from "react"

import styles from "./Button.module.scss"

interface ButtonProps {
  onClick: () => void
  children?: any
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  )
}
