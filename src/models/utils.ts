import { GamefieldDistance, FertilityIndex } from "./gamefield-model"

export function mapDistanceFromCenterToFertilityIndex(
  distanceFromCenter: GamefieldDistance
): FertilityIndex {
  switch (distanceFromCenter) {
    case 0:
      return 4
    case 1:
      return 3
    case 2:
      return 2
    case 3:
      return 1
  }
}

export function mapFertilityIndexToDistanceFromCenter(
  fertilityIndex: FertilityIndex
): GamefieldDistance {
  switch (fertilityIndex) {
    case 4:
      return 0
    case 3:
      return 1
    case 2:
      return 2
    case 1:
      return 3
  }
}
