import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import Plant from '#models/plant'
import Period from '#models/period'
import PlantService from '#services/plant_service'
import { createPlantValidator, filterPlantValidator } from '#validators/plant'
import { PlantRepository } from '#repositories/plant_repository'
import { GardenRepository } from '#repositories/garden_repository'
import { PlantsPresenter } from '#presenters/plants_presenter'

@inject()
export default class PlantsController {
  constructor(
    private readonly plantRepository: PlantRepository,
    private readonly gardenRepository: GardenRepository
  ) {}
  /**
   * Affichage d'une liste de plante
   */
  async index({ request, inertia }: HttpContext) {
    const filter = await filterPlantValidator.validate(request.qs())

    const plants = await Plant.query()
      .if(filter.name, (query) => query.whereILike('name', `%${filter.name}%`))
      .if(filter.type, (query) => query.where('type', filter.type!))
      .orderBy('name')

    return inertia.render('plant/index', {
      plants: plants.map((plant) => new PlantsPresenter(plant).toJson()),
    })
  }

  /**
   * Affichage d'un formulaire pour l'ajout d'une plante
   */
  async create({ inertia }: HttpContext) {
    return inertia.render('plant/create_edit', {
      plant: new PlantsPresenter(new Plant()).toJson(),
    })
  }

  /**
   * Ajout d'une plante
   */
  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(createPlantValidator)

    await db.transaction(async (trx) => {
      const plant = await Plant.create(
        {
          name: payload.name,
          image: payload.image,
          type: payload.type,
          comment: payload.comment,
        },
        { client: trx }
      )

      const periodPayloads = {
        seedPot: payload.seedPotPeriod,
        seedSoil: payload.seedSoilPeriod,
        plantation: payload.plantationPeriod,
        mature: payload.maturePeriod,
      }

      const periods = PlantService.periodTypes.map((type) => {
        const period = new Period()

        period.plantId = plant.id
        period.type = type

        PlantService.months.forEach((month) => {
          period[month] = periodPayloads[type].includes(month)
        })

        return period
      })

      await plant.related('periods').createMany(periods)
    })

    session.flash('message', { type: 'success', description: 'Plante ajoutée' })

    return response.redirect().back()
  }

  /**
   * Affichage d'une plante
   */
  async show({ inertia, params }: HttpContext) {
    const plant = await this.plantRepository.findWithPeriodsById(params.id)

    return inertia.render('plant/show', {
      plant: new PlantsPresenter(plant).toJson(),
    })
  }

  /**
   * Affichage d'un formulaire pour la modification d'une plante
   */
  async edit({ inertia, params }: HttpContext) {
    const plant = await this.plantRepository.findWithPeriodsById(params.id)

    return inertia.render('plant/create_edit', {
      plant: new PlantsPresenter(plant).toJson(),
    })
  }

  /**
   * Modification d'une plante
   */
  async update({ request, response, session, params }: HttpContext) {
    const payload = await request.validateUsing(createPlantValidator)

    await db.transaction(async (trx) => {
      const plant = await Plant.findOrFail(params.id, { client: trx })
      const periods = await plant.related('periods').query()

      plant.name = payload.name
      plant.image = payload.image
      plant.type = payload.type
      plant.comment = payload.comment

      await plant.save()

      const periodPayloads = {
        seedPot: payload.seedPotPeriod,
        seedSoil: payload.seedSoilPeriod,
        plantation: payload.plantationPeriod,
        mature: payload.maturePeriod,
      }

      PlantService.periodTypes.forEach((type) => {
        const period = periods.find((p) => p.type === type)

        if (period) {
          PlantService.months.forEach((month) => {
            period[month] = periodPayloads[type].includes(month)
          })
        }
      })

      await plant.related('periods').saveMany(periods)
    })

    session.flash('message', { type: 'success', description: 'Plante modifiée' })

    return response.redirect().back()
  }

  /**
   * Suppression d'une plante
   */
  async destroy({ response, session, params }: HttpContext) {
    const plant = await this.plantRepository.findById(params.id)
    const garden = await this.gardenRepository.findFirstByPlant(params.id)

    if (garden) {
      session.flash('message', {
        type: 'error',
        description: "Cette plante ne peut pas être supprimée, car au moins un jardin l'héberge.",
      })
      return response.redirect().back()
    }

    await plant.delete()

    session.flash('message', { type: 'success', description: 'Plante supprimée' })

    return response.redirect().toRoute('plants.index')
  }
}
