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
const LogoutController = () => import('#controllers/logout_controller')
const PlantController = () => import('#controllers/plants_controller')
const GardenController = () => import('#controllers/gardens_controller')

router
  .group(() => {
    router.get('/', (ctx: HttpContext) => {
      return ctx.inertia.render('main', {
        title: 'Testing!',
      })
    })

    router.get('logout', [LogoutController, 'index'])

    router
      .group(() => {
        router.get('/', [PlantController, 'index']).as('index')

        router.get('/create', [PlantController, 'create']).as('create')

        router.post('/', [PlantController, 'store']).as('store')

        router
          .get('/:id', [PlantController, 'show'])
          .where('id', router.matchers.number())
          .as('show')

        router
          .get('/:id/edit', [PlantController, 'edit'])
          .where('id', router.matchers.number())
          .as('edit')

        router
          .put('/:id', [PlantController, 'update'])
          .where('id', router.matchers.number())
          .as('update')

        router
          .delete('/:id', [PlantController, 'destroy'])
          .where('id', router.matchers.number())
          .as('delete')
      })
      .prefix('plants')
      .as('plants')

    router
      .group(() => {
        // router.get('/', [GardenController, 'index']).as('index')

        router.get('/create', [GardenController, 'create']).as('create')

        router.post('/', [GardenController, 'store']).as('store')

        /* router
          .get('/:id', [GardenController, 'show'])
          .where('id', router.matchers.number())
          .as('show')

        router
          .get('/:id/edit', [GardenController, 'edit'])
          .where('id', router.matchers.number())
          .as('edit')

        router
          .put('/:id', [GardenController, 'update'])
          .where('id', router.matchers.number())
          .as('update')

        router
          .delete('/:id', [GardenController, 'destroy'])
          .where('id', router.matchers.number())
          .as('delete') */
      })
      .prefix('gardens')
      .as('gardens')
  })
  .use(middleware.auth())

router
  .group(() => {
    router.get('signin', [SigninController, 'index'])
    router.post('signin', [SigninController, 'store'])

    router.get('login', [LoginController, 'index'])
    router.post('login', [LoginController, 'store'])
  })
  .use(middleware.guest())
