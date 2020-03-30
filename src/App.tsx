import React from "react"
import { Stage, Layer, Text, Circle, RegularPolygon } from "react-konva"

import { Gameboard, SunPosition } from "./gameboard/Gameboard"
import { Point } from "./utils/Point"

function App() {
  const width = window.innerWidth
  const height = window.innerHeight

  const center = new Point(width / 2, height / 2.5)
  return (
    <div className="App">
      <Stage width={width} height={height}>
        <Gameboard
          config={{ center, gamefield: { radius: 37, distance: 10 } }}
          sunPosition={SunPosition.West}
        />
      </Stage>
    </div>
  )
}

export default App
