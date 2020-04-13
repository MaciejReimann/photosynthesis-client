import { GameConfig, GamefieldBackground } from "../config/gameboardConfig"

import { Point } from "../models/point-model"
import { GameboardModel } from "../models/gameboard-model"
import { GamefieldModel } from "../models/gamefield-model"
import { mapFertilityIndexToDistanceFromCenter } from "../models/utils"

import {
  SunRayDisplay,
  GamefieldViewController,
} from "./gamefield-view-controller"

export enum DisplayProperty {
  Default = "default",
  SeedableFields = "seedable fields",
}

export class GameboardViewController {
  readonly gamefieldControllers: (GamefieldViewController | SunRayDisplay)[]
  readonly gemeboardModel: GameboardModel
  private isSeedableFieldsSelected: boolean

  constructor(readonly config: GameConfig, gameboardModel: GameboardModel) {
    this.config = config
    this.gemeboardModel = gameboardModel
    this.gamefieldControllers = this.buildGamefieldsControllers(
      config,
      gameboardModel
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
      if (gamefield instanceof GamefieldViewController) {
        const isSeedable = this.isGamefieldSeedable(gamefield.getId())

        !isSeedable && gamefield.desaturate()
      }
    })
  }

  // getters

  getGameboardRadius(): number {
    return this.config.gamefieldConfig.radius
  }

  getGameFieldControllers(): (GamefieldViewController | SunRayDisplay)[] {
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

  private getFieldColor(
    config: GameConfig,
    fieldModel: GamefieldModel
  ): GamefieldBackground {
    const distanceFromCenter = this.getDistanceFromCenter(fieldModel)
    return config.colorsConfig.background[distanceFromCenter]
  }

  private getDistanceFromCenter(fieldModel: GamefieldModel): number {
    return mapFertilityIndexToDistanceFromCenter(fieldModel.fertility)
  }

  private isGamefieldSeedable(id: number): boolean {
    const seedableFieldsIds = this.gemeboardModel.getSeedableFieldsIds()
    console.log("seedableFieldsIds", seedableFieldsIds)
    return seedableFieldsIds.includes(id)
  }

  private getRenderCoordinates(fieldIndex: number): Point {
    const { gamefieldConfig, center } = this.config
    const field = this.gemeboardModel.getHexCoordsById(fieldIndex).toPoint()

    const offsetValue = gamefieldConfig.radius + gamefieldConfig.distance

    const x = field.x * offsetValue + center.x
    const y = field.y * offsetValue + center.y

    return new Point(x, y)
  }

  private buildGamefieldsControllers(
    config: GameConfig,
    gameboardModel: any
  ): (GamefieldViewController | SunRayDisplay)[] {
    return gameboardModel
      .getGamefieldModelsGrid()
      .map((field: GamefieldModel, i: number) => {
        const offset = this.getRenderCoordinates(i)
        const color = this.getFieldColor(config, field)
        return field instanceof GamefieldModel
          ? new GamefieldViewController(field, offset, color)
          : new SunRayDisplay(field, offset, color)
      })
  }
}
