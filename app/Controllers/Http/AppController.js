'use strict'

class AppController {
  async index() {
    return { message: 'hello world' }
  }
}

module.exports = AppController
