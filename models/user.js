const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');
const userSchema = new mongoose.Schema({

    email:{
        type:String,
        require:true,
        unique:true,
        

    },
    password:{
        type:String,
        require:true,
    },
    name:{
        type:String,
        require:true,
    },
    avatar:{
        type:String,
    }
},{
    timestamps:true,
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

  //Static Methods----> these fn can be used for later purposes by calling User.uploadedAvatar like the 

  userSchema.statics.uploadedAvatar = multer({storage:storage}).single('avatar');// single defines that in the avatar section on 1 file at a time is allowed
  userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User',userSchema); //

module.exports = User;