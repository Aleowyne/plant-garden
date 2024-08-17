type PlantOption = {
  id: string
  value: string
  label: string
}

export default class PlantService {
  static readonly periodTypes = ['seedPot', 'seedSoil', 'plantation', 'mature'] as const

  static readonly months = [
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
  ] as const

  static readonly types: PlantOption[] = [
    { id: 'flower', value: 'flower', label: 'Fleur' },
    { id: 'vegetable', value: 'vegetable', label: 'Plante potagère' },
    { id: 'aromatic', value: 'aromatic', label: 'Plante aromatique' },
  ]

  static readonly periods: PlantOption[] = [
    { id: '', value: 'january', label: 'Janv.' },
    { id: '', value: 'february', label: 'Févr.' },
    { id: '', value: 'march', label: 'Mars' },
    { id: '', value: 'april', label: 'Avr.' },
    { id: '', value: 'may', label: 'Mai' },
    { id: '', value: 'june', label: 'Juin' },
    { id: '', value: 'july', label: 'Juill.' },
    { id: '', value: 'august', label: 'Août' },
    { id: '', value: 'september', label: 'Sept.' },
    { id: '', value: 'october', label: 'Oct.' },
    { id: '', value: 'november', label: 'Nov.' },
    { id: '', value: 'december', label: 'Déc.' },
  ]

  static getPeriodOptions() {
    return this.periodTypes.map((type) => {
      let periods = this.periods.map((period) => {
        period.id = `${type}_${period.value}`
        return period
      })

      return { type, periods }
    })
  }
}
