export enum Tree {
  Empty = "empty",
  Seed = "seed",
  Small = "small tree",
  Medium = "medium tree",
  Large = "large tree",
}

export class Gamefield {
  readonly growCycle: any
  private index: number

  constructor() {
    this.index = 0
    this.growCycle = [
      Tree.Empty,
      Tree.Seed,
      Tree.Small,
      Tree.Medium,
      Tree.Medium,
    ]
  }
  grow() {
    this.index += this.index
  }

  getTree() {
    return this.growCycle[this.index]
  }
}
