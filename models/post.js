const mongoose = require('mongoose');
const Joi = require('joi');

const postSchema = new mongoose.Schema({
    numero: {
        type: Number
        
    },
    type: {
        type: String
        
    }, 
    laltitude: {
        type: String
        
    },
    
   longitude: {
        type: String
       
    }
},{timestamps: false});

const Post = mongoose.model('Post', postSchema);

const validatePost = (post) => {
    const schema = {
        numero: Joi.number(),
        type: Joi.string(),
        laltitude: Joi.string(),
        longitude: Joi.string()
      
    }

    return Joi.validate(post, schema);
}


module.exports.Post = Post;
module.exports.validate = validatePost;