import Garden from '#models/garden'

export class GardenRepository {
  async findByIdAndUserWithPlots(id: number, userId: number) {
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
}
