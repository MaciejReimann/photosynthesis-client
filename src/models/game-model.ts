import { SunModel } from "./sun-model"
import { GameboardModel } from "./gameboard-model"

export class GameModel {
  round = 0
  board: GameboardModel
  sun: SunModel

  constructor() {
    this.board = new GameboardModel()
    this.sun = new SunModel()
  }

  makeMove(id: number): void {
    if (this.round === 0) {
    }
  }

  onNextRound(): void {
    this.board.desactivateAllGamefields()

    this.sun.rotate()
    this.incrementRound()
  }

  private incrementRound(): void {
    this.round++
  }
}
