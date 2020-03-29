import React from "react"
import { HexGrid, Layout, Hexagon, Text, Path, Hex } from "react-hexgrid"

function App() {
  return (
    <div className="App">
      <HexGrid width={1200} height={800} viewBox="-50 -50 100 100">
        {/* Grid with manually inserted hexagons */}
        <Layout
          size={{ x: 5, y: 5 }}
          flat={true}
          spacing={1.1}
          origin={{ x: 0, y: 0 }}
        >
          <Hexagon q={0} r={0} s={0} />
          {/* Using pattern (defined below) to fill the hexagon */}
          <Hexagon q={0} r={-1} s={1} fill="pat-1" />
          <Hexagon q={0} r={1} s={-1} />
          <Hexagon q={1} r={-1} s={0}>
            <Text>1, -1, 0</Text>
          </Hexagon>
        </Layout>
      </HexGrid>
    </div>
  )
}

export default App
