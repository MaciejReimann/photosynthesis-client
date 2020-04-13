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
    // circular array needs to be used here
    if (this.currentIndex === this.sunPositions.length - 1) {
      this.currentIndex = 0
      return
    }
    this.currentIndex++
  }

  getSunDirection(): SunPosition {
    return this.sunPositions[this.currentIndex]
  }

  getdjacentSunDirections(): SunPosition[] {
    // circular array needs to be used here
    let i = this.currentIndex
    const p = this.sunPositions
    const last = this.sunPositions.length - 1

    if (i === 0) {
      return [p[last], p[i + 1]]
    }

    if (i === last) {
      return [p[i - 1], p[0]]
    }

    return [p[i - 1], p[i + 1]]
  }

  getShadowDirection(): SunPosition {
    return this.shadowDirections[this.currentIndex]
  }
}
