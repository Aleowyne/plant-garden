import Period from '#models/period'
import PlantService from '#services/plant_service'

export type PeriodsPresenterSerialized = ReturnType<PeriodsPresenter['toJson']>

export class PeriodsPresenter {
  constructor(private readonly periods: Period[]) {}

  toJson() {
    return {
      seedPotPeriod: getPeriodsOfType(this.periods, 'seedPot'),
      seedSoilPeriod: getPeriodsOfType(this.periods, 'seedSoil'),
      plantationPeriod: getPeriodsOfType(this.periods, 'plantation'),
      maturePeriod: getPeriodsOfType(this.periods, 'mature'),
    }
  }
}

function getPeriodsOfType(periods: Period[], type: string): string[] {
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
