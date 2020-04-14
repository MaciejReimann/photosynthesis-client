// Config
import { GameConfig } from "../config/gameboardConfig"

// Models
import { PlayerModel } from "../models/player-model"
import { HexgridModel } from "../models/hexgrid-model"
import { GameboardModel } from "../models/gameboard-model"
import { SunModel } from "../models/sun-model"
import { GameModel } from "../models/game-model"

// View Controllers
import { PlayerVewController } from "../view-controllers/player-view-controller"
import { HexgridViewController } from "../view-controllers/hexgrid-view-controller"
import { GameboardViewController } from "../view-controllers/gameboard-view-controller"
import { SunViewController } from "../view-controllers/sun-view-controller"
import { GameViewController } from "../view-controllers/game-view-controller"

function initializeGameModels() {
  const playerModel = new PlayerModel(0)
  const innerHexgridModel = new HexgridModel(3)
  const outerHexgridModel = new HexgridModel(4)
  const gameboardModel = new GameboardModel(innerHexgridModel)
  const sunModel = new SunModel()
  const gameModel = new GameModel(playerModel, gameboardModel, sunModel)

  return {
    playerModel,
    innerHexgridModel,
    outerHexgridModel,
    gameboardModel,
    sunModel,
    gameModel,
  }
}

export function initializeGameViewControllers(config: GameConfig) {
  const {
    playerModel,
    innerHexgridModel,
    outerHexgridModel,
    gameboardModel,
    sunModel,
    gameModel,
  } = initializeGameModels()
  const hexConfig = {
    center: config.center,
    hex: {
      radius: config.gamefieldConfig.radius,
      distance: config.gamefieldConfig.distance,
    },
  }

  const playerViewController = new PlayerVewController(playerModel)
  const innerHexgridViewController = new HexgridViewController(
    hexConfig,
    innerHexgridModel
  )
  const outerHexgridViewController = new HexgridViewController(
    hexConfig,
    outerHexgridModel
  )
  const gameboardViewController = new GameboardViewController(
    config,
    gameboardModel,
    innerHexgridViewController
  )
  const sunViewController = new SunViewController(
    config,
    outerHexgridViewController,
    sunModel
    // gameboardModel
  )
  const gameViewController = new GameViewController(
    gameModel,
    gameboardViewController
  )

  return {
    playerViewController,
    gameboardViewController,
    sunViewController,
    gameViewController,
  }
}
