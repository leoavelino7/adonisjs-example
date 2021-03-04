'use strict'

class TestController {

  /**
  * @swagger
  *  message: Hello Guess
  * /api/hello:
  *   get:
  *     tags:
  *       - Test
  *     summary: Sample API
  *     security:
  *       - OAuth2: [admin]
  *     consumes:
  *       - application/json
  *     produces:
  *       - application/json
  *       - application/xml
  *     parameters:
  *       - in: query
  *         name: name
  *         description: Name of the user
  *         required: false
  *         type: string
  *     responses:
  *       200:
  *         description: Send hello message
  *         schema:
  *           type: object
  *           properties:
  *             id:
  *                 type: integer
  *                 example: 4
  *       401:
  *         description: Not authorized
  */
  async hello({ request, response }) {
    const name = request.input('name', 'Guess')
    response.send({ message: 'Hello ' + name })
  }
}

module.exports = TestController
