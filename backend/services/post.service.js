const Informations = require("../models/informations.model.js");
const fileService = require("./file.service");

class PostService {
  async getPosts() {
    const posts = await Informations.find();
    return posts;
  }

  async createPost(post, picture, video) {
    const pictureName = picture ? fileService.save(picture) : null;
    const videoName = video ? fileService.save(video) : null;
    const newPost = await Informations.create({
      ...post,
      picture: pictureName,
      video:videoName
    });
    return newPost;
  }

  async delete(id) {
    const post = await Informations.findByIdAndDelete(id);
    return post;
  }

  async edit(post, id) {
    if (!id) {
      throw new Error("Id not Found");
    }

    const updatedData = await Informations.findByIdAndUpdate(id, post, {
      new: true,
    });
    return updatedData;
  }

  async getOne(id) {
    const post = await Informations.findById(id);
    return post;
  }
}

module.exports = new PostService();
