const express = require("express");
const PostController = require("../controllers/post.controller");
const Post = require("../models/informations.model.js");

const router = express.Router();

router.get("/get", PostController.getPosts);
router.post("/create", PostController.createPost);
router.delete("/delete/:id", PostController.delete);
router.put("/edit/:id", PostController.edit);
router.get("/get-one/:id", PostController.getOne);
router.put("/view/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true },
    );

    res.json(post);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;