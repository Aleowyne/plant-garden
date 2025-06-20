import Plant from '#models/plant'

export class PlantRepository {
  async findById(id: number) {
    return await Plant.findOrFail(id)
  }

  async findWithPeriodsById(id: number) {
    return await Plant.query().where('id', id).preload('periods').firstOrFail()
  }

  async findAll() {
    return await Plant.query().orderBy('name')
  }
}
