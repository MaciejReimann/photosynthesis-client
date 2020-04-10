import { GameConfig } from "../config/gameboardConfig"
import { GamefieldViewController } from "./gamefield-view-controller"

export enum DisplayProperty {
  SeedableFields = "seedable fields",
}

export class GameboardViewController {
  private isSeedableFieldsSelected: boolean

  constructor(readonly config: GameConfig, readonly gameboard: any) {
    this.config = config
    this.gameboard = gameboard
    this.isSeedableFieldsSelected = false
  }

  // setters

  setDisplayProperty(prop: DisplayProperty): void {
    if (prop === DisplayProperty.SeedableFields)
      this.isSeedableFieldsSelected = true
  }

  // getters

  getGameFields(): GamefieldViewController[] {
    return this.gameboard
      .getGamefields()
      .map(
        (field: any, i: number) =>
          new GamefieldViewController(field, this.getOffsetFromCenter(i))
      )
  }

  getHexGrid() {
    return this.gameboard.getHexGrid()
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
    const field = this.getHexGrid()[fieldIndex].toPoint()

    const offsetValue = gamefieldConfig.radius + gamefieldConfig.distance

    return {
      x: field.x * offsetValue + center.x,
      y: field.y * offsetValue + center.y,
    }
  }
}
