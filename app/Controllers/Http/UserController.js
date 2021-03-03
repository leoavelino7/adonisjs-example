'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')

const Logger = use('Logger').transport('file')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with files
 */
class UserController {
  async store ({ request, response, session }) {

    const rules = {
      email: 'required|email|unique:users,email',
      password: 'required'
    }

    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept(['password'])

      return response.redirect('back')
    }

    return 'Validation Passed'
  }

  /**
   * Show a list of all files.
   * GET files
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view, auth }) {

    Logger.info('request url is %s', request.url())

    Logger.emerg('request details %j', {
      url: request.url(),
      user: auth.user.username
    })

    // const user = await User.query().where('id', 1).first()
    // await user.load('files')
    const user = await User
      .query()
      .where('id', auth.user.primaryKeyValue)
      .withCount('files as total_files')
      .first()
      // .fetch()

    const userJson = user.toJSON()

    return userJson
  }
}

module.exports = UserController
