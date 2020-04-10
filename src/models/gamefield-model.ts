import { TreeModel, TreeSize } from "./tree-model"

export type CubicCoords = { q: number; r: number; s: number }
export type CartesianCoords = { x: number; y: number }
export type HexCoords = CubicCoords & CartesianCoords
export type GamefieldDistances = 0 | 2 | 3 | 4

export type GamefieldExtraProps = {
  distanceFromCenter: GamefieldDistances
  //   cartesianOffsetFromCenter: CartesianCoords
}

export class GamefieldModel {
  readonly distanceFromCenter: GamefieldDistances
  readonly tree: TreeModel

  constructor(
    readonly coords: HexCoords,
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

  serialize(): SerializedGamefield {
    const tree = this.tree.get()
    const coords = this.coords

    return tree !== TreeSize.Empty ? { coords, tree } : { coords }
  }
}

export type SerializedGamefield = {
  coords: HexCoords
  tree?: TreeSize
}
