import { TreeModel } from "./tree-model"

export type CubicCoords = { q: number; r: number; s: number }
export type CartesianCoords = { x: number; y: number }
export type GamefieldDistances = 0 | 2 | 3 | 4

export type GamefieldExtraProps = {
  distanceFromCenter: GamefieldDistances
  //   cartesianOffsetFromCenter: CartesianCoords
}

export class GamefieldModel {
  readonly distanceFromCenter: GamefieldDistances
  readonly tree: TreeModel

  constructor(
    readonly coords: CubicCoords & CartesianCoords,
    readonly extraProps: GamefieldExtraProps
  ) {
    this.coords = coords
    this.distanceFromCenter = extraProps.distanceFromCenter
    this.tree = new TreeModel()
  }

  getDistanceFromCenter(): GamefieldDistances {
    return this.distanceFromCenter
  }

  growTree(): void {
    this.tree.grow()
  }
}
