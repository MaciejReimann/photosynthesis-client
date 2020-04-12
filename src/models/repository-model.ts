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
  private paidRepo: RepoItem[][]
  private freeRepo: RepoItem[]

  constructor() {
    this.points = 0
    this.paidRepo = buildStartRepo()
    this.freeRepo = buildFreeItems()
  }

  pullItemForFree(i: number): RepoItem {
    const pulled = pullAt(this.freeRepo, i)
    return pulled[0]
  }

  pullItem(i: number, j: number): RepoItem | null {
    const pulledItem = this.paidRepo[i][j]
    if (this.canAfford(pulledItem)) {
      this.paidRepo[i][j] = new RepoItem(TreeSize.Empty, pulledItem.cost)
      return pulledItem
    }
    return null
  }

  pushItem(itemName: TreeSize, i: number, j: number): void {
    if (this.isEmpty(i, j)) {
      this.paidRepo[i][j] = new RepoItem(itemName, this.paidRepo[i][j].cost)
    }
  }

  private canAfford(item: RepoItem): boolean {
    return item.cost <= this.points
  }
  private isEmpty(i: number, j: number): boolean {
    return this.paidRepo[i][j].treeSize === TreeSize.Empty
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

  return [seeds, smallTrees, mediumTrees, largeTrees]
}

function buildFreeItems() {
  const freeItems = [
    TreeSize.Seed,
    TreeSize.Seed,
    TreeSize.Small,
    TreeSize.Small,
    TreeSize.Medium,
  ]
  return freeItems.map((name) => new RepoItem(name, 0))
}
