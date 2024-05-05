import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { createPlantValidator } from "#validators/plant"
import Plant from "#models/plant"

export default class PlantsController {
  async create({ inertia }: HttpContext) {
    return inertia.render('plant/create')
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(createPlantValidator)

    await db.transaction(async (trx) => {
      const plant = await Plant.create({
        name: payload.name,
        image: payload.image,
        type: payload.type,
        comment: payload.comment
      }, { client: trx })

      await plant.related('periods').createMany([
        {
          type: 'seedPot',
          ...Object.fromEntries(payload.seedPotPeriod.map(period => [period, true]))
        },
        {
          type: 'seedSoil',
          ...Object.fromEntries(payload.seedSoilPeriod.map(period => [period, true]))
        },
        {
          type: 'plantation',
          ...Object.fromEntries(payload.plantationPeriod.map(period => [period, true]))
        },
        {
          type: 'mature',
          ...Object.fromEntries(payload.maturePeriod.map(period => [period, true]))
        },
      ])
    })

    session.flash('message', { type: 'success', content: "Plante créée" })

    return response.redirect('/plants/create')
  }
}
