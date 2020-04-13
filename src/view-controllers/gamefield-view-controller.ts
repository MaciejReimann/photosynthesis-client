import { GamefieldBackground } from "../config/gameboardConfig"

import { Point } from "../models/point-model"
import { GamefieldModel, GamefieldDistance } from "../models/gamefield-model"
import { TreeSize } from "../models/tree-model"

import { mapFertilityIndexToDistanceFromCenter } from "../models/utils"

export class GamefieldViewController {
  public isDesaturated: boolean

  constructor(
    readonly fieldModel: GamefieldModel,
    readonly center: Point,
    readonly color: GamefieldBackground
  ) {
    this.fieldModel = fieldModel
    this.center = center
    this.color = color
    this.isDesaturated = false
  }

  // setters

  desaturate(): void {
    this.isDesaturated = true
  }

  // getters

  getCenterCoords(): Point {
    return this.center
  }

  getColor(): GamefieldBackground {
    return this.color
  }

  getId(): number {
    return this.fieldModel.id
  }

  getOpacity(): number {
    return this.isDesaturated ? 0.5 : 1
  }

  getDistanceFromCenter(): GamefieldDistance {
    return mapFertilityIndexToDistanceFromCenter(this.fieldModel.fertility)
  }

  getTree(): TreeSize {
    return this.fieldModel.getTree()
  }
}
