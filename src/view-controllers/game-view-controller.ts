import { GameModel } from "../models/game-model"
import { GameboardViewController } from "./gameboard-view-controller"

export enum ActionCategory {
  MakeMove = "make move",
  Seeding = "seeding",
}

export class GameViewController {
  private actionCategories: ActionCategory[] = []

  constructor(
    readonly gameModel: GameModel,
    readonly gameboardVewController: GameboardViewController
  ) {
    this.gameModel = gameModel
    this.gameboardVewController = gameboardVewController
  }

  // setters

  willSeed() {
    // this.pushActionCategory(ActionCategory.Seeding)
    this.willMakeMove()
    this.gameboardVewController.highlightSeedableFields()
    // this.resetActionCategories()
  }

  willMakeMove() {
    // this.pushActionCategory(ActionCategory.MakeMove)
  }

  nextRound() {
    this.gameboardVewController.resetSeedableFields()
    this.gameModel.onNextRound()
  }

  //getters

  isPlantingSmallTreeBlocked(): boolean {
    return !this.gameModel.isPlantingSmallTreeAllowed()
  }

  isSeedingBlocked(): boolean {
    return this.gameModel.isInitialRound()
  }

  isGrowingTreeBlocked(): boolean {
    return this.gameModel.isInitialRound()
  }

  onClickField(id: number): void {
    // if (this.actionCategories.includes(ActionCategory.MakeMove)) {
    this.gameModel.makeMove(id)
    // }
  }

  // private pushActionCategory(actionCategory: ActionCategory): void {
  //   this.actionCategories.push(actionCategory)
  // }

  // private resetActionCategories(): void {
  //   this.actionCategories = []
  // }
}
