import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import Garden from '#models/garden'
import Plant from '#models/plant'
import { createGardenValidator } from '#validators/garden'
import { PlantsPresenter } from '#presenters/plants_presenter'

@inject()
export default class GardensController {
  constructor(protected plantPresenter: PlantsPresenter) {}
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
      plants: plants.map((plant) => this.plantPresenter.toJson(plant)),
    })
  }
  /**
   * Création d'un jardin
   */
  async store({ request, response, session, auth }: HttpContext) {
    const payload = await request.validateUsing(createGardenValidator)
    const user = auth.getUserOrFail()

    const garden = new Garden()
    garden.name = payload.name
    garden.image = payload.image

    await garden.related('user').associate(user)

    session.flash('message', { type: 'success', description: 'Jardin créé' })

    return response.redirect().toRoute('gardens.create')
  }

  // /**
  //  * Affichage d'un jardin
  //  */
  // async show({ params }: HttpContext) {}

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
