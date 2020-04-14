import { GameModel } from "../models/game-model"
import { GamefieldModel } from "../models/gamefield-model"
import { Direction } from "../models/sun-model"
import { TreeSize } from "../models/tree-model"

export class GameStateSerializer {
  constructor(readonly gameModel: GameModel) {
    this.gameModel = gameModel
  }

  serialize(): SerializedGameState {
    let gamefields: SerializedGamefield[] = []

    this.gameModel.boardModel.gamefieldModels.forEach(
      (gamefield: GamefieldModel) => {
        gamefields.push(this.serializeGamefield(gamefield))
      }
    )
    return {
      round: this.gameModel.round,
      gamefields,
      sun: this.gameModel.sunModel.getSunDirection(),
    }
  }

  private serializeGamefield(
    gamefieldModel: GamefieldModel
  ): SerializedGamefield {
    const { id, tree, isEmpty } = gamefieldModel
    return isEmpty() ? { id } : { id, tree: tree.get() }
  }
}

export type SerializedGameState = {
  round: number
  gamefields: SerializedGamefield[]
  sun: Direction
}

export type SerializedGamefield = {
  id: number
  tree?: TreeSize
}
