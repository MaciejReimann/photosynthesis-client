import { TreeSize } from "./tree-model"

class RepoItem {
  constructor(readonly treeSize: TreeSize, readonly cost: number) {
    this.treeSize = treeSize
    this.cost = cost
  }
}

export class RepositoryModel {
  private points: number = 0
  private seeds: RepoItem[]
  private smallTrees: RepoItem[]
  private mediumTrees: RepoItem[]
  private largeTrees: RepoItem[]

  constructor() {
    this.points = 0
    const startRepo = buildStartRepo()
    this.seeds = startRepo.seeds
    this.smallTrees = startRepo.smallTrees
    this.mediumTrees = startRepo.mediumTrees
    this.largeTrees = startRepo.largeTrees
  }
}

function buildStartRepo() {
  const seedCosts = [2, 2, 1, 1]
  const smallTreeCosts = [3, 3, 2, 2]
  const mediumTreeCosts = [4, 4, 3]
  const largeTreeCosts = [5, 4]

  return {
    seeds: seedCosts.map((cost) => new RepoItem(TreeSize.Seed, cost)),
    smallTrees: smallTreeCosts.map(
      (cost) => new RepoItem(TreeSize.Small, cost)
    ),
    mediumTrees: mediumTreeCosts.map(
      (cost) => new RepoItem(TreeSize.Medium, cost)
    ),
    largeTrees: largeTreeCosts.map(
      (cost) => new RepoItem(TreeSize.Large, cost)
    ),
  }
}
