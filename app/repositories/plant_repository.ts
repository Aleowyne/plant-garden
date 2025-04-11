import Plant from '#models/plant'

export class PlantRepository {
  async findAll() {
    return await Plant.query().orderBy('name')
  }
}
