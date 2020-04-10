import { Point } from "../utils/Point"

import { GameboardFieldProps } from "../gameboard/GameboardField"

enum GamefieldBackground {
  Center = "#2a5413",
  FirstRow = "#5f913a",
  SecondRow = "#8eb354",
  ThirdRow = "#adbd53",
}

export const colorsGradient = [
  GamefieldBackground.Center,
  GamefieldBackground.FirstRow,
  GamefieldBackground.SecondRow,
  GamefieldBackground.ThirdRow,
]

export class GameConfig {
  gamefieldConfig: GameboardFieldProps = { radius: 37, distance: 10 }
  colorsConfig: ColorsConfig = { background: colorsGradient }

  constructor(readonly center: Point) {
    this.center = center
  }
}

export type ColorsConfig = {
  background: string[]
}

export const defaultConfig = {}
