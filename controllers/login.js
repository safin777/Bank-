     var express = require('express');
     var mysql = require('mysql');
     var userModel = require.main.require('./models/user-model');
     var router = express.Router();

//insert into login controller and render the login views
 router.get('/',function(req,res)
         {
           res.render('login');
         });


         //for logout
     router.get('/logout',function(req,res)
             {
               res.render('login');
             });



     //create account
      router.get('/login',function(req,res)
            {
              res.render('login');
             });


//
 router.post('/', function(req, res)
       {
             var users ={
                           username : req.body.username,
                           password : req.body.password

                        };


                    if (!users.username || !users.password)
                    {
                      res.redirect('/');
                       console.log('data not given in login page!');
                    }


                    else
                    {

                       userModel.validate(users,function(results)
                       {
                         if (results[0].type =='admin' && results[0].status == 'active')
                         {
                          //  console.log('data not given in login page!');
                           req.session.username = users.username;
                           console.log(req.session.username);


                              res.redirect('/admin');



                         }

                         else if (results[0].type =='employee' && results[0].status == 'active')
                          {
                            req.session.username = status.results[0].username;
                            res.redirect('/employee');
                             res.send('employee login');
                          }

                          else if (results[0].type =='agent' && results[0].status == 'active')
                           {
                             req.session.username = results[0].username;
                             res.redirect('/agent');
                               res.send('Agent login');
                           }

                           else if (results[0].type =='' && results[0].status == '')
                            {
                              req.session.username = results[0].username;
                              res.redirect('/customer');
                              res.send('customer login');
                            }


                          else
                            {
                              res.redirect('/admin');
                              console.log("invalid login action ");
                            }
                       });
                    }
      });

       module.exports = router;
