import { Grid } from "honeycomb-grid"
import { GameModel } from "../models/game-model"
import { GamefieldModel, SerializedGamefield } from "../models/gamefield-model"
import { Direction } from "../models/sun-model"

export class GameStateSerializer {
  constructor(readonly gameModel: GameModel) {
    this.gameModel = gameModel
  }

  // serialize(): SerializedGameState {
  //   return {
  //     round: this.gameModel.round,
  //     gamefields: this.gameModel.board
  //       .getGamefields()
  //       .map((f) => f instanceof GamefieldModel && f.serialize()),
  //     sun: this.gameModel.sun.getSunDirection(),
  //   }
  // }
}

export type SerializedGameState = {
  round: number
  gamefields: Grid<SerializedGamefield>
  sun: Direction
}
