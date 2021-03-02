const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const Response = use('Adonis/Src/Response')
  const View = use('View')

  Response.macro('sendStatusAndJson', function (status, json) {
    this.status(status).send({
      status,
      ...json
    })
  })

  View.global('currentTime', function () {
    return new Date().getTime()
  })

  View.global('messages', {
    success: 'This is a success message',
    warning: 'This is a warning message'
  })

  View.global('getMessage', function (type) {
    const messages = this.resolve('messages')
    return messages[type]
  })
})
