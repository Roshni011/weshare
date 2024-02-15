const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');  
// use for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');


const MongoDBStore = require('connect-mongodb-session')(session);  // connect-mongodb-session yhe librery install krni pdegi documentation me change ho gyaa h


//const MongoStore = require('connect-mongo')(session); ---> this is for older versions   




// for sass file work 
const sassMiddleware = require('node-sass-middleware')

// for showing flash messages

const flash = require('connect-flash');

const customMware = require('./config/middleware');

app.use(sassMiddleware({
    src:'./assets/sass',
    dest:'./assets/css',
    debug:true,
    outputStyle:"expanded",
    prefix:'/css',

}))




const expressLayouts = require('express-ejs-layouts');

app.use(express.urlencoded());
app.use(cookieParser());

   
app.use(express.static('./assets'));  // this tell app in which folder it will find static file

app.use(expressLayouts);

//extrect style and script from subpages into the layout
app.set('layout extractStyles',true);     // write extract not extrect....suar
app.set('layout extractScripts',true);



// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


var store = new MongoDBStore({
    uri: 'mongodb://localhost/Codeial_development',
    collection: 'mySessions'
  });
  
  // Catch errors
  store.on('error', function(error) {
    console.log(error);
  });
  

//mongo store is used for storing the session cookie

app.use(session({
    name:'codeial',
    // TODO change the secret key before deployment
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100), // in miliseconds
    }, 
    store: store,
    /*new mongoose(
        {
            mongooseConnection:db,
            autoRemove :'disabled'        <<<<<---------- this syntex was for older version                            
            
                                                      for storing the the the session cookie

        },
        function(err){
            console.log(err || 'connect-mongodb set up okk');
        }
    )*/
 }));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//flash messages midlleware
app.use(flash());
app.use(customMware.setFlash);


// use express router
app.use('/', require('./routes'));
// making uplaod path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));




app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);  
});
