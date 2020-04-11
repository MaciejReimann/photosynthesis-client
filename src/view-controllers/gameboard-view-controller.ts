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
  readonly gamefields: GamefieldViewController[]
  private isSeedableFieldsSelected: boolean

  constructor(readonly config: GameConfig, gameboard: any) {
    this.config = config
    this.hexGrid = gameboard.getHexGrid()
    this.gamefields = gameboard
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

  // getters

  getGameFields(): GamefieldViewController[] {
    return this.gamefields
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
