const route = require('express').Router()
const fileCtrl = require('../controller/fileCtrl')
const upload = require('../middleware/file')
const auth = require('../middleware/auth')


route.get(`/`,auth, fileCtrl.index)

route.post(`/upload`,auth, upload,fileCtrl.fileUpload)

route.delete(`/delete/:id`, auth, fileCtrl.fileDelete)

module.exports = route