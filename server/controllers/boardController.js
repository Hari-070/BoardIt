const Board = require("../models/boardModel");
const User = require("../models/userModel");

exports.createBoard=async(req,res)=>{
    try {
        const { title, description } = req.body;
        let board=await Board.findOne({title:title})
        if(board){
            return res.status(400).json({message:"board already exist with same name"})
        }
        board=new Board({
            user:req.user._id,
            title,
            description,
        })
        await board.save()

        res.status(201).json(board)
    } catch (error) {
        console.log(error)
        console.log("there is some error to solve in createBoard")
    }
}

exports.getBoards=async(req,res)=>{
    try {
        const boards=await Board.find({user:req.user._id})
        return res.status(200).json(boards)
    } catch (error) {
        console.log(error)
        console.log("there is some error to solve in getBoards")
    }
}

exports.getBoardById=async(req,res)=>{
    try {
        const {id} = req.params;

        const board = await Board.findOne({ _id: id, user: req.user._id });
        if (!board) return res.status(404).json({ message: "Board not found" });

        return res.json(board);
    } catch (error) {
        console.log(error)
        console.log("there is erro to solve on getBoardById")
    }
}

exports.updateBoard=async(req,res)=>{
    try {
        const {id}=req.params
        const board=await Board.findOneAndUpdate(
            {_id:id, user:req.user.id},
            req.body,
            {new:true}
        )
        if(!board)
            return res.status(400).json({message:"Board is not found"})
        res.status(200).json(board)
    } catch (error) {
        console.log(error)
        console.log("there is error in updateingBoard")
    }
}

exports.deleteBoard=async(req,res)=>{
    try {
        const {id}=req.params
        const board=await Board.findOneAndDelete({_id:id,user:req.user.id})
        if(!board)
            return res.status(400).json({message:"there is no particular board"})
        res.status(200).json({message:"deleted successfully",board})
    } catch (error) {
        console.log(error)
        console.log("there is error in the deleteBoard")
    }
}