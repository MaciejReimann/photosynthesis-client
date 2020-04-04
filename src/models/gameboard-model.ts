import { defineGrid, extendHex, Hex, PointLike } from "honeycomb-grid"

import { Gamefield } from "./gamefield"

export class GameboardModel {
  readonly grid: any
  readonly fields: any

  constructor() {
    const Hex = extendHex({ props: new Gamefield() })
    this.grid = defineGrid(Hex).hexagon({ radius: 3 })

    this.grid.forEach((el: any, i: number) => {
      el.getDistanceFromCenterField = () =>
        this.getDistanceFromCenterFieldByIndex(i)

      el.getOffsetFromCenter = (offset: number, center: PointLike) => {
        const hex = this.grid[i].toPoint()

        return {
          x: hex.x * offset + center.x,
          y: hex.y * offset + center.y,
        }
      }
    })
  }

  getCenter() {
    return this.grid.get([0, 0])
  }

  getDistanceFromCenterFieldByIndex(i: number) {
    const centerHex = extendHex()(0, 0)
    return this.grid[i].distance(centerHex)
  }
}
