import { PlayerModel } from "./player-model"
import { SunModel } from "./sun-model"
import { GameboardModel } from "./gameboard-model"

export class GameModel {
  round = 1
  private players: PlayerModel[] = []

  constructor(
    player: PlayerModel,
    readonly boardModel: GameboardModel,
    readonly sunModel: SunModel
  ) {
    this.players = [player]
    this.boardModel = boardModel
    this.sunModel = sunModel
  }

  // setters

  makeMove(id: number): void {
    const gamefield = this.boardModel.gamefieldModels[id]
    if (this.isSeedingAllowed(id)) {
      gamefield.growTree()
      console.log("Making Move")
      return
    }
    if (this.isPlantingSmallTreeAllowed()) {
      gamefield.plantSmallTree()
      return
    }
    gamefield.growTree()
  }

  // setters

  onNextRound(): void {
    this.boardModel.activateAllGamefields()

    this.sunModel.rotate()
    this.incrementRound()
  }

  // getters

  isInitialRound(): boolean {
    return this.round <= 2
  }

  // isMoreMovesAllowedForPlayer(): boolean {}

  isPlantingSmallTreeAllowed(): boolean {
    const treesCount = this.boardModel.getTreesCount()
    const isAllowedForFirstRound = this.round === 1 && treesCount < 1
    const isAllowedForSecondRound = this.round === 2 && treesCount < 2
    return isAllowedForFirstRound || isAllowedForSecondRound
  }

  isSeedingAllowed(id: number): boolean {
    return !this.isInitialRound() && this.boardModel.isFieldSeedable(id)
  }

  private incrementRound(): void {
    this.round++
  }
}
