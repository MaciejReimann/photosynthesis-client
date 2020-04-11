import { GameConfig } from "../config/gameboardConfig"

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
  readonly gamefieldControllers: GamefieldViewController[]
  readonly gemeboardModel: any
  private isSeedableFieldsSelected: boolean

  constructor(readonly config: GameConfig, gameboardModel: any) {
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
      const isSeedable = this.isGamefieldSeedable(gamefield.getId())

      !isSeedable && gamefield.desaturate()
    })
  }

  // getters

  getGameboardRadius(): number {
    return this.config.gamefieldConfig.radius
  }

  getGameFields(): GamefieldViewController[] {
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

  private getFieldColor(config: GameConfig, fieldModel: GamefieldModel) {
    const distanceFromCenter = this.getDistanceFromCenter(fieldModel)
    return config.colorsConfig.background[distanceFromCenter]
  }

  private getDistanceFromCenter(fieldModel: GamefieldModel): number {
    return mapFertilityIndexToDistanceFromCenter(fieldModel.fertilityIndex)
  }

  private isGamefieldSeedable(id: number): boolean {
    const seedableFieldsIds = this.gemeboardModel.getSeedableFieldsIds()
    console.log("seedableFieldsIds", seedableFieldsIds)
    return seedableFieldsIds.includes(id)
  }

  private getOffsetFromCenter(fieldIndex: number) {
    const { gamefieldConfig, center } = this.config
    const field = this.gemeboardModel.getHexCoordsById(fieldIndex).toPoint()

    const offsetValue = gamefieldConfig.radius + gamefieldConfig.distance

    return {
      x: field.x * offsetValue + center.x,
      y: field.y * offsetValue + center.y,
    }
  }

  private buildGamefieldsControllers(config: GameConfig, gameboardModel: any) {
    return gameboardModel
      .getGamefields()
      .map((field: GamefieldModel, i: number) => {
        const offset = this.getOffsetFromCenter(i)
        const color = this.getFieldColor(config, field)
        return field instanceof GamefieldModel
          ? new GamefieldViewController(field, offset, color)
          : new SunRayDisplay(field, offset, color)
      })
  }
}
