import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'
import Garden from '#models/garden'
import Plant from '#models/plant'
import Plot from '#models/plot'
import { createGardenValidator } from '#validators/garden'
import { GardensPresenter } from '#presenters/gardens_presenter'
import { PlantsPresenter } from '#presenters/plants_presenter'

@inject()
export default class GardensController {
  // /**
  //  * Affichage d'une liste de jardins
  //  */
  // async index({}: HttpContext) {}

  /**
   * Affichage d'un formulaire pour la création d'un jardin
   */
  async create({ inertia }: HttpContext) {
    const plants = await Plant.query().orderBy('name')

    return inertia.render('garden/create', {
      plants: inertia.optional(() => plants.map((plant) => new PlantsPresenter(plant).toJson())),
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
    const garden = await Garden.query()
      .where('id', params.id)
      .preload('plots')
      .preload('plots', (plotsQuery) => {
        plotsQuery.preload('plant')
      })
      .firstOrFail()

    return inertia.render('garden/show', {
      garden: new GardensPresenter(garden).toJson(),
    })
  }

  // /**
  //  * Affichage d'un formulaire pour la modification d'un jardin
  //  */
  // async edit({ params }: HttpContext) {}

  // /**
  //  * Modification d'un jardin
  //  */
  // async update({ params, request }: HttpContext) {}

  // /**
  //  * Suppression d'un jardin
  //  */
  // async destroy({ params }: HttpContext) {}
}
