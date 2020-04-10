export type CubicCoords = { q: number; r: number; s: number }
export type CartesianCoords = { x: number; y: number }

export type GamefieldExtraProps = {
  distanceFromCenter: number
  //   cartesianOffsetFromCenter: CartesianCoords
}

export class GamefieldModel {
  readonly distanceFromCenter: number
  //   readonly cartesianOffsetFromCenter: CartesianCoords

  constructor(
    readonly coords: CubicCoords & CartesianCoords,
    readonly extraProps: GamefieldExtraProps
  ) {
    this.coords = coords
    this.distanceFromCenter = extraProps.distanceFromCenter
    // this.cartesianOffsetFromCenter = extraProps.cartesianOffsetFromCenter
  }

  getDistanceFromCenter(): number {
    return this.distanceFromCenter
  }
}
