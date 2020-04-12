import React from "react"

import { Header } from "./Header"

import styles from "./Layout.module.scss"

interface LayoutProps {
  children?: JSX.Element
}

export function Layout(props: LayoutProps) {
  return (
    <div className={styles.wrapper}>
      <Header></Header>
      {props.children}
    </div>
  )
}
