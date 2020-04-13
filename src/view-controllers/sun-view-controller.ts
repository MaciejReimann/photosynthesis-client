import { compact } from "lodash"
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
    return this.getHexCenterOffset(point)
  }

  private getHexesFacingSun() {
    const sunDirection = this.sunModel.getSunDirection()
    const hexesWithSun = this.getHexesWithSun(sunDirection)

    return hexesWithSun
  }

  private getHexesWithSun(sunPosition: SunPosition): HoneycombHex[] {
    return this.outerHexes.filter((p: HoneycombHex) => {
      return (
        this.hexgrid.neighborsOf(p, (sunPosition as unknown) as number)[0] !==
        undefined
      )
    })
  }

  private getHexCenterOffset(hex: any) {
    const { gamefieldConfig, center } = this.config
    const offsetValue = gamefieldConfig.radius + gamefieldConfig.distance

    const x = hex.x * offsetValue + center.x
    const y = hex.y * offsetValue + center.y

    return new Point(x, y)
  }
}
