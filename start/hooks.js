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
})
