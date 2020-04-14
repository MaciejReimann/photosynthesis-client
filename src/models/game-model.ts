import { PlayerModel } from "./player-model"
import { SunModel } from "./sun-model"
import { GameboardModel } from "./gameboard-model"

export class GameModel {
  round = 1
  private players: PlayerModel[] = []

  constructor(
    player: PlayerModel,
    readonly gemeboardModel: GameboardModel,
    readonly sunModel: SunModel
  ) {
    this.players = [player]
    this.gemeboardModel = gemeboardModel
    this.sunModel = sunModel
  }

  // setters

  makeMove(id: number): void {
    const gamefield = this.gemeboardModel.gamefieldModels[id]

    if (this.isPlantingSmallTreeAllowed()) return gamefield.plantSmallTree()
    if (this.isSeedingAllowed(id)) return gamefield.seed()
    if (this.isGrowingAllowed(id)) return gamefield.growTree()
  }

  // setters

  onNextRound(): void {
    this.gemeboardModel.activateAllGamefields()

    this.sunModel.rotate()
    this.incrementRound()
  }

  // getters

  isInitialRound(): boolean {
    return this.round <= 2
  }

  // isMoreMovesAllowedForPlayer(): boolean {}

  isPlantingSmallTreeAllowed(): boolean {
    const treesCount = this.gemeboardModel.getTreesCount()
    const isAllowedForFirstRound = this.round === 1 && treesCount < 1
    const isAllowedForSecondRound = this.round === 2 && treesCount < 2
    return isAllowedForFirstRound || isAllowedForSecondRound
  }

  isSeedingAllowed(id: number): boolean {
    return !this.isInitialRound() && this.gemeboardModel.isFieldSeedable(id)
  }

  isGrowingAllowed(id: number): boolean {
    return !this.isInitialRound() && this.gemeboardModel.isFieldGrowable(id)
  }

  private incrementRound(): void {
    this.round++
  }
}
