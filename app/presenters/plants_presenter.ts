import Plant from '#models/plant'
import PlantService from '#services/plant_service'

export class PlantsPresenter {
  toJson(plant: Plant) {
    return {
      id: plant.id,
      name: plant.name,
      image: plant.image ?? '',
      type: plant.type,
      typeLabel: PlantService.types.find((option) => option.value === plant.type)?.label ?? '',
      comment: plant.comment ?? '',
    }
  }
}
