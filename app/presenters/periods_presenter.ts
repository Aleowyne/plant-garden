import Period from '#models/period'
import PlantService from '#services/plant_service'

export type PeriodsPresenterSerialized = ReturnType<PeriodsPresenter['toJson']>

export class PeriodsPresenter {
  constructor(private readonly periods: Period[]) {}

  toJson() {
    return {
      seedPotPeriod: getPeriodsOfType('seedPot', this.periods),
      seedSoilPeriod: getPeriodsOfType('seedSoil', this.periods),
      plantationPeriod: getPeriodsOfType('plantation', this.periods),
      maturePeriod: getPeriodsOfType('mature', this.periods),
    }
  }
}

function getPeriodsOfType(type: string, periods: Period[] = []): string[] {
  const periodsOfType = periods.find((period) => period.type === type)

  if (periodsOfType) {
    return PlantService.months.reduce((acc, month) => {
      if (periodsOfType.$getAttribute(month)) {
        acc.push(month)
      }
      return acc
    }, new Array<string>())
  } else {
    return new Array<string>()
  }
}
