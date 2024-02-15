import type { HttpContext } from '@adonisjs/core/http'

export default class PlantsController {
  async create(ctx: HttpContext) {
    return ctx.inertia.render('plant/create')
  }
}
