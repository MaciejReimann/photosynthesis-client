import { Grid } from "honeycomb-grid"
import { GameConfig } from "../config/gameboardConfig"

import { GameboardModel } from "../models/gameboard-model"
import { GamefieldModel } from "../models/gamefield-model"

import { HexgridViewController } from "./hexgrid-view-controller"
import { GamefieldViewController } from "./gamefield-view-controller"

export enum DisplayProperty {
  Default = "default",
  SeedableFields = "seedable fields",
}

export class GameboardViewController {
  readonly gemeboardModel: GameboardModel
  readonly gamefieldControllers: Grid<GamefieldViewController>

  private isSeedableFieldsSelected: boolean = false

  constructor(
    readonly config: GameConfig,
    readonly gameboardModel: GameboardModel,
    readonly hexgridViewController: HexgridViewController
  ) {
    this.gemeboardModel = gameboardModel
    this.gamefieldControllers = this.buildGamefieldsControllers(
      config,
      gameboardModel,
      hexgridViewController
    )
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

      !isSeedable && gamefield.desaturate()
    })
  }

  // getters

  getGameFieldControllers(): Grid<GamefieldViewController> {
    if (this.isSeedableFieldsSelected) this.highlightSeedableFields() /// they should be stored in the model after each click
    return this.gamefieldControllers
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
    // console.log("seedableFieldsIds", seedableFieldsIds)
    return seedableFieldsIds.includes(id)
  }

  // builders

  private buildGamefieldsControllers(
    config: GameConfig,
    gameboardModel: any,
    hexgridViewController: HexgridViewController
  ): Grid<GamefieldViewController> {
    return gameboardModel.gamefieldModels.map(
      (gamefieldModel: GamefieldModel, i: number) => {
        return new GamefieldViewController(
          config,
          gamefieldModel,
          hexgridViewController
        )
      }
    )
  }
}
