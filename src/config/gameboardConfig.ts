import { Point } from "../models/point-model"

import { GameboardFieldProps } from "../components/gameboard/GameboardField"

export enum GamefieldBackground {
  Center = ` rgba(80, 107, 32, 1)`,
  FirstRow = ` rgba(125, 145, 52, 1)`,
  SecondRow = `rgba(162, 168, 82, 1)`,
  ThirdRow = ` rgba(204, 197, 126, 1)`,
  Sun = `rgba(219, 188, 10, 1)`,
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
  background: GamefieldBackground[]
}

export const defaultConfig = {}
