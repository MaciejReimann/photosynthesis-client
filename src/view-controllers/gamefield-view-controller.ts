import { GameConfig, GamefieldBackground } from "../config/gameboardConfig"

import { Point } from "../models/point-model"
import { GamefieldModel } from "../models/gamefield-model"
import { TreeSize } from "../models/tree-model"
import { mapFertilityIndexToDistanceFromCenter } from "../models/utils"

import { HexgridViewController } from "../view-controllers/hexgrid-view-controller"

export class GamefieldViewController {
  public isDesaturated: boolean = false

  constructor(
    readonly config: GameConfig,
    readonly fieldModel: GamefieldModel,
    readonly hexgridViewController: HexgridViewController
  ) {
    this.config = config
    this.fieldModel = fieldModel
    this.hexgridViewController = hexgridViewController
  }

  // setters

  desaturate(): void {
    this.isDesaturated = true
  }

  // getters

  getCenter(): Point {
    return this.hexgridViewController.getPointCenterOffset(
      this.fieldModel.hex.toPoint()
    )
  }

  getRadius(): number {
    return this.config.gamefieldConfig.radius
  }

  getColor(): GamefieldBackground {
    const distanceFromCenter = mapFertilityIndexToDistanceFromCenter(
      this.fieldModel.fertility
    )
    return this.config.colorsConfig.background[distanceFromCenter]
  }

  getId(): number {
    return this.fieldModel.id
  }

  getOpacity(): number {
    return this.isDesaturated ? 0.5 : 1
  }

  getTree(): TreeSize {
    return this.fieldModel.tree.get()
  }
}
