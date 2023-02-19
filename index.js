const express = require("express")
const {connection}=require("./config/db")
const {userRouter}=require("./routes/user.routes")
const {postRouter}=require("./routes/blog.routes")
const {authenticate}=require("./middilewares/authenticate.middileware")
const cors = require("cors")
require("dotenv").config()
const app = express()
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send("Home page")
})
app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts",postRouter)
app.listen(process.env.port,async()=>{
    try{
        await connection 
        console.log("connected to db")
    }catch(err){
        console.log(err);
    }
    console.log(`server is running at ${process.env.port}`);
})