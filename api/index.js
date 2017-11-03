const express = require('express')
const gist = require('./gist')

// Create express router
const router = express.Router()

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()

const app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

// Add Gist Routes
router.use(gist)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: router
}
