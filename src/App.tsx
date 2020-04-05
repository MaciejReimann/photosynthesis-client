import React, { useState } from "react"
import { Stage, Layer, Text, Circle, RegularPolygon } from "react-konva"

import { Button } from "./components/Button"

import { colorsGradient } from "./config/gameboardConfig"
import { Game } from "./models/game"
import { Gameboard } from "./gameboard/Gameboard"
import { Point } from "./utils/Point"

const game = new Game()

function App() {
  const width = window.innerWidth
  const height = window.innerHeight
  const center = new Point(width / 2, height / 2.5)

  const [counter, setCounter] = useState(0)
  const incrementCounter = () => setCounter(counter + 1)
  // console.log(counter)

  return (
    <div className="App">
      <Stage width={width} height={height}>
        <Gameboard
          config={{
            center,
            gamefield: { radius: 37, distance: 10 },
            colors: { background: colorsGradient },
          }}
          sunPosition={game.sun.getSunDirection()}
          shadowDirection={game.sun.getShadowDirection()}
          gameboard={game.board}
          onClick={incrementCounter}
        />
      </Stage>
      <Button
        onClick={() => {
          game.nextRound()
          incrementCounter()
        }}
      />
    </div>
  )
}

export default App
