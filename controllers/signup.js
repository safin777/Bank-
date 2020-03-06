var express = require('express');
var mysql = require('mysql');
var userModel = require.main.require('./models/user-model');
var router = express.Router();
const { check, validationResult } = require('express-validator');

//insert into login controller and render the login views
router.get('/',function(req,res)
    {
      res.render('signup');
    });


router.post('/',
[
          check('fullname').notEmpty().withMessage("Name cant be empty"),
          check('email').isEmail().withMessage("please enter a valid email"),
          check('username').isLength({min:5}).withMessage("username can not be empty"),
          check('contactNo').isLength({min:11}).withMessage("contact number should be at least 11 digit"),
            check('address').notEmpty().withMessage("address cant be empty"),
              check('gender').notEmpty().withMessage("gender cant be empty"),
                check('password').isLength({min:4}).withMessage("  password should have 4 character"),
                  check('confirmPassword').isLength({min:4}).withMessage("  this field should have 4 character")

], function(req, res){


  const errors = validationResult(req);
 if (!errors.isEmpty()) {
   return res.status(422).json({ errors: errors.array() });
 }



        var users ={

                      userid:"",
                      fullname:req.body.fullname,
                      email:req.body.email,
                      username : req.body.username,
                      contactNo:req.body.contactNo,
                      address:req.body.address,
                      password:req.body.password,
                      confirmPassword:req.body.confirmPassword,

                      gender:req.body.gender



                   };


               if (!errors.isEmpty() )
               {
                 res.redirect('/signup');
                  console.log('data not given in all field  page!');
               }

               else if(users.password != users.confirmPassword)
               {
                 console.log("re-enter password");
                 res.redirect('/signup');
               }

        else
        {   userModel.all(users,function (results) {


                        if(users.username == results[0].username && users.email==results[0].email && users.password != users.confirmPassword )
                        {
                          console.log("same user name and password");
                           res.redirect('/signup');

                        }

                         else
                           {

                              userModel.insert(users,function(status){
                                if (status){
                                res.redirect('/');
                              }
                              else
                              {
                                console.log("no data insert!");
                              }
                            });
                           }
                      });

 }


});
  module.exports = router;
