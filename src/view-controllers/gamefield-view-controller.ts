type GamefieldDistances = 0 | 2 | 3 | 4

export class GamefieldViewController {
  constructor(readonly field: any, readonly center: any) {
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
}
