import React, { useState } from "react"
import { Stage, Layer, Text, Circle, RegularPolygon } from "react-konva"

// UI Components
import { Button } from "./components/Button"

import { GameModel } from "./models/game-model"
import { GameboardModel } from "./models/gameboard-model"
import { Gameboard } from "./components/gameboard/Gameboard"
import { Point } from "./utils/Point"

import styles from "./UserLayout.module.scss"

import {
  GameboardViewController,
  DisplayProperty,
} from "./view-controllers/gameboard-view-controller"

import { GameConfig } from "./config/gameboardConfig"

function App() {
  const { innerWidth, innerHeight } = window
  const center = new Point(innerWidth / 2, innerHeight / 2.5)

  const [counter, setCounter] = useState(0)
  const incrementCounter = () => setCounter(counter + 1)

  const defaultConfig = new GameConfig(center)

  const game = new GameModel()
  const gameboard = game.board

  const gameboardViewController = new GameboardViewController(
    defaultConfig,
    gameboard
  )

  // const stringifiedGame = JSON.stringify(game)
  // const parsedGame = JSON.parse(stringifiedGame)

  // console.log("stringifiedGame", stringifiedGame)
  // console.log("parsedGame", parsedGame)

  return (
    <div className="App">
      <Stage width={innerWidth} height={innerHeight}>
        <Gameboard
          config={defaultConfig}
          sunPosition={game.sun.getSunDirection()}
          shadowDirection={game.sun.getShadowDirection()}
          controller={gameboardViewController}
          onClick={incrementCounter}
        />
      </Stage>
      <div className={styles.button1}>
        <Button
          onClick={() => {
            game.nextRound()
            incrementCounter()
          }}
        >
          Next Round
        </Button>
      </div>
      <div className={styles.button2}>
        <Button
          onClick={() => {
            gameboardViewController.setDisplayProperty(
              DisplayProperty.SeedableFields
            )
          }}
        >
          Seed
        </Button>
      </div>
    </div>
  )
}

export default App
