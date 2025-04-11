import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'
import Garden from '#models/garden'
import Plot from '#models/plot'
import { createGardenValidator } from '#validators/garden'
import { PlantRepository } from '#repositories/plant_repository'
import { GardenRepository } from '#repositories/garden_repository'
import { PlantsPresenter } from '#presenters/plants_presenter'
import { GardensPresenter } from '#presenters/gardens_presenter'

@inject()
export default class GardensController {
  constructor(
    private readonly gardenRepository: GardenRepository,
    private readonly plantRepository: PlantRepository
  ) {}
  // /**
  //  * Affichage d'une liste de jardins
  //  */
  // async index({}: HttpContext) {}

  /**
   * Affichage d'un formulaire pour la création d'un jardin
   */
  async create({ inertia }: HttpContext) {
    return inertia.render('garden/create', {
      plants: inertia.optional(async () => {
        const plants = await this.plantRepository.findAll()
        return plants.map((plant) => new PlantsPresenter(plant).toJson())
      }),
    })
  }

  /**
   * Création d'un jardin
   */
  async store({ request, response, session, auth }: HttpContext) {
    const payload = await request.validateUsing(createGardenValidator)
    const user = auth.getUserOrFail()

    await db.transaction(async (trx) => {
      const garden = await Garden.create(
        {
          name: payload.name,
          image: payload.image,
          nbCol: payload.nbCol,
          nbRow: payload.nbRow,
        },
        { client: trx }
      )

      const plots = payload.plantPositions
        .filter((position) => position.plantId)
        .map((position) => {
          const plot = new Plot()

          plot.gardenId = garden.id
          plot.row = position.row
          plot.column = position.column
          plot.plantId = position.plantId

          if (position.plantationDate) {
            plot.plantedAt = DateTime.fromISO(position.plantationDate)
          }

          return plot
        })

      await garden.related('user').associate(user)
      await garden.related('plots').createMany(plots)
    })

    session.flash('message', { type: 'success', description: 'Jardin créé' })

    return response.redirect().back()
  }

  /**
   * Affichage d'un jardin
   */
  async show({ inertia, params }: HttpContext) {
    return inertia.render('garden/show', {
      garden: async () => {
        const garden = await this.gardenRepository.findByIdWithPlots(params.id)
        return new GardensPresenter(garden).toJson()
      },
    })
  }

  /**
   * Affichage d'un formulaire pour la modification d'un jardin
   */
  async edit({ inertia, params }: HttpContext) {
    return inertia.render('garden/edit', {
      garden: async () => {
        const garden = await this.gardenRepository.findByIdWithPlots(params.id)
        return new GardensPresenter(garden).toJson()
      },
      plants: inertia.optional(async () => {
        const plants = await this.plantRepository.findAll()
        return plants.map((plant) => new PlantsPresenter(plant).toJson())
      }),
    })
  }

  /**
   * Modification d'un jardin
   */
  async update({ request, response, session, params }: HttpContext) {
    const payload = await request.validateUsing(createGardenValidator)

    await db.transaction(async (trx) => {
      const garden = await Garden.findOrFail(params.id, { client: trx })
      const plots = await garden.related('plots').query()

      garden.name = payload.name
      garden.image = payload.image
      garden.nbCol = payload.nbCol
      garden.nbRow = payload.nbRow

      await garden.save()

      const plotsToUpdate = payload.plantPositions
        .filter((plantPosition) => plantPosition.plantId)
        .map((plantPosition) => {
          let plot = plots.find(
            (position) => position.row === plantPosition.row && position.column === plantPosition.column
          )

          // Ajout d'une nouvelle plante
          if (!plot) {
            plot = new Plot()
            plot.gardenId = garden.id
            plot.row = plantPosition.row
            plot.column = plantPosition.column
            plot.plantId = plantPosition.plantId

            if (plantPosition.plantationDate) {
              plot.plantedAt = DateTime.fromISO(plantPosition.plantationDate)
            }
          }
          // Mise à jour d'une plante
          else {
            plot.plantId = plantPosition.plantId
            plot.plantedAt = plantPosition.plantationDate ? DateTime.fromISO(plantPosition.plantationDate) : null
          }

          return plot
        })

      await Plot.updateOrCreateMany(['row', 'column'], plotsToUpdate, { client: trx })
    })

    session.flash('message', { type: 'success', description: 'Jardin modifié' })

    return response.redirect().back()
  }

  /**
   * Suppression d'un jardin
   */
  async destroy({ response, session, params }: HttpContext) {
    const garden = await this.gardenRepository.findById(params.id)
    await garden.delete()

    session.flash('message', { type: 'success', description: 'Jardin supprimé' })

    return response.redirect().toRoute('gardens.index')
  }
}
