const express = require("express");
const postRouter = express.Router();
const { postModel } = require("../models/blog.models");
const jwt = require("jsonwebtoken");
require("dotenv").config();
postRouter.get("/allpost",async(req,res)=>{
    try{
        const notes = await postModel.find()
        res.send(notes)
    }catch(err){
        console.log(err);
    }
})
postRouter.get("/", async (req, res) => {
    // const notes=await noteModel.find()
    //   res.send(notes);
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.key);
    try {
      const data = await postModel.find({ userID: decoded.userID });
      res.send(data);
    } catch (err) {
      res.send(err);
    }
  });

  postRouter.get("/device", async (req, res) => {
    if (req.query && req.query.device) {
      req.body.device = req.query.device;
    } else if (req.query && req.query.device1 && req.query.device2) {
      req.body.device = { $and: [req.query.device1, req.query.device2] };
    }
    try {
      const posts = await postModel.find(req.body);
      res.send(posts);
    } catch (err) {
      res.send(`err:${err}`);
    }
  });
  postRouter.post("/create", async (req, res) => {
    const payload = req.body;
    const note = new postModel(payload);
    await note.save();
    res.send("msg created");
  });

  postRouter.patch("/update/:id", async (req, res) => {
    const payload = req.body;
    const noteID = req.params.id;
    const note = await postModel.findOne({ _id: noteID });
    console.log("note :", note.user);
    console.log("payload :", payload);
    console.log("noteid :", noteID);
    //   63f11b32f37eb6ac54fa4c3d
    const userid_note = note.userID;
  
    const userid_making_req = req.body.userID;
    try {
      if (userid_making_req != userid_note) {
        res.send("NOT AUTHORIZED");
      } else {
        await postModel.findByIdAndUpdate({ _id: noteID }, payload);
        res.send("update the notes");
      }
    } catch (err) {
      console.log(err);
    }
  });

  postRouter.delete("/delete/:id", async (req, res) => {
    const noteID = req.params.id;
    const note = await postModel.findOne({ _id: noteID });
    console.log("note :", note.user);
  
    console.log("noteid :", noteID);
    //   63f11b32f37eb6ac54fa4c3d
    const userid_note = note.userID;
  
    const userid_making_req = req.body.userID;
    try {
      if (userid_making_req != userid_note) {
        res.send("NOT AUTHORIZED");
      } else {
        await postModel.findByIdAndDelete({ _id: noteID });
        res.send("delete the notes");
      }
    } catch (err) {
      console.log(err);
    }
  });
  module.exports = { postRouter };