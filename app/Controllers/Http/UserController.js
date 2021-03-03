'use strict'

const User = use('App/Models/User')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with files
 */
class UserController {
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
    // const user = await User.query().where('id', 1).first()
    // await user.load('files')

    const user = await User
      .query()
      .where('id', auth.user.primaryKeyValue)
      .withCount('files as total_files')
      .first()
      // .fetch()

    const userJson = user.toJSON()

    console.log(userJson);
    return userJson
  }
}

module.exports = UserController
