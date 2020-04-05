import { Sun } from "./sun"
import { GameboardModel } from "./gameboard-model"

export class Game {
  round = 0
  board: GameboardModel
  sun: Sun

  constructor() {
    this.board = new GameboardModel()
    this.sun = new Sun()
  }

  nextRound() {
    this.round++
    this.sun.rotate()
  }
}
