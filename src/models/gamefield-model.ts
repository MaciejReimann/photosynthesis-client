import { TreeModel, TreeSize } from "./tree-model"

export type GamefieldDistance = 0 | 1 | 2 | 3
export type FertilityIndex = 4 | 3 | 2 | 1

export type GamefieldModelConfig = {
  fertility: FertilityIndex
} & BasicModelConfig

export type BasicModelConfig = {
  id: number
}
export class BasicFieldModel {
  readonly id: number

  constructor(config: BasicModelConfig) {
    this.id = config.id
  }
}
export class GamefieldModel {
  readonly id: number
  readonly fertility: FertilityIndex
  readonly tree: TreeModel
  hasBeenTouched = false

  constructor(config: GamefieldModelConfig) {
    this.id = config.id
    this.fertility = config.fertility
    this.tree = new TreeModel()
  }

  // setters

  desactivate(): void {
    this.hasBeenTouched = false
  }

  plantSmallTree(): void {
    if (this.isEmpty()) {
      this.growTree()
      this.growTree()
    }
  }

  growTree(): void {
    if (!this.hasBeenTouched) this.tree.grow()
    this.hasBeenTouched = true
  }

  // getters

  getFertility(): FertilityIndex {
    return this.fertility
  }

  isEmpty(): boolean {
    return this.tree.get() === TreeSize.Empty
  }

  hasTree(): boolean {
    return !this.isEmpty() && !this.hasSeed()
  }

  getSeedableRange(): number {
    const tree = this.getTree()
    switch (tree) {
      case TreeSize.Small:
        return 1
      case TreeSize.Medium:
        return 2
      case TreeSize.Large:
        return 3
      default:
        return 0
    }
  }

  getTree(): TreeSize {
    return this.tree.get()
  }

  serialize(): SerializedGamefield {
    const id = this.id
    return this.isEmpty() ? { id } : { id, tree: this.getTree() }
  }

  private hasSeed(): boolean {
    return this.tree.get() === TreeSize.Seed
  }
}

export type SerializedGamefield = {
  id: number
  tree?: TreeSize
}
