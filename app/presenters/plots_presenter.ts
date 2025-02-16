import Plot from '#models/plot'

export type PlotsPresenterSerialized = ReturnType<PlotsPresenter['toJson']>

export class PlotsPresenter {
  constructor(private readonly plot: Plot) {}

  toJson() {
    return {
      id: this.plot.id,
      row: this.plot.row,
      column: this.plot.column,
      plantId: this.plot.plantId,
      plantName: this.plot.plant.name ?? '',
      plantImage: this.plot.plant.image ?? '',
      plantationDate: this.plot.plantedAt?.toFormat('yyyy-MM-dd') ?? '',
      removeDate: this.plot.removedAt?.toFormat('yyyy-MM-dd') ?? '',
    }
  }
}
