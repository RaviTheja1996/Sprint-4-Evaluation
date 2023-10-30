const express = require("express");
require('dotenv').config();
const { userRouter } = require("./Routes/user.routes");
const { postRouter } = require("./Routes/post.routes");
const { connection } = require("./db");

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.status(200).send({ "msg": "homepage for InstaApp" });
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`server is running at ${process.env.port}`);
    console.log("connect to DB");
  }
  catch (err) {
    console.log(err.message);
  }
});