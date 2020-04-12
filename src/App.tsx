import React, { useState } from "react"
import { Stage, Layer, Text, Circle, RegularPolygon } from "react-konva"

// Config
import { GameConfig } from "./config/gameboardConfig"

// Models
import { GameModel } from "./models/game-model"
import { PlayerModel } from "./models/player-model"

// Controllers
import {
  GameboardViewController,
  DisplayProperty,
} from "./view-controllers/gameboard-view-controller"

/// Utils
import { Point } from "./utils/Point"
import { GameStateSerializer } from "./serializers/game-serializer"
// UI Components

import { Layout } from "./components/layout/Layout"
import { Button } from "./components/Button"
import { Gameboard } from "./components/gameboard/Gameboard"
import styles from "./UserLayout.module.scss"

const player = new PlayerModel(0)
const game = new GameModel(player)
const { innerWidth, innerHeight } = window
const center = new Point(innerWidth / 2, innerHeight / 2.5)
const defaultConfig = new GameConfig(center)

const gameboardViewController = new GameboardViewController(
  defaultConfig,
  game.board
)

function App() {
  const [counter, setCounter] = useState(0)
  const incrementCounter = () => setCounter(counter + 1)

  console.log(game)

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
            sunPosition={game.sun.getSunDirection()}
            shadowDirection={game.sun.getShadowDirection()}
            controller={gameboardViewController}
            onClick={incrementCounter}
          />
        </Stage>
        <div className={styles.button1}>
          <Button
            onClick={() => {
              game.onNextRound()
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
              gameboardViewController.setDisplayProperty(
                DisplayProperty.SeedableFields
              )
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
