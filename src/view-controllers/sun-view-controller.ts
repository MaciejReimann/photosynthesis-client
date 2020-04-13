import { intersection } from "lodash"

import { GameConfig } from "../config/gameboardConfig"

import { SunModel, Direction } from "../models/sun-model"
import { HoneycombHex } from "../models/gameboard-model"
import { Point } from "../models/point-model"

import { HexgridViewController } from "./hexgrid-view-controller"

export class SunViewController {
  constructor(
    readonly config: GameConfig, // we'll need some values later, prbly
    readonly hexgridViewController: HexgridViewController,
    readonly sunModel: SunModel
  ) {
    this.sunModel = sunModel
    this.hexgridViewController = hexgridViewController
  }

  // getters

  getSunrayRenderCoordinates(): Point[] {
    return this.getHexesFacingSun().map((hex: HoneycombHex) =>
      this.getRenderCoordinates(hex)
    )
  }

  // move this to hex view controller
  private getRenderCoordinates(hex: HoneycombHex): Point {
    const point = hex.toPoint()
    return this.hexgridViewController.getPointCenterOffset(point)
  }

  private getHexesFacingSun(): HoneycombHex[] {
    const sunDirection = this.sunModel.getSunDirection()
    const adjacentDirections = this.sunModel.getdjacentSunDirections()

    const hexesWithSun = this.getHexesWithSun(sunDirection)

    const hexesLeftSlope = hexesWithSun.filter((hex: HoneycombHex) =>
      this.hexgridViewController.hexgridModel.hasNeighboursInDirection(
        hex,
        adjacentDirections[0]
      )
    )
    const hexesRightSlope = hexesWithSun.filter((hex: HoneycombHex) =>
      this.hexgridViewController.hexgridModel.hasNeighboursInDirection(
        hex,
        adjacentDirections[1]
      )
    )

    return intersection(hexesLeftSlope, hexesRightSlope)
  }

  private getHexesWithSun(sunPosition: Direction): HoneycombHex[] {
    const outerHexes = this.hexgridViewController.hexgridModel.getOuterHexes()
    return outerHexes.filter((hex: HoneycombHex) => {
      return this.hexgridViewController.hexgridModel.hasNeighboursInDirection(
        hex,
        sunPosition
      )
    })
  }
}
