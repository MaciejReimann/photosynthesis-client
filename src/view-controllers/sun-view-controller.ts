import { intersection } from "lodash"
import { defineGrid, extendHex, Hex, Grid, HexFactory } from "honeycomb-grid"

import { GameConfig, GamefieldBackground } from "../config/gameboardConfig"

import { SunModel, SunPosition } from "../models/sun-model"
import {
  GameboardModel,
  HexGrid,
  HoneycombHex,
} from "../models/gameboard-model"
import { Point } from "../models/point-model"

export class SunViewController {
  private hexgrid: HexGrid
  private outerHexes: any

  constructor(
    readonly config: GameConfig,
    readonly sunModel: SunModel,
    readonly gameboardModel: GameboardModel
  ) {
    const Hex = extendHex()
    this.sunModel = sunModel
    this.gameboardModel = gameboardModel
    this.hexgrid = gameboardModel.hexGrid
    this.outerHexes = this.hexgrid.filter((hex) => hex.distance(Hex(0, 0)) > 3)
  }

  // getters

  getSunrayRenderCoordinates(): Point[] {
    return this.getHexesFacingSun().map((hex: HoneycombHex) =>
      this.getRenderCoordinates(hex)
    )
  }

  private getRenderCoordinates(hex: HoneycombHex): Point {
    const point = hex.toPoint()
    return this.getPointCenterOffset(point)
  }

  private getHexesFacingSun(): HoneycombHex[] {
    const sunDirection = this.sunModel.getSunDirection()
    const adjacentDirections = this.sunModel.getdjacentSunDirections()
    const hexesWithSun = this.getHexesWithSun(sunDirection)
    const hexesLeftSlope = hexesWithSun.filter((hex: HoneycombHex) =>
      this.hasNeighboursInDirection(hex, adjacentDirections[0])
    )
    const hexesRightSlope = hexesWithSun.filter((hex: HoneycombHex) =>
      this.hasNeighboursInDirection(hex, adjacentDirections[1])
    )

    return intersection(hexesLeftSlope, hexesRightSlope)
  }

  private getHexesWithSun(sunPosition: SunPosition): HoneycombHex[] {
    return this.outerHexes.filter((hex: HoneycombHex) => {
      return this.hasNeighboursInDirection(hex, sunPosition)
    })
  }

  private hasNeighboursInDirection(
    hex: HoneycombHex,
    direction: SunPosition
  ): boolean {
    return this.getNeighbourHexInDirection(hex, direction) !== undefined
  }

  private getNeighbourHexInDirection(
    hex: HoneycombHex,
    direction: SunPosition
  ): HoneycombHex {
    return this.hexgrid.neighborsOf(hex, (direction as unknown) as number)[0]
  }

  private getPointCenterOffset(point: Point): Point {
    const { gamefieldConfig, center } = this.config
    const offsetValue = gamefieldConfig.radius + gamefieldConfig.distance

    const x = point.x * offsetValue + center.x
    const y = point.y * offsetValue + center.y

    return new Point(x, y)
  }
}
