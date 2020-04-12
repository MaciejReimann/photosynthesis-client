import { SunModel } from "./sun-model"
import { GameboardModel } from "./gameboard-model"

export class GameModel {
  round = 0
  boardModel: GameboardModel
  sun: SunModel

  constructor() {
    this.boardModel = new GameboardModel()
    this.sun = new SunModel()
  }

  // setters

  makeMove(id: number): void {
    const gamefield = this.boardModel.getGamefieldModelById(id)
    if (this.isPlantingSmallTreeAllowed()) {
      gamefield.plantSmallTree()
    }
  }

  // getters

  isMoreMovesAllowedForPlayer(): boolean {}

  isPlantingSmallTreeAllowed(): boolean {
    return this.round < 2 && this.boardModel.getTreesCount() < 2
  }

  onNextRound(): void {
    this.boardModel.activateAllGamefields()

    this.sun.rotate()
    this.incrementRound()
  }

  private incrementRound(): void {
    this.round++
  }
}
