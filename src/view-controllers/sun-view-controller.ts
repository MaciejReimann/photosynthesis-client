import { defineGrid, extendHex, Hex, Grid, HexFactory } from "honeycomb-grid"

import { GameConfig, GamefieldBackground } from "../config/gameboardConfig"

import { SunModel } from "../models/sun-model"
import { GameboardModel, HexGrid } from "../models/gameboard-model"
import { Point } from "../models/point-model"

export class SunViewController {
  private hexgrid: HexGrid
  private anchorPoints: any
  constructor(
    readonly config: GameConfig,
    readonly sunModel: SunModel,
    readonly gameboardModel: GameboardModel
  ) {
    const Hex = extendHex()
    this.sunModel = sunModel
    this.gameboardModel = gameboardModel
    this.hexgrid = gameboardModel.hexGrid
    this.anchorPoints = this.hexgrid
      .filter((hex) => hex.distance(Hex(0, 0)) > 3)
      .map((p) => p.toPoint())
  }

  // getters

  getSunrayAnchorPoints() {
    const { gamefieldConfig, center } = this.config
    const offsetValue = gamefieldConfig.radius + gamefieldConfig.distance

    return this.anchorPoints.map((p: any) => this.getHexCenterOffset(p))
  }

  private getHexCenterOffset(hex: any) {
    const { gamefieldConfig, center } = this.config
    const offsetValue = gamefieldConfig.radius + gamefieldConfig.distance

    const x = hex.x * offsetValue + center.x
    const y = hex.y * offsetValue + center.y

    return new Point(x, y)
  }

  private getSunDirection(): void {
    this.sunModel.getSunDirection()
  }
}
