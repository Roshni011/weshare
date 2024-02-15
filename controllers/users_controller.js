const User = require('../models/user');
const fs = require('fs');
const path = require('path');

// let's keep it same as before
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });

}


module.exports.update = async function(req, res){
    // if(req.user.id == req.params.id){
        // User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
        //     req.flash('success', 'Updated!');
        //     return res.redirect('back');
        // });
    if(req.user.id == req.params.id){    
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){ return console.log('---> multer Error <---',err)};
                user.name = req.body.name;
                user.email  = req.body.email;
                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname+'..'+user.avatar));
                    }


                    // this for saving avatar uploaded file link in the users avatar field
                    user.avatar = User.avatarPath+"/"+req.file.filename;
                }
                user.save();
                return res.redirect('back');
            
            });

        }catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }


    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}


// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){req.flash('error', err); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){req.flash('error', err); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out!');


    return res.redirect('/');
}

// const User = require('../models/user');


// // no ascyn is used here for having both types of code
// module.exports.profile = function(req, res){
//     User.findById(req.params.id,function(err,user){
//         if(err){return console.log('error in finding the user');}
//         return res.render('user_profile', {
//             title: 'User Profile',
//             profile_user: user
//         })
//     })
    
// }

// module.exports.update = function(req,res){
//     if(req.user.id == req.params.id){
//         User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
//             if(err){return console.log('error in updating the user');}
//             return res.redirect('back');
//         });
//     }else{
//         return res.status(401).send('unauthorized');
//     }

// }

// // render the signup page
// module.exports.signUp = function(req,res){
//     if(req.isAuthenticated()){
//       return  res.redirect('/users/profile');
//     }
//     res.render('user_sign_up',{
//         title:"Codeial || sign-Up"
//     })
// }


// // render the signin page 
// module.exports.signIn = function(req,res){
//     if(req.isAuthenticated()){
//       return  res.redirect('/users/profile'); 
//     }
//     res.render('user_sign_in',{
//         title:"Codeial || sign-Ip"
//     })
// }


// //get the signup data
// module.exports.create = function(req,res){
//     if(req.body.password!=req.body.confirm_password){
//         return res.redirect('back');
//     }
//     User.findOne({email:req.body.email},function(err,user){
//         if(err){console.log('error in finding the user in signup'); return;}
    

//     if(!user){
//         User.create(req.body,function(err,user){
//             if(err){
//                 console.log('error in creating the user in signup');
//                 return;
//             }
//         });
//         return res.redirect('/users/sign-in');
//     }else{
//         return res.redirect('back');

//     }
//      });
// }

// // creating session using signin for the user
// module.exports.createSession = function(req,res){
//     req.flash('success','logged in Successfully');

//    return res.redirect('/');

    
// }

// // deleting the session-cookie for sign out
// module.exports.destroySession = function(req,res){   // #### req.logout hotaa h keep it in mind not res.logout()
//     req.logout();  //passport.js is having this function 
//     req.flash('success','You have logged Out!!'); 
//     return res.redirect('/');
// }