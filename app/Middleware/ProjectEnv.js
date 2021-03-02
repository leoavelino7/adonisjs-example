'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


class ProjectEnv {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, view }, next) {
    // call next to advance the request
    const Config = use('Config')

    view.share({
      appName: Config.get('app.name')
    })

    await next()
  }
}

module.exports = ProjectEnv
