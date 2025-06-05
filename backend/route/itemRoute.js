const userController = require('../controller/userController')
const express = require('express')
const upload = require('../helper/multer')
const userRoute = express.Router()
const {authentication} = require('../middlewares/auth')

userRoute.get('/',authentication,userController.getUser)
userRoute.get('/profile',authentication,userController.getUserId)
userRoute.post('/create',userController.create)
userRoute.get('/delete/:id',userController.delete)
userRoute.post('/login',userController.login)
userRoute.get('/:id',userController.getProfile)
userRoute.post('/updateImage/:id',upload.single('image'),userController.updateImage)

module.exports = userRoute