'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeCreate', 'CustomerHook.uuid')

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })

  }

  static get computed() {
    return ['usernameAndEmail']
  }

  static get dates () {
    return super.dates.concat(['dob'])
  }

  static formatDates (field, value) {
    if (field === 'dob') {
      return value.format('YYYY-MM-DD')
    }
    return super.formatDates(field, value)
  }

  static castDates (field, value) {
    console.log(field);
    if (field === 'updated_at') {
      return `${value.fromNow(true)} old`
    }
    return super.formatDates(field, value)
  }

  static get hidden() {
    return ['password', 'id']
  }

  getUsernameAndEmail({ username, email}) {
    return `${username} - ${email}`
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  tweets() {
    return this.hasMany('App/Models/Tweet')
  }

  files() {
    return this.hasMany('App/Models/File')
  }
}

module.exports = User
