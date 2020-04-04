import React, { useState } from "react"
import { Stage, Layer, Text, Circle, RegularPolygon } from "react-konva"

import { colorsGradient } from "./config/gameboardConfig"
import { GameboardModel } from "./models/gameboard-model"
import { Gameboard, SunPosition } from "./gameboard/Gameboard"
import { Point } from "./utils/Point"

const gameBoard = new GameboardModel()

function App() {
  const width = window.innerWidth
  const height = window.innerHeight
  const center = new Point(width / 2, height / 2.5)

  const [counter, setCounter] = useState(0)
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
          sunPosition={SunPosition.West}
          gameboard={gameBoard}
          onClick={() => setCounter(counter + 1)}
        />
      </Stage>
    </div>
  )
}

export default App
