import { Point } from "../utils/Point"

export type HexAxial = {
  r: number
  q: number
}

export function offsetToPixel(hex: HexAxial, d: number): Point {
  var x = d * Math.sqrt(3) * (hex.r + 0.5 * hex.q)
  var y = ((d * 3) / 2) * hex.q
  return new Point(x, y)
}
