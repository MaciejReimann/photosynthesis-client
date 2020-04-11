import { GamefieldBackground } from "../config/gameboardConfig"
import { Point } from "../models/point-model"
import {
  BasicFieldModel,
  GamefieldModel,
  GamefieldDistance,
} from "../models/gamefield-model"
import { TreeSize } from "../models/tree-model"

import { mapFertilityIndexToDistanceFromCenter } from "../models/utils"

class DefaultFieldController {
  constructor(
    readonly fieldModel: BasicFieldModel,
    readonly center: Point,
    readonly color: GamefieldBackground
  ) {
    this.fieldModel = fieldModel
    this.center = center
  }

  getCenterCoords(): Point {
    return this.center
  }

  getColor(): GamefieldBackground {
    return this.color
  }

  getId(): number {
    return this.fieldModel.id
  }
}

export class SunRayDisplay extends DefaultFieldController {
  constructor(
    readonly fieldModel: BasicFieldModel,
    readonly center: Point,
    readonly color: GamefieldBackground
  ) {
    super(fieldModel, center, color)
  }
}

export class GamefieldViewController extends DefaultFieldController {
  public isDesaturated: boolean

  constructor(
    readonly fieldModel: GamefieldModel,
    readonly center: Point,
    readonly color: GamefieldBackground
  ) {
    super(fieldModel, center, color)
    this.isDesaturated = false
  }

  // setters

  desaturate(): void {
    this.isDesaturated = true
  }

  // getters

  getOpacity(): number {
    return this.isDesaturated ? 0.5 : 1
  }

  getDistanceFromCenter(): GamefieldDistance {
    return mapFertilityIndexToDistanceFromCenter(this.fieldModel.fertility)
  }

  getTree(): TreeSize {
    return this.fieldModel.getTree()
  }

  onClick(): void {
    this.fieldModel.growTree()
  }
}
