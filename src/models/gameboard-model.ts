import { defineGrid, extendHex, Hex, PointLike } from "honeycomb-grid"

import { Tree } from "./tree"
import { SunPosition } from "./sun"

export class GameboardModel {
  private grid: any
  readonly fields: any

  constructor() {
    this.grid = defineGrid().hexagon({ radius: 4 })

    this.grid.forEach((el: any, i: number) => {
      el.ringIndex = this.getDistanceFromCenterFieldByIndex(i)
      el.getOffsetFromCenter = this.getOffsetFromCenter(i)

      el.tree = this.getDistanceFromCenterFieldByIndex(i) < 4 && new Tree()
      el.isSun = (sunPosition: SunPosition) => this.isFieldSun(i, sunPosition)
    })
  }

  getGrid() {
    return this.grid
  }

  private getDistanceFromCenterFieldByIndex(i: number) {
    const centerHex = extendHex()(0, 0)
    return this.grid[i].distance(centerHex)
  }

  private getOffsetFromCenter(i: number) {
    return (offset: number, center: PointLike) => {
      const hex = this.grid[i].toPoint()

      return {
        x: hex.x * offset + center.x,
        y: hex.y * offset + center.y,
      }
    }
  }

  private isFieldSun(i: number, sunPosition: SunPosition) {
    const field = this.grid[i]
    if (this.getDistanceFromCenterFieldByIndex(i) < 4) return false
    const fieldOnSunnyBorder = this.hasNoNeighbourInDirection(
      field,
      sunPosition
    )

    return fieldOnSunnyBorder && fieldOnSunnyBorder.distance(field) === 0
  }

  private hasNoNeighbourInDirection(field: any, direction: SunPosition) {
    const neighbour = this.grid.neighborsOf(field, direction)[0]
    if (neighbour === undefined) {
      return field
    }
    this.hasNoNeighbourInDirection(neighbour, direction)
  }
}
