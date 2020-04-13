import { SunModel } from "../models/sun-model"
import { GameboardModel, HexGrid } from "../models/gameboard-model"

export class SunViewController {
  private hexgrid: HexGrid
  constructor(
    readonly sunModel: SunModel,
    readonly gameboardModel: GameboardModel
  ) {
    this.sunModel = sunModel
    this.gameboardModel = gameboardModel
    this.hexgrid = gameboardModel.hexGrid
  }
}
