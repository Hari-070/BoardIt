const mongoose = require('mongoose')
const Board = require('./boardModel')

const UserModel=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    boards:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Board'
    }]
})

const User=new mongoose.model('User',UserModel)

module.exports=User