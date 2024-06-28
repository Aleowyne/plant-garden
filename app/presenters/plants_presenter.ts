import Plant from '#models/plant'

export class PlantsPresenter {
  toJson(plant: Plant) {
    return {
      id: plant.id,
      name: plant.name,
      image: plant.image ?? '',
      type: plant.type,
      comment: plant.comment ?? '',
    }
  }
}
