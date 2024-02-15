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
import { middleware } from '#start/kernel'
const SigninController = () => import('#controllers/signin_controller')
const LoginController = () => import('#controllers/login_controller')
const PlantController = () => import('#controllers/plants_controller')

router
  .group(() => {
    router.get('/', (ctx: HttpContext) => {
      return ctx.inertia.render('main', { title: 'Testing!' })
    })

    router.get('/logout', async ({ response, auth }) => {
      await auth.use('web').logout()
      return response.redirect('login')
    })

    router
      .group(() => {
        router.get('/create', [PlantController, 'create'])
        router.post('/', async ({ response }) => {
          return response.redirect().back()
        })
      })
      .prefix('plants')
  })
  .use(middleware.auth())

router.get('/signin', [SigninController, 'index'])
router.post('/signin', [SigninController, 'store'])

router.get('/login', [LoginController, 'index'])
router.post('/login', [LoginController, 'store'])
