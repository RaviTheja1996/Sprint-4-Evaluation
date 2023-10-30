const express = require("express");
const { UserModel } = require("../model/user.model");
const { BlackListModel } = require("../model/blacklist.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city, is_married } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    res.status(200).send({ "msg": "User already exist, please login" });
    return;
  }
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(200).send({ "error": err.message });
      }
      else {
        const user = new UserModel({ name, email, gender, password: hash, age, city, is_married });
        const new_user = await user.save();
        res.status(200).send({ "msg": "A new user has been registered", "newUser": new_user });
      }
    });
  }
  catch (err) {
    res.status(400).send({ "error": err.message });
  }
});
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ username: user.name, userID: user._id }, "raviteja", { expiresIn: "7d" });
          res.status(200).send({ "msg": "logged in successfully", "token": token });
          return;
        }
        if (err) {
          res.status(200).send({ "err": err.message });
        }
      })
    }
    else {
      res.status(200).send({ "msg": "The user doesn't exist please register first" });
    }
  }
  catch (err) {
    res.status(400).send({ "error": err.message });
  }
});
userRouter.get("/logout", async (req, res) => {
  const tokenValue = req.headers.token?.split(" ")[1];
  try {
    const doc = new BlackListModel({ token: tokenValue });
    await doc.save();
    res.status(200).send({ "msg": "You have been logged out" });
  }
  catch (err) {
    res.status(400).send({ "Error": err.message });
  }
});

module.exports = { userRouter };