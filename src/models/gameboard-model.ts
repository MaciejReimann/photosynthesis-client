import { defineGrid, extendHex, Hex, Grid, HexFactory } from "honeycomb-grid"

import { GamefieldModel } from "./gamefield-model"
import { SunPosition } from "./sun-model"

type HoneycombDefaultHex = Hex<HexFactory<{}>>
export class GameboardModel {
  readonly hexGrid: Grid<HoneycombDefaultHex>
  readonly gamefields: any
  readonly fields: any

  constructor() {
    this.hexGrid = defineGrid().hexagon({ radius: 4 })
    this.gamefields = this.hexGrid.map(this.buildGamefieldFromHex)
  }

  private buildGamefieldFromHex(hex: HoneycombDefaultHex): GamefieldModel {
    const centerHex = extendHex()(0, 0)
    return new GamefieldModel(
      { ...hex },
      {
        distanceFromCenter: hex.distance(centerHex),
      }
    )
  }

  getGamefields(): GamefieldModel[] {
    return this.gamefields
  }

  getHexGrid() {
    return this.hexGrid
  }
}
