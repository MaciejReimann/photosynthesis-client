import { Grid } from "honeycomb-grid"
import { GameModel } from "../models/game-model"
import { GamefieldModel, SerializedGamefield } from "../models/gamefield-model"
import { SunPosition } from "../models/sun-model"

export class GameStateSerializer {
  constructor(readonly gameModel: GameModel) {
    this.gameModel = gameModel
  }

  serialize(): SerializedGameState {
    return {
      round: this.gameModel.round,
      gamefields: this.gameModel.board
        .getGamefields()
        .map((field: GamefieldModel) => field.serialize()),
      sun: this.gameModel.sun.getSunDirection(),
    }
  }
}

export type SerializedGameState = {
  round: number
  gamefields: Grid<SerializedGamefield>
  sun: SunPosition
}