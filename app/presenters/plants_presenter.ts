import Plant from '#models/plant'
import PlantService from '#services/plant_service'
import { PeriodsPresenter } from '#presenters/periods_presenter'

export type PlantsPresenterSerialized = ReturnType<PlantsPresenter['toJson']>

export class PlantsPresenter {
  constructor(private readonly plant: Plant) {}

  toJson() {
    return {
      id: this.plant.id,
      name: this.plant.name,
      image: this.plant.image ?? '',
      type: this.plant.type,
      typeLabel: PlantService.types.find((option) => option.value === this.plant.type)?.label ?? '',
      comment: this.plant.comment ?? '',
      periods: new PeriodsPresenter(this.plant.periods).toJson(),
    }
  }
}
