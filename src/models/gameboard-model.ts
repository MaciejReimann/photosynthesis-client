import { Hex, Grid, HexFactory } from "honeycomb-grid"
import { union } from "lodash"

import { HexgridModel } from "./hexgrid-model"
import { GamefieldModel } from "./gamefield-model"

export type HoneycombHex = Hex<HexFactory<{}>>
export type HexGrid = Grid<HoneycombHex>
export type GamefieldGrid = Grid<GamefieldModel>

export class GameboardModel {
  readonly gamefieldModels: GamefieldGrid

  constructor(readonly hexgridModel: HexgridModel) {
    this.gamefieldModels = hexgridModel.grid.map(this.buildGamefieldFromHex)
  }

  // setters

  activateAllGamefields(): void {
    this.gamefieldModels.forEach((f) => f.setHasBeenTouched(false))
  }

  // getters

  isFieldSeedable(id: number): boolean {
    console.log("isFieldSeedable", id, this.getSeedableFieldsIds().includes(id))
    return this.getSeedableFieldsIds().includes(id)
  }

  isFieldGrowable(id: number): boolean {
    return !this.gamefieldModels[id].isEmpty()
  }

  getSeedableFieldsIds(): number[] {
    const seedableFieldsIds = this.gamefieldModels
      .map((f: GamefieldModel) => f.getIdsOfFieldsInRange())
      .flat()
    const uniqSeedableFieldsIds = union(seedableFieldsIds)

    const emptySeedableFieldsIds = uniqSeedableFieldsIds.filter(
      (id: number) => {
        return this.gamefieldModels[id].isEmpty()
      }
    )

    return emptySeedableFieldsIds
  }

  getTreesCount(): number {
    return this.getFieldsWithTrees().length
  }

  // helpers

  private getFieldsWithTrees(): GamefieldGrid {
    return this.gamefieldModels.filter((f) => f.hasTree())
  }

  // builders

  private buildGamefieldFromHex(
    hex: HoneycombHex,
    id: number,
    hexgrid: HexGrid
  ): GamefieldModel {
    return new GamefieldModel(hex, id, hexgrid)
  }
}
