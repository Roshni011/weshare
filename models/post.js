// const mongoose = require('mongoose');
// const { Schema } = mongoose; 
// //const User = require('./user')

// const postSchema = new mongoose.Schema({
//     content:{
//         type: String,
//         require:true
//     },
//     user:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'User'
//     }
// },{
//     timestamps:true,
// });

// const Post = mongoose.Schema('Post',postSchema);

// module.exports = Post;



const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    // adding the arrey of  id of  comments in the post itself
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
},{
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;