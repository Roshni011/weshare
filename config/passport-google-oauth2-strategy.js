const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
    clientID:"739404931663-j0u33bbu648t3tip6ltpp8cbburl2eat.apps.googleusercontent.com",
    callbackURL:"http://localhost:8000/users/auth/google/callback",
    clientSecret:"UWMjETzle_2cGDfEfyOPdXxi"

},
function(accessToken,refreshToken,profile,done){
    console.log(profile);
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){console.log('error in authentication with google auth',err);return;}

        console.log(profile);
        if(user){
            return done(null,user);
        }
        else{
            User.create(
                {
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex'),
                },
                function(err,user){
                    if(err){console.log('error in creating user for google auth',err);return;}
                    return done(null,user);
                }
            )
        }
    })
}

))

module.exports = passport;