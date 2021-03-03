'use strict'

const { validate, validateAll, formatters } = use('Validator')

const Database = use('Database')
const Helpers = use('Helpers')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/register', 'AuthController.register')
Route.post('/authenticate', 'AuthController.authenticate')

Route.group(() => {
  Route.get('/app', 'AppController.index').middleware(['auth'])
  Route.resource('tweets', 'TweetController').apiOnly().except(['update'])
  Route.resource('files', 'FileController').apiOnly().only(['store'])
  Route.resource('users', 'UserController').apiOnly().only(['index'])
}).middleware('auth')

Route.get('/', async ({ request, response }) => {
  const tweet = Database
    .select('content')
    .from('tweets')
    .where('user_id', '>=', 1)
    .first()

  return tweet
})

Route.post('/', ({ request, response }) => {
  return response.sendStatusAndJson(200, {body: request.all()})
  // return response.status(201).json({body: request.all()})
})


Route.get('/testNumber', ({ request, response, view }) => {
  console.log(request.format());
  const guessedNumber = Number(request.input('number'))
  const randomNumber = Math.floor(Math.random() * 20) + 1

  /** create cookie */
  response.cookie('number', randomNumber)
  response.plainCookie('numberUnsigned', randomNumber)

  /** rendering view */
  return view.render('number', { guessedNumber, randomNumber })
})
.formats(['html', 'json'])
.prefix('api/v1')


Route.get('/downloadFile', ({ request, response }) => {
  const { force } = request.get()

  if(force) {
    response.attachment(Helpers.tmpPath('files/curriculo-leonardo-avelino.pdf'))
  } else {
    response.download(Helpers.tmpPath('files/curriculo-leonardo-avelino.pdf'))
  }
})

Route.get('login/facebook', 'LoginFacebookController.redirect')
Route.get('authenticated/facebook', 'LoginFacebookController.callback')
