import { defineGrid, extendHex, Hex, PointLike } from "honeycomb-grid"

import { Tree } from "./tree"

export class GameboardModel {
  private grid: any
  readonly fields: any

  constructor() {
    const Hex = extendHex()
    this.grid = defineGrid(Hex).hexagon({ radius: 4 })

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

      if (this.getDistanceFromCenterFieldByIndex(i) > 3) {
        el.sun = new Sun()
      }
      el.tree = new Tree()
    })
  }

  getGrid() {
    return this.grid
  }

  private getDistanceFromCenterFieldByIndex(i: number) {
    const centerHex = extendHex()(0, 0)
    return this.grid[i].distance(centerHex)
  }
}

class Sun {}
