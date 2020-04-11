import { TreeModel, TreeSize } from "./tree-model"

export type CubicCoords = { q: number; r: number; s: number }
export type CartesianCoords = { x: number; y: number }
export type HexCoords = CubicCoords & CartesianCoords
export type GamefieldDistance = 0 | 1 | 2 | 3
export type FertilityIndex = 4 | 3 | 2 | 1

export type GamefieldExtraProps = {
  id: number
  distanceFromCenter: GamefieldDistance
  fertilityIndex: FertilityIndex
  //   cartesianOffsetFromCenter: CartesianCoords
}

export class GamefieldModel {
  readonly id: number
  readonly distanceFromCenter: GamefieldDistance
  readonly fertilityIndex: FertilityIndex
  readonly tree: TreeModel
  hasBeenTouched = false

  constructor(
    readonly coords: HexCoords,
    readonly extraProps: GamefieldExtraProps // readonly gridModel: any
  ) {
    this.coords = coords
    this.id = extraProps.id
    this.distanceFromCenter = extraProps.distanceFromCenter
    this.fertilityIndex = extraProps.fertilityIndex
    this.tree = new TreeModel()
    // this.gridModel = gridModel
  }

  // setters

  desactivate(): void {
    this.hasBeenTouched = false
  }

  growTree(): void {
    if (!this.hasBeenTouched) this.tree.grow()
    this.hasBeenTouched = true
  }

  // getters

  getDistanceFromCenter(): GamefieldDistance {
    return this.distanceFromCenter
  }

  isEmpty(): boolean {
    return this.tree.get() === TreeSize.Empty
  }

  hasTree(): boolean {
    return !this.isEmpty() && !this.hasSeed()
  }

  getTree(): TreeSize {
    return this.tree.get()
  }

  serialize(): SerializedGamefield {
    const coords = this.coords
    return this.isEmpty() ? { coords } : { coords, tree: this.getTree() }
  }

  private hasSeed(): boolean {
    return this.tree.get() === TreeSize.Seed
  }
}

export type SerializedGamefield = {
  coords: HexCoords
  tree?: TreeSize
}
