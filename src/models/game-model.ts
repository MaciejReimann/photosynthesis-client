import { PlayerModel } from "./player-model"
import { SunModel } from "./sun-model"
import { GameboardModel } from "./gameboard-model"

export class GameModel {
  round = 0
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
    // const gamefield = this.boardModel.getGamefieldModelById(id)
    // if (this.isPlantingSmallTreeAllowed()) {
    //   gamefield.plantSmallTree()
    // }
  }

  // getters

  // isMoreMovesAllowedForPlayer(): boolean {}

  // isPlantingSmallTreeAllowed(): boolean {
  //   return this.round < 2 && this.boardModel.getTreesCount() < 2
  // }

  onNextRound(): void {
    // this.boardModel.activateAllGamefields()

    this.sunModel.rotate()
    this.incrementRound()
  }

  private incrementRound(): void {
    this.round++
  }
}
