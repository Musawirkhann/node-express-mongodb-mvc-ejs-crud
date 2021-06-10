const { render } = require('ejs');
const {Post, validate} = require('../models/post');

const getAllPosts = async (req, res, next) => {
    const list = await Post.find().exec();
    res.render('postlist', {
        posts: list
    });
}


const getAllPostsdata = async (req, res, next) => {
  
    const list = await Post.find().exec();
    res.json(list);
}

const getmap = (req, res, next) => {
    res.render('map');  
}
const getdashboard = (req, res, next) => {
    res.render('dashboard');
}

const getAddPostView = (req, res, next) => {
    res.render('addPost');
}

const addPost = async (req, res, next) => {
    const {error} = validate(req.body);
    if(error) return res.status(422).send(error.details[0].message);
    const data = req.body;
   
    let post = await new Post({
        numero: data.numero,
        type: data.type,
        laltitude: data.laltitude,
        longitude: data.longitude
    });
    post = await post.save();
    //res.redirect('/');//
}

const getUpdatePostView = async (req, res, next) => {
    try {
        const id = req.params.id;
        const onepost = await Post.findById(id).exec();
        res.render('updatePost', {
            post: onepost
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updatePost = async(req, res, next) => {
    const {error} = validate(req.body);
    if (error) return res.status(422).send(error.details[0].message);
    const id = req.params.id;
    const data = req.body;
    let post = await Post.findByIdAndUpdate(id, {
        numero: data.numero,
        type: data.type,
        laltitude: data.laltitude,
        longitude: data.longitude
       
    }, {new: true});
    if(!post) return res.status(404).send('post with the given id not found');

    res.redirect('/');
}

const getDeletePostView = async (req, res, next) => {
    try {
        const id = req.params.id;
        const onepost = await Post.findById(id).exec();
        res.render('deletePost', {
           post: onepost
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deletePost = async (req, res, next) => {
    try {
        const id = req.params.id;
        const post = await Post.findByIdAndRemove(id);
        if(!post) return res.status(404).send('Customer with the given id not found');
        res.redirect('/');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    getAllPosts,
    getAllPostsdata,
    getAddPostView,
    addPost,
    getUpdatePostView,
    updatePost,
    getDeletePostView,
    deletePost,
    getmap,
    getdashboard
}