const express = require("express");
const { PostModel } = require("../model/post.model");
const { authMiddleware } = require("../middleware/auth.middleware");

const postRouter = express.Router();

postRouter.use(authMiddleware);

postRouter.post("/add", async (req, res) => {
  try {
    const post = new PostModel(req.body);
    await post.save();
    res.status(200).send({ "msg": "post is added successfully" });
  }
  catch (err) {
    res.status(400).send({ "error": err.message });
  }
});
postRouter.get("/", async (req, res) => {
  const { page = 1, min, max, device } = req.query;
  let limit = 3;
  let skipCount = 0;
  let query = { username: req.body.username };

  if (min && max) {
    query.no_of_comments = { $gte: min, $lte: max }
  }

  if (device) {
    query.device = { $eq: device };
  }

  if (page) {
    skipCount = (page - 1) * limit;
  }
  try {
    const posts = await PostModel.find(query).skip(skipCount).limit(limit);
    res.status(200).send(posts);
  }
  catch (err) {
    res.status(400).send({ "error": err.message });
  }
});
postRouter.get("/top", async (req, res) => {
  const { page = 1, max } = req.query;
  let limit = 3;
  let skipCount = 0;
  let query = { username: req.body.username };

  if (max) {
    query.no_of_comments = { $eq: max }
  }

  if (page) {
    skipCount = (page - 1) * limit;
  }
  try {
    const posts = await PostModel.find(query).skip(skipCount).limit(limit);
    res.status(200).send(posts);
  }
  catch (err) {
    res.status(400).send({ "error": err.message });
  }
});
postRouter.patch("/update/:postID", async (req, res) => {
  const { postID } = req.params;
  const userID = req.body.userID;
  try {
    const post = await PostModel.findOne({ _id: postID });
    if (userID === post.userID) {
      await PostModel.findByIdAndUpdate({ _id: postID }, req.body);
      res.status(200).send({ "msg": `post with id ${postID} is updated successfully`, "updatedPost": post });
    }
    else {
      res.status(400).send({ "mag": "you are not authorized" });
    }
  }
  catch (err) {
    res.status(400).send({ "error": err.message });
  }
});
postRouter.patch("/delete/:postID", async (req, res) => {
  const { postID } = req.params;
  const userID = req.body.userID;
  try {
    const post = await PostModel.findOne({ _id: postID });
    if (userID === post.userID) {
      await PostModel.findByIdAndDelete({ _id: postID });
      res.status(200).send({ "msg": `post with id ${postID} is deleted successfully`, "updatedPost": post });
    }
    else {
      res.status(400).send({ "mag": "you are not authorized" });
    }
  }
  catch (err) {
    res.status(400).send({ "error": err.message });
  }
});

module.exports = { postRouter };