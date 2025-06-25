const express=require('express')
const { createBoard, getBoards, updateBoard, getBoardById, deleteBoard } = require('../controllers/boardController')
const middle = require('../middleware/authMiddleware')


const router=express.Router()

router.post('/createBoard',middle,createBoard)
router.get('/getBoards',middle,getBoards)
router.put('/board/:id',middle,updateBoard)
router.get('/getBoard/:id',middle,getBoardById)
router.delete('/board/:id',middle,deleteBoard)

module.exports=router