const express = require('express')
const PostController = require('../controllers/post.controller')

const router = express.Router()

router.get('/get', PostController.getPosts)
router.post('/create', PostController.createPost)
router.delete('/delete/:id', PostController.delete)
router.put('/edit/:id', PostController.edit)
router.get('/get-one/:id', PostController.getOne);

module.exports = router