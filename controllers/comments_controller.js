const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailer/comments_mailer');

module.exports.create = async function(req, res){

    try{
        let post = await Post.findById(req.body.post);

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();
            
            comment = await comment.populate('user', 'name email').execPopulate();
            commentsMailer.newComment(comment);
            if (req.xhr){
                
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }


            req.flash('success', 'Comment published!');

            res.redirect('/');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}

// module.exports.create = async function(req,res)
// {
//     try
//     {
//         let post = await Post.findById(req.body.post);

//         if(post)
//         {
//             let comment = await Comment.create({
//                 content: req.body.content,
//                 post:req.body.post,
//                 user:req.user._id
//             });
//             post.comment.push(comment);
//             post.save();

//             comment = await comment.populate('user','name').execPopulate();
//            //x commentsMailer.newComment(comment);
//             if(req.xhr){
//                 return res.status(200).json({
//                     data:{
//                         comment:comment
//                     },
//                     message:'post created!!'
//                 });
//             }
//             req.flash('success','comment Published!!');
//             res.redirect('/');
//         }
//     }
//     catch(err)
//     {
//     req.flash('error',err);
//     return;
//     }
//    /* Post.findById(req.body.post,function(err,post){
//         if(post){
//             Comment.create({
//                 content:req.body.content,
//                 post:req.body.post,
//                 user:req.user._id
//             },function(err,comment){
//                 if(err){
//                     console.log('error in creating the comment');
//                     return;
//                 }
//                 post.comments.push(comment);
//                 post.save();


//                 commentsMailer.newComment(comment);
//               res.redirect('/');
//             });
//         }

//     });*/
// }

module.exports.destroy = function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err, post){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    });
}

/*module.exports.destroy = function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(err){return console.log('error in finding the comment');}
        if(comment.user==req.user.id){
            let postId = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    });
}*/