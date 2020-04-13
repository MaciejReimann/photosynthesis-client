import { Point } from "../models/point-model"
import { HexgridModel } from "../models/hexgrid-model"

export type HexgridViewControllerConfig = {
  center: Point
  hex: {
    radius: number
    distance: number
  }
}

export class HexgridViewController {
  constructor(
    readonly hexgridConfig: HexgridViewControllerConfig,
    readonly hexgridModel: HexgridModel
  ) {
    this.hexgridConfig = hexgridConfig
    this.hexgridModel = hexgridModel
  }

  getPointCenterOffset(point: Point): Point {
    const { hex, center } = this.hexgridConfig
    const offsetValue = hex.radius + hex.distance

    const x = point.x * offsetValue + center.x
    const y = point.y * offsetValue + center.y

    return new Point(x, y)
  }
}
