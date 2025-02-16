import Garden from '#models/garden'
import { PlotsPresenter } from './plots_presenter.js'

export type GardensPresenterSerialized = ReturnType<GardensPresenter['toJson']>

export class GardensPresenter {
  constructor(private readonly garden: Garden) {}

  toJson() {
    return {
      id: this.garden.id,
      name: this.garden.name,
      image: this.garden.image ?? '',
      nbCol: this.garden.nbCol,
      nbRow: this.garden.nbRow,
      plots: this.garden.plots.map((plot) => new PlotsPresenter(plot).toJson()),
    }
  }
}
