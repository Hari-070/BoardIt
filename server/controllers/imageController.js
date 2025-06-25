const Board = require("../models/boardModel");

exports.addImage=async(req,res)=>{
    try {
        const { boardId } = req.params;
        const { url } = req.body;

        const board = await Board.findById(boardId);
        if (!board){
            return res.status(404).json({message:"Board not found" })
        }

        if (!board.user.equals(req.user._id)) return res.status(403).json({ message:"Not Authorized"})

        board.images.push({ url, position: board.images.length });
        await board.save();

        res.status(201).json(board);
    } catch (error) {
        console.log(error)
        console.log("there is an error in addImage")
    }
}

exports.deleteImage=async(req,res)=>{
    try {
        const {boardId}=req.params
        const {imageId}=req.body

        const board=await Board.findOneAndUpdate(
            {_id:boardId,user:req.user.id},
            {$pull:{images:{_id:imageId}}},
            {new:true}
        )
        if(!board)
            return res.status(400).json({message:"board doesnt exist"})
        return res.status(200).json({message:"deleted success"})

    } catch (error) {
        console.log(error)
        console.log("there is an error in deleteImage")
    }
}