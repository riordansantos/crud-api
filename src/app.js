const express = require("express");
const app = express();

require('dotenv').config();
const PORT = process.env.PORT

const cors = require('cors');

app.use(cors());

const Post = require("./models/Posts");
app.use(express.json());

// create a post
app.post("/create_post", async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.create({ title, content });
    res.send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

// list all the posts
app.get("/list_posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.send({ posts });
  } catch (error) {
    res.status(400).send(error);
  }
});

// show one post
app.get("/show_post/:post_id", async (req, res) => {
  try {
    const postId = req.params.post_id;
    const post = await Post.find({ _id: postId });
    res.send({ post });
  } catch (error) {
    res.status(400).send(error);
  }
});

//update posts
app.patch("/update_post/:post_id", async (req, res) => {
  try {
    const postId = req.params.post_id;
    const { title, content } = req.body;
    const post = await Post.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true }
    );
    res.send({ postId, title, content });
  } catch (error) {
    res.status(400).send(error);
  }
});

//delete post
app.delete("/delete_post/:post_id", async (req, res) => {
  try {
    const postId = req.params.post_id;
    await Post.findByIdAndDelete(postId);
    res.send({ msg: "Deletado com sucesso!" });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});
