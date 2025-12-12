const Informations = require("../models/informations.model.js");
const fileService = require("./file.service");

class PostService {
  async getPosts() {
    const posts = await Informations.find();
    return posts;
  }

 async createPost(post, files) {
  let mediaArray = [];

  if (files?.media) {
    const mediaFiles = Array.isArray(files.media)
      ? files.media
      : [files.media];

    mediaFiles.forEach((file) => {
      const savedName = fileService.save(file);
      mediaArray.push(savedName);
    });
  }

  const newPost = await Informations.create({
    ownerId: post.ownerId,
    ...post,
    media: mediaArray
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