import { pullAt } from "lodash"

import { TreeSize } from "./tree-model"

class RepoItem {
  constructor(readonly treeSize: TreeSize, readonly cost: number) {
    this.treeSize = treeSize
    this.cost = cost
  }
}

export class RepositoryModel {
  private points: number = 0
  private repo: RepoItem[]

  constructor() {
    this.points = 0
    this.repo = buildStartRepo()
  }

  pullSeedFromRepo(i: number): RepoItem | null {
    const pulledItem = this.repo[i]
    if (this.canAfford(pulledItem)) {
      pullAt(this.repo, i)
      return pulledItem
    }
    return null
  }

  private canAfford(item: RepoItem): boolean {
    return item.cost <= this.points
  }
}

function buildStartRepo() {
  const seedCosts = [2, 2, 1, 1]
  const smallTreeCosts = [3, 3, 2, 2]
  const mediumTreeCosts = [4, 4, 3]
  const largeTreeCosts = [5, 4]

  const seeds = seedCosts.map((cost) => new RepoItem(TreeSize.Seed, cost))
  const smallTrees = smallTreeCosts.map(
    (cost) => new RepoItem(TreeSize.Small, cost)
  )
  const mediumTrees = mediumTreeCosts.map(
    (cost) => new RepoItem(TreeSize.Medium, cost)
  )
  const largeTrees = largeTreeCosts.map(
    (cost) => new RepoItem(TreeSize.Large, cost)
  )

  return [...seeds, ...smallTrees, ...mediumTrees, ...largeTrees]
}
