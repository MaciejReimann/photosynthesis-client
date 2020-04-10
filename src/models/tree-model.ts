export enum TreeSize {
  Empty = "empty",
  Seed = "seed",
  Small = "small tree",
  Medium = "medium tree",
  Large = "large tree",
}

export class TreeModel {
  readonly growCycle: any
  private index: number

  constructor() {
    this.index = 0
    this.growCycle = [
      TreeSize.Empty,
      TreeSize.Seed,
      TreeSize.Small,
      TreeSize.Medium,
      TreeSize.Large,
    ]
  }
  grow() {
    if (this.index === this.growCycle.length - 1) return (this.index = 0)
    this.index = this.index + 1
    console.log("growing tree", this.get())
  }

  get() {
    return this.growCycle[this.index]
  }
}
