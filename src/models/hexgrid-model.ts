import { defineGrid, extendHex, Hex, Grid, HexFactory } from "honeycomb-grid"

import { GameConfig } from "../config/gameboardConfig"

export class HexgridModel {
  private grid: any
  constructor(readonly config: GameConfig) {
    this.config = config
    this.grid = defineGrid().hexagon({ radius: 4 })
  }
}
