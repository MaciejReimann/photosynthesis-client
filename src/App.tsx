import React, { useState, useEffect, SetStateAction } from "react"
import { Stage, Layer, Text, Circle, RegularPolygon } from "react-konva"

// Config
import { GameConfig } from "./config/gameboardConfig"
import { initializeGameViewControllers } from "./initializers/initializers"

/// Utils
import { Point } from "./models/point-model"
// import { GameStateSerializer } from "./serializers/game-serializer"

// UI Components
import { Layout } from "./components/layout/Layout"
import { Button } from "./components/Button"
import { Gameboard } from "./components/gameboard/Gameboard"
import { Sun } from "./components/sun/Sun"
import styles from "./UserLayout.module.scss"

const { innerWidth, innerHeight } = window
const center = new Point(innerWidth / 2, innerHeight / 2.5)
const defaultConfig = new GameConfig(center)

// TODO: move this to a hook
const {
  playerViewController,
  gameboardViewController,
  sunViewController,
  gameViewController,
} = initializeGameViewControllers(defaultConfig)

function App() {
  const [counter, setCounter] = useState(0)
  const incrementCounter = () => setCounter(counter + 1)

  const isSmallTreeBlocked = gameViewController.isPlantingSmallTreeBlocked()
  const isGrowingBlocked = gameViewController.isGrowingTreeBlocked()
  return (
    <Layout>
      <>
        <Stage width={innerWidth} height={innerHeight}>
          <Gameboard
            controller={gameboardViewController}
            onClick={(i: number) => {
              gameViewController.onClickField(i)
              incrementCounter()
            }}
          />
          <Sun controller={sunViewController} />
        </Stage>

        <div className={styles.button3}>
          <Button
            disabled={
              !isSmallTreeBlocked ? isSmallTreeBlocked : isGrowingBlocked
            }
            onClick={() => {
              gameViewController.willMakeMove()
              incrementCounter()
            }}
          >
            {!isSmallTreeBlocked ? "Small Tree" : "Grow Tree"}
          </Button>
        </div>

        <div className={styles.button2}>
          <Button
            disabled={gameViewController.isSeedingBlocked()}
            onClick={() => {
              gameViewController.willSeed()
              incrementCounter()
            }}
          >
            Seed
          </Button>
        </div>

        <div className={styles.button1}>
          <Button
            onClick={() => {
              gameViewController.nextRound()
              incrementCounter()
            }}
          >
            Next Round
          </Button>
        </div>
      </>
    </Layout>
  )
}

export default App
