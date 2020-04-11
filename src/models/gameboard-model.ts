import { defineGrid, extendHex, Hex, Grid, HexFactory } from "honeycomb-grid"
import { union } from "lodash"

import {
  GamefieldModel,
  GamefieldDistance,
  FertilityIndex,
} from "./gamefield-model"
import { SunPosition } from "./sun-model"

type HoneycombDefaultHex = Hex<HexFactory<{}>>
export type HexGrid = Grid<HoneycombDefaultHex>
export type GamefieldGrid = Grid<GamefieldModel>

export class GameboardModel {
  readonly hex: any
  readonly hexGrid: HexGrid
  readonly gamefields: GamefieldGrid
  readonly fields: any

  constructor() {
    this.hex = extendHex()
    this.hexGrid = defineGrid().hexagon({ radius: 4 })
    this.gamefields = this.hexGrid.map(this.buildGamefieldFromHex)
  }

  desactivateAllGamefields() {
    this.gamefields.forEach((gamefield) => gamefield.desactivate())
  }

  getGamefields(): Grid<GamefieldModel> {
    return this.gamefields
  }

  getSeedableFieldsIds(): number[] {
    const fieldsWithTrees = this.getFieldsWithTrees()
    const fieldsInSeedableRange = fieldsWithTrees
      .map((f) => this.getNeighbours(f.coords))
      .flat()
    const fieldsInSeedableRangeWithoutDuplicates = union(fieldsInSeedableRange)
    const emptyFieldsInRange = fieldsInSeedableRangeWithoutDuplicates.filter(
      (f) => f.isEmpty()
    )
    const seedableFieldsIds = emptyFieldsInRange.map((f) => f.id)

    // console.log(
    //   "fieldsInSeedableRangeWithoutDuplicates",
    //   fieldsInSeedableRangeWithoutDuplicates
    // )
    // console.log("emptyFieldsInRange", emptyFieldsInRange)
    return seedableFieldsIds
  }

  getHexGrid(): Grid<HoneycombDefaultHex> {
    return this.hexGrid
  }

  private getNeighbours(coords: any) {
    const neighbours = this.hexGrid.hexesInRange(
      this.hex(coords.x, coords.y),
      1,
      false
    )

    const gameFieldsInRange = this.gamefields.filter((gamefield) =>
      neighbours.some(
        (n) => n.x === gamefield.coords.x && n.y === gamefield.coords.y
      )
    )

    // console.log("getNeighbours", gameFieldsInRange.)
    return gameFieldsInRange.filter((f) => f.distanceFromCenter < 4)
  }

  private getFieldsWithTrees(): Grid<GamefieldModel> {
    return this.gamefields.filter(
      (gamefield: GamefieldModel) => gamefield.hasTree() && gamefield
    )
  }

  private buildGamefieldFromHex(
    hex: HoneycombDefaultHex,
    i: number
  ): GamefieldModel {
    const centerHex = extendHex()(0, 0)
    const dist = hex.distance(centerHex) as GamefieldDistance
    return new GamefieldModel(
      { ...hex },
      {
        id: i,
        distanceFromCenter: dist,
        fertilityIndex: mapDistanceFromCenterToFertilityIndex(dist),
      }
      // gridModel: this.hexGrid
    )
  }
}

function mapDistanceFromCenterToFertilityIndex(
  distanceFromCenter: GamefieldDistance
): FertilityIndex {
  switch (distanceFromCenter) {
    case 0:
      return 4
    case 1:
      return 3
    case 2:
      return 2
    case 3:
      return 1
  }
}
