import { defineGrid, extendHex, Hex, Grid, HexFactory } from "honeycomb-grid"

import { Direction } from "../models/sun-model"

export type HoneycombHex = Hex<HexFactory<{}>>
export type HexGrid = Grid<HoneycombHex>

export class HexgridModel {
  readonly grid: HexGrid
  readonly radius: number

  constructor(radius: number) {
    this.radius = radius
    this.grid = defineGrid().hexagon({ radius })
  }

  getOuterHexes(): HexGrid {
    const Hex = extendHex()
    return this.grid.filter((hex) => hex.distance(Hex(0, 0)) > this.radius - 1)
  }

  getNeighbourHexInDirection(
    hex: HoneycombHex,
    direction: Direction
  ): HoneycombHex {
    return this.grid.neighborsOf(hex, (direction as unknown) as number)[0]
  }

  hasNeighboursInDirection(hex: HoneycombHex, direction: Direction): boolean {
    return this.getNeighbourHexInDirection(hex, direction) !== undefined
  }
}
