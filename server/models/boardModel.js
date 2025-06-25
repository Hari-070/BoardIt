const mongoose=require('mongoose')


const ImageModel=mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    position:{
        type:Number
    }
})


const BoardModel= mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    images:[{
        type:ImageModel //should change
    }]
})


const Board=new mongoose.model('Board',BoardModel)

module.exports=Board