import Period from '#models/period'
import PlantService from '#services/plant_service'

export class PeriodsPresenter {
  toJson(periods: Period[]) {
    return {
      seedPotPeriod: this.getPeriodsOfType(periods, 'seedPot'),
      seedSoilPeriod: this.getPeriodsOfType(periods, 'seedSoil'),
      plantationPeriod: this.getPeriodsOfType(periods, 'plantation'),
      maturePeriod: this.getPeriodsOfType(periods, 'mature'),
    }
  }

  getPeriodsOfType(periods: Period[], type: string): string[] {
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
}
