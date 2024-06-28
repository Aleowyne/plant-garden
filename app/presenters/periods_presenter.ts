import Period from '#models/period'

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
    const months = [
      'january',
      'february',
      'march',
      'april',
      'may',
      'june',
      'july',
      'august',
      'september',
      'october',
      'november',
      'december',
    ]
    const periodsOfType = periods.find((period) => period.type === type)

    if (periodsOfType) {
      return months.reduce((acc, month) => {
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
