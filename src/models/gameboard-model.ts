import { defineGrid, extendHex, Hex, Grid, HexFactory } from "honeycomb-grid"
import { union } from "lodash"

import { HexgridModel } from "./hexgrid-model"
import { GamefieldModel, GamefieldDistance } from "./gamefield-model"
import { Point } from "./point-model"
import { mapDistanceFromCenterToFertilityIndex } from "./utils"

export type HoneycombHex = Hex<HexFactory<{}>>
export type HexGrid = Grid<HoneycombHex>
export type GamefieldGrid = Grid<GamefieldModel>

export class GameboardModel {
  readonly hex: any
  readonly hexGrid: HexGrid
  readonly gamefieldModelsGrid: GamefieldGrid

  constructor(readonly hexgridModel: HexgridModel) {
    this.hex = extendHex()
    this.hexGrid = hexgridModel.grid // TODO: move all grid related method to the model
    this.gamefieldModelsGrid = this.hexGrid.map(this.buildGamefieldFromHex)
  }

  // setters

  activateAllGamefields(): void {
    // this.gamefieldModelsGrid.forEach(
    //   (f) => f instanceof GamefieldModel && f.setHasBeentouched(false)
    // )
  }

  // getters

  getGamefieldModelsGrid(): Grid<GamefieldModel> {
    return this.gamefieldModelsGrid
  }

  getGamefieldModelById(id: number): GamefieldModel {
    return this.getGamefieldModelsGrid()[id] as GamefieldModel
  }

  getSeedableFieldsIds(): number[] {
    const fieldsInSeedableRange = this.getFieldsInSeedableRange()

    const emptyFieldsInRange = this.removeNonEmptyFields(fieldsInSeedableRange)

    return this.getFieldsIds(emptyFieldsInRange)
  }

  getHexCoordsById(id: number): HoneycombHex {
    return this.hexGrid[id]
  }

  getTreesCount(): number {
    return this.getFieldsWithTrees().length
  }

  // helpers

  // private getGamefieldModels(): Grid<GamefieldModel> {
  //   return this.gamefieldModelsGrid.filter(
  //     (f) => f instanceof GamefieldModel
  //   ) as Grid<GamefieldModel>
  // }

  private removeNonEmptyFields(gamefields: GamefieldModel[]): GamefieldModel[] {
    return gamefields.filter((f) => f.isEmpty())
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
    const gameFieldsInRange = this.gamefieldModelsGrid.filter((f) =>
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

  private getIdByHexCoords(coords: Point): number {
    return this.hexGrid.indexOf(coords)
  }

  private getFieldsWithTrees(): GamefieldGrid {
    return this.gamefieldModelsGrid.filter((f) => f.hasTree())
  }

  private buildGamefieldFromHex(hex: HoneycombHex, id: number): GamefieldModel {
    const centerHex = extendHex()(0, 0)
    const dist = hex.distance(centerHex) as GamefieldDistance
    const fertility = mapDistanceFromCenterToFertilityIndex(dist)
    return new GamefieldModel({
      id,
      fertility,
    })
  }
}
