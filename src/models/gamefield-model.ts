import { extendHex } from "honeycomb-grid"
import { TreeModel } from "./tree-model"
import { HoneycombHex, HexGrid } from "./gameboard-model"
import { mapDistanceFromCenterToFertilityIndex } from "./utils"

export type GamefieldDistance = 0 | 1 | 2 | 3
export type FertilityIndex = 4 | 3 | 2 | 1

export type GamefieldModelConfig = {
  id: number
  fertility: FertilityIndex
}

export class GamefieldModel {
  readonly fertility: FertilityIndex
  readonly tree: TreeModel
  private hasBeenTouched = false

  constructor(
    readonly hex: HoneycombHex,
    readonly id: number,
    readonly hexGrid: HexGrid
  ) {
    this.hex = hex
    this.id = id
    this.hexGrid = hexGrid
    this.fertility = this.getFertilityIndex()
    this.tree = new TreeModel()
  }

  // setters

  setHasBeenTouched(value: boolean): void {
    this.hasBeenTouched = value
  }

  plantSmallTree(): void {
    if (this.isEmpty()) {
      this.growTree()
      this.setHasBeenTouched(false)
      this.growTree()
    }
  }

  growTree(): void {
    if (!this.hasBeenTouched) {
      this.tree.grow()
    }
    this.hasBeenTouched = true
  }

  // getters

  getIdsOfFieldsInRange(): number[] {
    const range = this.tree.getRange()
    const fieldsInSeedableRange = this.getFieldsInRange(range)
    return fieldsInSeedableRange.map((f: HoneycombHex) => this.getHexId(f))
  }

  isEmpty(): boolean {
    return this.tree.isEmpty()
  }

  hasTree(): boolean {
    return !this.isEmpty() && !this.tree.hasSeed()
  }

  getFieldsInRange(range: number): HoneycombHex[] {
    return this.hexGrid.hexesInRange(this.hex, range, false)
  }

  private getHexId(hex: HoneycombHex): number {
    return this.hexGrid.indexOf(hex)
  }

  private getDistanceFromCenterHex(): GamefieldDistance {
    const centerHex = extendHex()(0, 0)
    return this.hex.distance(centerHex) as GamefieldDistance
  }

  private getFertilityIndex(): FertilityIndex {
    const dist = this.getDistanceFromCenterHex()
    return mapDistanceFromCenterToFertilityIndex(dist)
  }
}
