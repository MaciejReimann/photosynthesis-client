import React, { useState } from "react"
import { Stage, Layer, Text, Circle, RegularPolygon } from "react-konva"

// UI Components
import { Button } from "./components/Button"

import { GameModel } from "./models/game-model"
// import { GameboardModel } from "./models/gameboard-model"
import { Gameboard } from "./components/gameboard/Gameboard"
import { Sun } from "./components/sun/Sun"
import { Point } from "./utils/Point"

// import { GameStateSerializer } from "./serializers/game-serializer"

import styles from "./UserLayout.module.scss"

import { SunViewController } from "./view-controllers/sun-view-controller"
import {
  GameboardViewController,
  DisplayProperty,
} from "./view-controllers/gameboard-view-controller"
import {
  GameViewController,
  ActionCategory,
} from "./view-controllers/game-view-controller"

import { GameConfig } from "./config/gameboardConfig"

import { GameboardModel } from "./models/gameboard-model"
import { SunModel } from "./models/sun-model"

const { innerWidth, innerHeight } = window
const center = new Point(innerWidth / 2, innerHeight / 2.5)
const defaultConfig = new GameConfig(center)

const gameboardModel = new GameboardModel()
const sunModel = new SunModel()

const gameModel = new GameModel(gameboardModel, sunModel)

const gameboardViewController = new GameboardViewController(
  defaultConfig,
  gameboardModel
)
const sunViewController = new SunViewController(
  defaultConfig,
  sunModel,
  gameboardModel
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
          controller={gameboardViewController}
          onClick={(i: number) => {
            gameViewController.onClickField(i)
            incrementCounter()
          }}
        />
        <Sun controller={sunViewController} />
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
          // disabled={!gameViewController.isPlantingSmallTreeAllowed()}
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
