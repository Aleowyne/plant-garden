import type { HttpContext } from '@adonisjs/core/http'
import { loginUserValidator } from '#validators/user'
import User from '#models/user'

export default class LoginController {
  async index({ response, auth }: HttpContext) {
    await auth.authenticate()

    if (auth.isAuthenticated) {
      return response.redirect().back()
    }

    return response.redirect('login')
  }

  async store({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(loginUserValidator)
    const user = await User.verifyCredentials(payload.email, payload.password)

    await auth.use('web').login(user)

    return response.redirect('/')
  }
}
