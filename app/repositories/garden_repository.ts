import Garden from '#models/garden'

export class GardenRepository {
  async findByIdWithPlots(id: number) {
    return await Garden.query()
      .where('id', id)
      .preload('plots', (plotsQuery) => {
        plotsQuery.preload('plant')
      })
      .firstOrFail()
  }

  async findById(id: number) {
    return await Garden.findOrFail(id)
  }
}
