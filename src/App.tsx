import React, { useState } from "react"
import { Stage, Layer, Text, Circle, RegularPolygon } from "react-konva"

// Config
import { GameConfig } from "./config/gameboardConfig"

// Models
import { PlayerModel } from "./models/player-model"
import { GameboardModel } from "./models/gameboard-model"
import { SunModel } from "./models/sun-model"
import { GameModel } from "./models/game-model"

// View Controllers
// import {PlayerViewController} from "./view-controllers/player-view-controller"
import {
  GameboardViewController,
  DisplayProperty,
} from "./view-controllers/gameboard-view-controller"
import { SunViewController } from "./view-controllers/sun-view-controller"
import {
  GameViewController,
  ActionCategory,
} from "./view-controllers/game-view-controller"
import { PlayerVewController } from "./view-controllers/player-view-controller"

/// Utils
import { Point } from "./utils/Point"
import { GameStateSerializer } from "./serializers/game-serializer"
// UI Components

import { Layout } from "./components/layout/Layout"
import { Button } from "./components/Button"
import { Gameboard } from "./components/gameboard/Gameboard"
import styles from "./UserLayout.module.scss"

const { innerWidth, innerHeight } = window
const center = new Point(innerWidth / 2, innerHeight / 2.5)
const defaultConfig = new GameConfig(center)

const playerModel = new PlayerModel(0)

const gameboardModel = new GameboardModel()
const sunModel = new SunModel()

const gameModel = new GameModel(playerModel, gameboardModel, sunModel)

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

const playerViewController = new PlayerVewController(playerModel)

function App() {
  const [counter, setCounter] = useState(0)
  const incrementCounter = () => setCounter(counter + 1)

  // const serializedGame = new GameStateSerializer(game).serialize()

  // const stringifiedGame = JSON.stringify(serializedGame)
  // const parsedGame = JSON.parse(stringifiedGame)

  // console.log("stringifiedGame", stringifiedGame)
  // console.log("parsedGame", parsedGame)

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
            onClick={() => {
              gameViewController.setActionCategory(ActionCategory.MakeMove)
              incrementCounter()
            }}
          >
            Small Tree
          </Button>
        </div>
      </>
    </Layout>
  )
}

export default App
