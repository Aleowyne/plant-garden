import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator } from "#validators/user"
import User from "#models/user"

export default class SigninController {
  async index(ctx: HttpContext) {
    return ctx.inertia.render('auth/signin')
  }

  async store(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(createUserValidator)
    const searchPayload = { email: payload.email }

    const user = await User.firstOrCreate(searchPayload, payload)

    if (user.$isLocal) {
      ctx.response.redirect('auth/login')
    } else {
      return ctx.inertia.render('auth/signin', { message: 'Erreur à l\'inscription' })
    }
  }
}
