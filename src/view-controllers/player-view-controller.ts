import { PlayerModel } from "../models/player-model"

export class PlayerVewController {
  constructor(readonly playerModel: PlayerModel) {
    this.playerModel = playerModel
  }
}
