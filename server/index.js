const express=require('express')
const mongoose = require('mongoose')
const cors=require('cors')
const userRoutes=require('./routes/userRoutes')
const imageRoutes=require('./routes/imageRoutes')
const boardRoutes=require('./routes/boardRoutes')
require('dotenv').config()

const app=express();
app.use(express.json())
app.use(cors())

const PORT=process.env.PORT || 5000

// mongoose.connect('mongodb://localhost:27017/boardIt')
mongoose.connect('mongodb+srv://harianand2102:dQCW4Dfc3N2mRt6p@cluster0.ipz64mt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(res=>{
    console.log("conntected successfuly")
})
.catch(err=>{
    console.log("there was an error connecting")
})

app.use('/api',userRoutes)
app.use('/api',boardRoutes)
app.use('/api',imageRoutes)

app.listen(PORT,()=>{
    console.log(`app is running on ${PORT}`)
})