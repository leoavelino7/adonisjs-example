'use strict'

const { validateAll } = use('Validator')

const User = use('App/Models/User')

class AuthController {
  async register({ request, response }) {
    const data = request.only(['username', 'email', 'password'])

    const errorMessage = {
      'password.required': 'Password is required field'
    }

    const rules = {
      'username': 'required|min:4|unique:users',
      'email': 'required|unique:users',
      'password': 'required|min:8|max:16'
    }

    const validation = await validateAll(data, rules, errorMessage)

    if(validation.fails()) {
      return response.status(401).send({ message: validation.messages() })
    }

    const user = await User.create(data)

    return user
  }

  async authenticate({ request, auth }) {
    const { email, password } = request.all()

    const token = await auth.attempt(email, password)

    return token
  }
}

module.exports = AuthController
