// setting the environment variables
require('dotenv').config()

const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const grant = require('grant-express')
const grantConfig = require('./utils/factory-grant-config')()

const app = express()

const routes = require('./routes')

app.use(bodyParser.json())
app.use(session({secret: 'grant'}))
app.use(grant(grantConfig))
app.use(routes)

// Export the server middleware
module.exports = {
  path: '/auth',
  handler: app
}
