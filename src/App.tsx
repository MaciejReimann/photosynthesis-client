import React, { useState } from "react"
import { Stage, Layer, Text, Circle, RegularPolygon } from "react-konva"

// UI Components
import { Button } from "./components/Button"

import { GameModel } from "./models/game-model"
// import { GameboardModel } from "./models/gameboard-model"
import { Gameboard } from "./components/gameboard/Gameboard"
import { Point } from "./utils/Point"

// import { GameStateSerializer } from "./serializers/game-serializer"

import styles from "./UserLayout.module.scss"

import {
  GameboardViewController,
  DisplayProperty,
} from "./view-controllers/gameboard-view-controller"
import {
  GameViewController,
  ActionCategory,
} from "./view-controllers/game-view-controller"

import { GameConfig } from "./config/gameboardConfig"

const gameModel = new GameModel()
const { innerWidth, innerHeight } = window
const center = new Point(innerWidth / 2, innerHeight / 2.5)
const defaultConfig = new GameConfig(center)

const gameboardViewController = new GameboardViewController(
  defaultConfig,
  gameModel.boardModel
)

const gameViewController = new GameViewController(gameModel)

function App() {
  const [counter, setCounter] = useState(0)
  const incrementCounter = () => setCounter(counter + 1)

  // const serializedGame = new GameStateSerializer(game).serialize()

  // const stringifiedGame = JSON.stringify(serializedGame)
  // const parsedGame = JSON.parse(stringifiedGame)

  // console.log("stringifiedGame", stringifiedGame)
  // console.log("parsedGame", parsedGame)

  return (
    <div className="App">
      <Stage width={innerWidth} height={innerHeight}>
        <Gameboard
          sunPosition={gameModel.sun.getSunDirection()}
          shadowDirection={gameModel.sun.getShadowDirection()}
          controller={gameboardViewController}
          onClick={(i: number) => {
            gameViewController.onClickField(i)
            incrementCounter()
          }}
        />
      </Stage>
      <div className={styles.button1}>
        <Button
          onClick={() => {
            gameModel.onNextRound()
            incrementCounter()
          }}
        >
          Next Round
        </Button>
      </div>
      <div className={styles.button2}>
        <Button
          onClick={() => {
            gameboardViewController.highlightSeedableFields()
            incrementCounter()
          }}
        >
          Seed
        </Button>
      </div>
      <div className={styles.button3}>
        <Button
          disabled={!gameViewController.isPlantingSmallTreeAllowed()}
          onClick={() => {
            gameViewController.setActionCategory(ActionCategory.MakeMove)
            incrementCounter()
          }}
        >
          Small Tree
        </Button>
      </div>
    </div>
  )
}

export default App
