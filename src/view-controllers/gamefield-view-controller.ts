import { GamefieldModel, GamefieldDistance } from "../models/gamefield-model"
import { TreeSize } from "../models/tree-model"

enum GemefieldDisplayProperties {
  Default = "default",
  Desaturated = "desaturated",
}

export class GamefieldViewController {
  public isDesaturated: boolean

  constructor(readonly field: GamefieldModel, readonly center: any) {
    this.field = field
    this.center = center
    this.isDesaturated = false
  }

  // setters

  desaturate() {
    console.log("DESATURATING!!!!", this.field.id)

    this.isDesaturated = true
  }

  // getters
  getId(): number {
    return this.field.id
  }

  getCenterCoords() {
    return this.center
  }

  getOpacity(): number {
    console.log("getOpacity this.isDesaturated", this.isDesaturated)
    return this.isDesaturated ? 0.5 : 1
  }

  getDistanceFromCenter(): GamefieldDistance {
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
