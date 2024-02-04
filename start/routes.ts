/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import { HttpContext } from '@adonisjs/core/http'
import SigninController from '#controllers/signin_controller'

router.get('/', (ctx: HttpContext) => {
  return ctx.inertia.render('main', { title: 'Testing!' })
})

router.get('signin', [SigninController, 'index'])
router.post('signin', [SigninController, 'store'])