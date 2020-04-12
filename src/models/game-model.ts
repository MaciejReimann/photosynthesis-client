import { PlayerModel } from "./player-model"
import { SunModel } from "./sun-model"
import { GameboardModel } from "./gameboard-model"

export class GameModel {
  round = 0
  players: PlayerModel[]
  board: GameboardModel
  sun: SunModel

  constructor(readonly player: PlayerModel) {
    this.players = [player]
    this.board = new GameboardModel()
    this.sun = new SunModel()
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
