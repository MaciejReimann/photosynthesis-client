export enum TreeSize {
  Empty = "empty",
  Seed = "seed",
  Small = "small tree",
  Medium = "medium tree",
  Large = "large tree",
}

export class TreeModel {
  private growCycle: TreeSize[] = [
    TreeSize.Empty,
    TreeSize.Seed,
    TreeSize.Small,
    TreeSize.Medium,
    TreeSize.Large,
  ]
  private index: number = 0

  grow(): void {
    if (this.index === this.growCycle.length - 1) {
      this.index = 0
      return
    }
    this.index = this.index + 1
  }

  get(): TreeSize {
    return this.growCycle[this.index]
  }

  getRange(): number {
    const range = this.index - 1
    return range < 0 ? 0 : range
  }
}
