import { GamefieldModel, GamefieldDistances } from "../models/gamefield-model"
import { TreeSize } from "../models/tree-model"

export class GamefieldViewController {
  constructor(readonly field: GamefieldModel, readonly center: any) {
    this.field = field
    this.center = center
  }

  getCenterCoords() {
    return this.center
  }

  getDistanceFromCenter(): GamefieldDistances {
    return this.field.getDistanceFromCenter()
  }

  isOnOuterRing(): boolean {
    return this.getDistanceFromCenter() > 3
  }

  getTree(): TreeSize {
    return this.field.getTree()
  }

  onClick(): void {
    this.field.growTree()
  }
}
