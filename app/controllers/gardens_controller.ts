import type { HttpContext } from '@adonisjs/core/http'
import Garden from '#models/garden'
import { createGardenValidator } from '#validators/garden'

export default class GardensController {
  // /**
  //  * Affichage d'une liste de jardins
  //  */
  // async index({}: HttpContext) {}

  /**
   * Affichage d'un formulaire pour la création d'un jardin
   */
  async create({ inertia }: HttpContext) {
    return inertia.render('garden/create')
  }
  /**
   * Création d'un jardin
   */
  async store({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(createGardenValidator)
    const user = auth.getUserOrFail()

    const garden = new Garden()
    garden.name = payload.name
    garden.image = payload.image

    await garden.related('user').associate(user)

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
