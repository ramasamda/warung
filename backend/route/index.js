const express = require('express')
const route = express.Router()

const userRoute = require('./itemRoute')

route.use('/user',userRoute)

module.exports = route