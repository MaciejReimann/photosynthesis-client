import { defineGrid, extendHex, Hex, Grid, HexFactory } from "honeycomb-grid"
import { union } from "lodash"

import { mapDistanceFromCenterToFertilityIndex } from "./utils"
import {
  BasicFieldModel,
  GamefieldModel,
  GamefieldDistance,
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
  readonly gamefieldModelsGrid: GamefieldGrid

  constructor() {
    this.hex = extendHex()
    this.hexGrid = defineGrid().hexagon({ radius: 4 })
    this.gamefieldModelsGrid = this.hexGrid.map(this.buildGamefieldFromHex)
  }

  // setters

  desactivateAllGamefields(): void {
    this.gamefieldModelsGrid.forEach(
      (f) => f instanceof GamefieldModel && f.desactivate()
    )
  }

  // getters

  getGamefieldModelsGrid(): Grid<GameboardField> {
    return this.gamefieldModelsGrid
  }

  // getGamefieldById(id: number): void {
  //   return this.getGamefields()[id]
  // }

  getSeedableFieldsIds(): number[] {
    const fieldsInSeedableRange = this.getFieldsInSeedableRange()

    const emptyFieldsInRange = this.removeNonEmptyFields(fieldsInSeedableRange)

    return this.getFieldsIds(emptyFieldsInRange)
  }

  getHexCoordsById(id: number): HoneycombDefaultHex {
    return this.hexGrid[id]
  }

  // helpers

  // private getPlayableGamefields(): Grid<GameboardField> {
  //   return this.getGamefields()
  // }

  private removeNonEmptyFields(gamefields: GamefieldModel[]): GamefieldModel[] {
    return gamefields.filter((f) => f instanceof GamefieldModel && f.isEmpty())
  }

  private getFieldsIds(gamefields: GamefieldModel[]): number[] {
    return gamefields.map((f) => f.id)
  }

  private getFieldsInSeedableRange(): GamefieldModel[] {
    const fieldsInSeedableRange = this.getFieldsWithTrees()
      .map(
        (f) =>
          f instanceof GamefieldModel &&
          this.getNeighbours(f.id, f.getSeedableRange())
      )
      .flat()
    return union(fieldsInSeedableRange)
  }

  private getNeighbours(id: number, range: number): GamefieldGrid {
    const gameFieldsInRange = this.gamefieldModelsGrid.filter(
      (f) =>
        f instanceof GamefieldModel &&
        this.getIdsOfNeighbours(id, range).some((id) => id === f.id)
    )
    return gameFieldsInRange
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

  private getFieldsWithTrees(): GamefieldGrid {
    return this.gamefieldModelsGrid.filter(
      (f) => f instanceof GamefieldModel && f.hasTree()
    )
  }

  private buildGamefieldFromHex(
    hex: HoneycombDefaultHex,
    id: number
  ): GameboardField {
    const centerHex = extendHex()(0, 0)
    const dist = hex.distance(centerHex) as GamefieldDistance
    const fertility = mapDistanceFromCenterToFertilityIndex(dist)
    return dist < 4
      ? new GamefieldModel({
          id,
          fertility,
        })
      : new BasicFieldModel({ id })
  }
}
