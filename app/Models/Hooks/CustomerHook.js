'use strict'

const uuidV4 = require('uuid/v4')

const CustomerHook = exports = module.exports = {}

CustomerHook.uuid = async (customer) => {
  customer.uuid = uuidV4()
}
