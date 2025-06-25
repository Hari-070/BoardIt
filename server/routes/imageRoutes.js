const express=require('express')
const middle = require('../middleware/authMiddleware')
const { addImage, deleteImage } = require('../controllers/imageController')

const router=express.Router()

router.post('/image/:boardId',middle,addImage)
router.delete('/image/:boardId',middle,deleteImage)


module.exports=router