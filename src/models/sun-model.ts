export enum SunPosition {
  E = "E",
  NE = "NE",
  NW = "NW",
  W = "W",
  SW = "SW",
  SE = "SE",
}

export class SunModel {
  sunPositions = [
    SunPosition.E,
    SunPosition.SE,
    SunPosition.SW,
    SunPosition.W,
    SunPosition.NW,
    SunPosition.NE,
  ]
  shadowDirections = [
    SunPosition.W,
    SunPosition.NW,
    SunPosition.NE,
    SunPosition.E,
    SunPosition.SE,
    SunPosition.SW,
  ]
  currentIndex = 0

  rotate(): void {
    if (this.currentIndex === this.sunPositions.length - 1) {
      this.currentIndex = 0
      return
    }
    this.currentIndex++
  }

  getSunDirection(): SunPosition {
    return this.sunPositions[this.currentIndex]
  }

  getShadowDirection(): SunPosition {
    return this.shadowDirections[this.currentIndex]
  }
}
