const postService = require("../services/post.service.js");

class PostController {

  async getPosts(req, res) {
    try {
      const getAll = await postService.getPosts();
      res.status(200).send(getAll);
    } catch (error) {
      console.log(error);
    }
  }

  async createPost(req, res) {
  try {
    const newInformations = await postService.createPost(
      req.body,
      req.files
    );
    res.status(201).json({ newInformations });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
}

  async delete(req, res) {
    try {
      const post = await postService.delete(req.params.id);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async edit(req, res) {
    try {
      const { body, params } = req;
      const post = postService.edit(body, params.id);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getOne(req, res) {
    try {
      const post = await postService.getOne(req.params.id);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }

}

module.exports = new PostController();