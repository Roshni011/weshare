const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    //comment belongs to user
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    //comment belongs to post
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }

},{
    timestamps:true
});

const comment = mongoose.model('Comment',commentSchema);
module.exports = comment;