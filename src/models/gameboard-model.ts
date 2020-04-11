import { defineGrid, extendHex, Hex, Grid, HexFactory } from "honeycomb-grid"

import { GamefieldModel, GamefieldDistances } from "./gamefield-model"
import { SunPosition } from "./sun-model"

type HoneycombDefaultHex = Hex<HexFactory<{}>>
export type HexGrid = Grid<HoneycombDefaultHex>
export type GamefieldGrid = Grid<GamefieldModel>

export class GameboardModel {
  readonly hexGrid: HexGrid
  readonly gamefields: GamefieldGrid
  readonly fields: any

  constructor() {
    this.hexGrid = defineGrid().hexagon({ radius: 4 })
    this.gamefields = this.hexGrid.map(this.buildGamefieldFromHex)
  }

  desactivateAllGamefields() {
    this.gamefields.forEach((gamefield) => gamefield.desactivate())
  }

  getGamefields(): Grid<GamefieldModel> {
    return this.gamefields
  }

  getHexGrid(): Grid<HoneycombDefaultHex> {
    return this.hexGrid
  }

  private buildGamefieldFromHex(hex: HoneycombDefaultHex): GamefieldModel {
    const centerHex = extendHex()(0, 0)
    return new GamefieldModel(
      { ...hex },
      {
        distanceFromCenter: hex.distance(centerHex) as GamefieldDistances,
      }
    )
  }
}
