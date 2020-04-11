import {
  BasicFieldModel,
  GamefieldModel,
  GamefieldDistance,
} from "../models/gamefield-model"
import { TreeSize } from "../models/tree-model"

import { mapFertilityIndexToDistanceFromCenter } from "../models/utils"

export class SunRayDisplay {
  constructor(
    readonly fieldModel: BasicFieldModel,
    readonly center: any,
    readonly color: any
  ) {
    this.fieldModel = fieldModel
    this.center = center
  }

  getCenterCoords() {
    return this.center
  }
}

export class GamefieldViewController {
  public isDesaturated: boolean

  constructor(
    readonly fieldModel: GamefieldModel,
    readonly center: any,
    readonly color: any
  ) {
    this.fieldModel = fieldModel
    this.center = center
    this.isDesaturated = false
  }

  // setters

  desaturate() {
    this.isDesaturated = true
  }

  // getters
  getId(): number {
    return this.fieldModel.id
  }

  getCenterCoords() {
    return this.center
  }

  getColor() {
    return this.color
  }

  getOpacity(): number {
    return this.isDesaturated ? 0.5 : 1
  }

  getDistanceFromCenter(): GamefieldDistance {
    return mapFertilityIndexToDistanceFromCenter(this.fieldModel.fertilityIndex)
  }

  isOnOuterRing(): boolean {
    return this.getDistanceFromCenter() > 3
  }

  getTree(): TreeSize {
    return this.fieldModel.getTree()
  }

  onClick(): void {
    this.fieldModel.growTree()
  }
}
