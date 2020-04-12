import { GameModel } from "../models/game-model"
import { GameboardViewController } from "./gameboard-view-controller"

export enum ActionCategory {
  MakeMove = "make move",
}

export class GameViewController {
  private actionCategory: null | ActionCategory = null

  constructor(
    readonly gameModel: GameModel // readonly gameboardVewController: GameboardViewController
  ) {
    this.gameModel = gameModel
    // this.gameboardVewController = gameboardVewController
  }

  // setters

  setActionCategory(moveCategory: ActionCategory): void {
    this.actionCategory = moveCategory
  }

  //getters

  isPlantingSmallTreeAllowed(): boolean {
    return this.gameModel.isPlantingSmallTreeAllowed()
  }

  onClickField(id: number): void {
    if (this.actionCategory === ActionCategory.MakeMove) {
      this.gameModel.makeMove(id)
    }
  }
}
