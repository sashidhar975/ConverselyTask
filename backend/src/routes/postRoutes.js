const express = require('express');
const { createPost,getAllPosts, getUserPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/', auth, createPost);
router.get('/',  getAllPosts);
router.get('/user', auth, getUserPosts);
router.get('/:id', auth, getPostById);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

module.exports = router;
