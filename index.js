const express = require("express")



const cors = require("cors")
require("dotenv").config()
const app = express()
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send("Home page")
})

app.listen(process.env.port,async()=>{
    try{
        await connection 
        console.log("connected to db")
    }catch(err){
        console.log(err);
    }
    console.log(`server is running at ${process.env.port}`);
})