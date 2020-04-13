// Config
import { GameConfig } from "../config/gameboardConfig"

// Models
import { PlayerModel } from "../models/player-model"
import { GameboardModel } from "../models/gameboard-model"
import { SunModel } from "../models/sun-model"
import { GameModel } from "../models/game-model"

// View Controllers
import { PlayerVewController } from "../view-controllers/player-view-controller"
import { GameboardViewController } from "../view-controllers/gameboard-view-controller"
import { SunViewController } from "../view-controllers/sun-view-controller"
import { GameViewController } from "../view-controllers/game-view-controller"

function initializeGameModels() {
  const playerModel = new PlayerModel(0)
  const gameboardModel = new GameboardModel()
  const sunModel = new SunModel()
  const gameModel = new GameModel(playerModel, gameboardModel, sunModel)

  return { playerModel, gameboardModel, sunModel, gameModel }
}

export function initializeGameViewControllers(config: GameConfig) {
  const {
    playerModel,
    gameboardModel,
    sunModel,
    gameModel,
  } = initializeGameModels()

  const playerViewController = new PlayerVewController(playerModel)
  const gameboardViewController = new GameboardViewController(
    config,
    gameboardModel
  )
  const sunViewController = new SunViewController(
    config,
    sunModel,
    gameboardModel
  )
  const gameViewController = new GameViewController(gameModel)

  return {
    playerViewController,
    gameboardViewController,
    sunViewController,
    gameViewController,
  }
}
