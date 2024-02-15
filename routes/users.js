const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');
//profile page render
router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
//update profile info
router.post('/update/:id',passport.checkAuthentication,usersController.update);
//signup page render
router.get('/sign-up',usersController.signUp);
//signin page render
router.get('/sign-in',usersController.signIn)

// get the  signup data
router.post('/create',usersController.create);

// use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {
        failureRedirect:'/users/sign-in'
    }
) ,usersController.createSession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),usersController.createSession);


module.exports = router;
     
//sign out router
router.get('/sign-out',usersController.destroySession);