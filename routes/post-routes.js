const express = require('express');
const {getAllPosts, getAddPostView, addPost,
        getUpdatePostView, updatePost, getDeletePostView, deletePost, getAllPostsdata} = require('../controllers/postController');


const router = express.Router();

router.get('/', getAllPosts);
router.get('/getAllPosts', getAllPostsdata);
router.get('/addPost', getAddPostView);
router.post('/addPost', addPost);
router.get('/updatePost/:id', getUpdatePostView);
router.post('/updatePost/:id', updatePost);
router.get('/deletePost/:id', getDeletePostView);
router.post('/deletePost/:id', deletePost);



module.exports = {
    routes: router
}