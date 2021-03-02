const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const Response = use('Adonis/Src/Response')

  Response.macro('sendStatusAndJson', function (status, json) {
    this.status(status).send({
      status,
      ...json
    })
  })
})
