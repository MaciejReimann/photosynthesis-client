import { GameConfig } from "../config/gameboardConfig"

import { HexGrid } from "../models/gameboard-model"
import { GamefieldModel } from "../models/gamefield-model"

import { GamefieldViewController } from "./gamefield-view-controller"

export enum DisplayProperty {
  Default = "default",
  SeedableFields = "seedable fields",
}

export class GameboardViewController {
  readonly hexGrid: HexGrid
  readonly gamefieldControllers: GamefieldViewController[]
  readonly gemeboardModel: any
  private isSeedableFieldsSelected: boolean

  constructor(readonly config: GameConfig, gameboardModel: any) {
    this.config = config
    this.hexGrid = gameboardModel.getHexGrid()
    this.gemeboardModel = gameboardModel
    this.gamefieldControllers = gameboardModel
      .getGamefields()
      .map(
        (field: GamefieldModel, i: number) =>
          new GamefieldViewController(field, this.getOffsetFromCenter(i))
      )
    this.isSeedableFieldsSelected = false
  }

  // setters

  setDisplayProperty(prop: DisplayProperty): void {
    if (prop === DisplayProperty.SeedableFields)
      this.isSeedableFieldsSelected = true
  }

  highlightSeedableFields(): void {
    console.log("higlighting seedable fields")

    this.gamefieldControllers.forEach((gamefield) => {
      const isSeedable = this.isGamefieldSeedable(gamefield.getId())
      isSeedable && console.log(gamefield.getId())
      !this.isGamefieldSeedable(gamefield.getId()) && gamefield.desaturate()
    })
  }

  // getters

  getGameFields(): GamefieldViewController[] {
    return this.gamefieldControllers
  }

  getHexGrid() {
    return this.hexGrid
  }

  // event handlers

  onMouseoverField(fieldIndex: number): void {
    if (this.isSeedableFieldsSelected) {
      return console.log("onMouseoverField SEEDABLE", fieldIndex)
    }
    console.log("onMouseoverField OTHER", fieldIndex)
  }

  onClickField(fieldIndex: number): void {
    console.log("onClickField", fieldIndex)
  }

  // helpers

  private isGamefieldSeedable(id: number): boolean {
    const seedableFieldsIds = this.gemeboardModel.getSeedableFieldsIds()
    console.log("seedableFieldsIds", seedableFieldsIds)
    return seedableFieldsIds.includes(id)
  }

  private getOffsetFromCenter(fieldIndex: number) {
    const { gamefieldConfig, center } = this.config
    const field = this.hexGrid[fieldIndex].toPoint()

    const offsetValue = gamefieldConfig.radius + gamefieldConfig.distance

    return {
      x: field.x * offsetValue + center.x,
      y: field.y * offsetValue + center.y,
    }
  }
}
