      //DECLARATION
      var express 	= require('express');
      var bodyParser 	= require('body-parser');
      var session     = require('express-session');
      var  mysql=require('mysql');
      var multer = require('multer');
      var path = require('path');
      var expressSession 	= require('express-session');

   //controlleers
      var signup 		= require('./controllers/signup');
      var login = require('./controllers/login');
      var logout      = require('./controllers/logout');
      var admin 		= require('./controllers/admin');

      var app = express();




      //CONFIGURATION
      app.set('view engine', 'ejs');
      app.use('/assets', express.static('assets'));
       app.use('/storage', express.static('storage'));
      app.use(expressSession({secret: 'my top secret password', saveUninitialized: true, resave: false}));


      //MIDDLEWARE
      app.use(bodyParser.urlencoded({
        extended: true
      }));

      app.use(session({secret:'hhdhdhdhd', saveUninitialized: true, resave: false}));

      //ROUTING
          //app.use('/signup', signup);

          app.use('/', login);
          app.use('/logout',logout);
          app.use('/admin', admin);
          app.use('/signup',signup);



      //SERVER STARTUP
      app.listen(3000, function(){
      	console.log("Server started at 3000...");
      });
