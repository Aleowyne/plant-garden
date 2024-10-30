import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import Plant from '#models/plant'
import Period from '#models/period'
import PlantService from '#services/plant_service'
import { createPlantValidator, filterPlantValidator } from '#validators/plant'
import { PlantsPresenter } from '#presenters/plants_presenter'
import { PeriodsPresenter } from '#presenters/periods_presenter'

@inject()
export default class PlantsController {
  constructor(
    protected plantPresenter: PlantsPresenter,
    protected periodPresenter: PeriodsPresenter
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
      plants: plants.map((plant) => this.plantPresenter.toJson(plant)),
      typeOptions: PlantService.types,
    })
  }

  /**
   * Affichage d'un formulaire pour la création d'une plante
   */
  async create({ inertia }: HttpContext) {
    return inertia.render('plant/create', {
      typeOptions: PlantService.types,
      periodOptions: PlantService.getPeriodOptions(),
    })
  }

  /**
   * Création d'une plante
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

    session.flash('message', { type: 'success', description: 'Plante créée' })

    return response.redirect().toRoute('plants.create')
  }

  /**
   * Affichage d'une plante
   */
  async show({ inertia, params }: HttpContext) {
    const plant = await Plant.findOrFail(params.id)
    const periods = await plant.related('periods').query()

    return inertia.render('plant/show', {
      plant: this.plantPresenter.toJson(plant),
      periods: this.periodPresenter.toJson(periods),
      typeOptions: PlantService.types,
      periodOptions: PlantService.getPeriodOptions(),
    })
  }

  /**
   * Affichage d'un formulaire pour la modification d'une plante
   */
  async edit({ inertia, params }: HttpContext) {
    const plant = await Plant.findOrFail(params.id)
    const periods = await plant.related('periods').query()

    return inertia.render('plant/edit', {
      plant: this.plantPresenter.toJson(plant),
      periods: this.periodPresenter.toJson(periods),
      typeOptions: PlantService.types,
      periodOptions: PlantService.getPeriodOptions(),
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

    return response.redirect().toRoute('plants.show', { id: params.id })
  }

  /**
   * Suppression d'une plante
   */
  async destroy({ response, session, params }: HttpContext) {
    const plant = await Plant.findOrFail(params.id)
    await plant.delete()

    session.flash('message', { type: 'success', description: 'Plante supprimée' })

    return response.redirect().toRoute('plants.index')
  }
}
