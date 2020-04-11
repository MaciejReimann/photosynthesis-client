import { defineGrid, extendHex, Hex, Grid, HexFactory } from "honeycomb-grid"
import { union } from "lodash"

import {
  mapDistanceFromCenterToFertilityIndex,
  mapFertilityIndexToDistanceFromCenter,
} from "./utils"
import {
  BasicFieldModel,
  GamefieldModel,
  GamefieldDistance,
  FertilityIndex,
} from "./gamefield-model"
import { SunPosition } from "./sun-model"

type HoneycombDefaultHex = Hex<HexFactory<{}>>
export type GameboardField = BasicFieldModel | GamefieldModel
export type HexGrid = Grid<HoneycombDefaultHex>
export type GamefieldGrid = Grid<GameboardField>
export type CartesianCoords = { x: number; y: number }

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

  desactivateAllGamefields(): void {
    this.gamefields.forEach(
      (f) => f instanceof GamefieldModel && f.desactivate()
    )
  }

  getGamefields(): Grid<GameboardField> {
    return this.gamefields
  }

  getSeedableFieldsIds(): number[] {
    const fieldsInSeedableRange = this.getFieldsInSeedableRange()

    const emptyFieldsInRange = this.removeNonEmptyFields(fieldsInSeedableRange)

    return this.getFieldsIds(emptyFieldsInRange)
  }

  getHexCoordsById(id: number): CartesianCoords {
    return this.hexGrid[id]
  }

  private removeNonEmptyFields(gamefields: GamefieldModel[]): GamefieldModel[] {
    return gamefields.filter((f) => f.isEmpty())
  }

  private getFieldsIds(gamefields: GamefieldModel[]): number[] {
    return gamefields.map((f) => f.id)
  }

  private getFieldsInSeedableRange() {
    const fieldsInSeedableRange = this.getFieldsWithTrees()
      .map(
        (f) =>
          f instanceof GamefieldModel &&
          this.getNeighbours(f.id, f.getSeedableRange())
      )
      .flat()
    return union(fieldsInSeedableRange)
  }

  private getNeighbours(id: number, range: number) {
    const gameFieldsInRange = this.gamefields.filter((f) =>
      this.getIdsOfNeighbours(id, range).some((id) => id === f.id)
    )
    return gameFieldsInRange.filter((f) => f instanceof GamefieldModel)
  }

  private getIdsOfNeighbours(id: number, range: number): number[] {
    const neighbours = this.hexGrid.hexesInRange(
      this.hex(this.getHexCoordsById(id)),
      range,
      false
    )
    return neighbours.map((n) => this.getIdByHexCoords(n))
  }

  private getIdByHexCoords(coords: CartesianCoords): number {
    return this.hexGrid.indexOf(coords)
  }

  private getFieldsWithTrees(): Grid<GameboardField> {
    return this.gamefields.filter(
      (f) => f instanceof GamefieldModel && f.hasTree()
    )
  }

  private buildGamefieldFromHex(
    hex: HoneycombDefaultHex,
    i: number
  ): GameboardField {
    const centerHex = extendHex()(0, 0)
    const dist = hex.distance(centerHex) as GamefieldDistance
    const fertilityIndex = mapDistanceFromCenterToFertilityIndex(dist)
    return dist < 4
      ? new GamefieldModel({
          id: i,
          fertilityIndex: fertilityIndex,
        })
      : new BasicFieldModel({ id: i })
  }
}
