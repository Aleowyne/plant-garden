import Garden from '#models/garden'

export class GardenRepository {
  async findWithPlotsByIdAndUser(id: number, userId: number) {
    return await Garden.query()
      .where('id', id)
      .where('user_id', userId)
      .preload('plots', (plotsQuery) => {
        plotsQuery.preload('plant')
      })
      .firstOrFail()
  }

  async findByIdAndUser(id: number, userId: number) {
    return await Garden.query().where('id', id).where('user_id', userId).firstOrFail()
  }

  async findAllByUser(userId: number) {
    return await Garden.query().where('user_id', userId).orderBy('name')
  }

  async findFirstByPlant(plantId: number) {
    return await Garden.query()
      .whereHas('plots', (plotsQuery) => {
        plotsQuery.where('plant_id', plantId)
      })
      .first()
  }
}
