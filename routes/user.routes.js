const express = require("express");
const { userModel } = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, pass } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      // Store hash in your password DB.
      if (err) res.send({ msg: "something went wrong", err: err.message });
      const user = new userModel({ name, email, gender, pass: hash });
      await user.save();
      res.send({ msg: "new user has been registered" });
    });
  } catch (err) {
    console.log(err);
    res.send({ msg: "something went wrong", err: err.message });
  }
});
userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    try {
      const user = await userModel.find({ email });
      if (user.length > 0) {
        bcrypt.compare(pass, user[0].pass, (err, result) => {
          if (result) {
            const token = jwt.sign({ userID: user[0]._id }, process.env.key);
            res.send({ msg: "new user logged in", token: token });
          } else {
            res.send({ msg: "wrong credential" });
          }
        });
      } else {
        res.send({ msg: "wrong credential" });
      }
    } catch (err) {
      console.log(err);
      res.send({ msg: "wrong credential" });
    }
  });
  module.exports = { userRouter };