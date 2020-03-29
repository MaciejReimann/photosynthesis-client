import React from "react"
import {
  GridGenerator,
  HexGrid,
  Layout,
  Hexagon,
  Text,
  Path,
  Hex
} from "react-hexgrid"

function App() {
  const grid = GridGenerator.hexagon(3)
  return (
    <div className="App">
      <HexGrid width={1200} height={800} viewBox="-50 -50 100 100">
        {/* Grid with manually inserted hexagons */}
        <Layout
          size={{ x: 5, y: 5 }}
          flat={false}
          spacing={1.1}
          origin={{ x: 0, y: 0 }}
        >
          {grid.map((hex: any, i: number) => (
            <Hexagon key={i} q={hex.q} r={hex.r} s={hex.s}>
              <Text>1, -1, 0</Text>{" "}
            </Hexagon>
          ))}
        </Layout>
      </HexGrid>
    </div>
  )
}

export default App
