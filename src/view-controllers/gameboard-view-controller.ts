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

  highlightSeedableFields(): void {
    this.isSeedableFieldsSelected = true

    this.gamefieldControllers.forEach((gamefieldController) => {
      const isSeedable = this.gemeboardModel.isFieldSeedable(
        gamefieldController.getId()
      )

      !isSeedable && gamefieldController.desaturate()
    })
  }

  resetSeedableFields(): void {
    this.isSeedableFieldsSelected = false

    this.gamefieldControllers.forEach((gamefieldController) => {
      gamefieldController.reset()
    })
  }

  // getters

  // event handlers

  onMouseoverField(fieldIndex: number): void {
    // if (this.isSeedableFieldsSelected) {
    //   return console.log("onMouseoverField SEEDABLE", fieldIndex)
    // }
    // console.log("onMouseoverField OTHER", fieldIndex)
  }

  onClickField(fieldIndex: number): void {
    console.log("onClickField", fieldIndex)
  }

  // helpers

  // builders

  private buildGamefieldsControllers(
    config: GameConfig,
    gameboardModel: any,
    hexgridViewController: HexgridViewController
  ): Grid<GamefieldViewController> {
    return gameboardModel.gamefieldModels.map(
      (gamefieldModel: GamefieldModel) => {
        return new GamefieldViewController(
          config,
          gamefieldModel,
          hexgridViewController
        )
      }
    )
  }
}
