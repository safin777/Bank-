var express = require('express');
var mysql = require('mysql');
var multer  = require('multer');
var path    = require('path');
var admin = require.main.require('./models/admin');


var router = express.Router();




//Checks Cookie for all url
router.get('*', function(req, res, next){
	if(req.session.username == null){
		res.redirect('/login');
	}
  else{
		next();
	}
});


//employeeList get

router.get('/employeeList', function(req, res){

	admin.employeeList(function(results){
		res.render('admin/employeeList', {users: results});
	});
});


//AddEmployee
var storage = multer.diskStorage
({
		destination: './storage/',
		filename: function(req, file, cb)
			  {
			    cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
			  }
});

var upload = multer({
  storage: storage
}).single('image');


router.get('/addEmployee',function(req,res)
{
   res.render('admin/addEmployee');

});
//add Employee post
router.post('/addEmployee',function(req,res)
{
    upload(req,res,function(err)
		{
       if(err)
			 {
				 res.redirect('admin/addEmployee');
			 }
			 else
			 {
				 var users=
				 {
					 userid:"",
					 fullname:req.body.fullname,
					 email:req.body.email,
					 username : req.body.username,
					 contactNo:req.body.contactNo,
					 address:req.body.address,
					 password:req.body.password,
					 gender:req.body.gender,
					 type:"employee",
					 status:req.body.status,
					 image:req.file.filename

					};
					admin.addEmployee(users,function(status)
					{
           if (status)
						 {
							 res.redirect('addEmployee');
						 }

						 else
								 {
                    console.log("data missing");
								 }

					});

			 }

		});


});












//show admin info
router.get('/showAdminInfo', function(req, res){

	admin.getByUname(req.session.username,function(results){
		res.render('admin/showAdminInfo', {users: results});
	});
});



// get changepassword
router.get('/changePassword', function(req, res){

	admin.getByUname(req.session.username,function(results){
		res.render('admin/changePassword', {users: results});
	});
});

//post change password
router.post('/changePassword', function(req, res)
  {
		var users=

					 {
								 username:req.session.username,
									password:req.body.password,
									newPassword:req.body.newPassword,
									confirmPassword:req.body.confirmPassword

					 };


				admin.getByUname(users,function(req,res)
				{

					 if(results[0].password == users.password)
					  {
							if (users.newPassword == users.confirmPassword)
							    {
                      admin.updatePassword(users,function(status)
							         {
                          if (status)
								           {
                              res.redirect('/logout');
															console.log("password set");
                            }
                              else
                                {
																res.redirect('/admin/changePassword');
                                console.log("re enter confirm password");
                                }

                      });
									}
						}

								else
								{
									res.redirect('/admin/changePassword');
									console.log("password does not match");
								}
				})




  });


//  get edit admin info

var storage = multer.diskStorage({
     destination: './storage/',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
  }
});

var upload = multer({
  storage: storage
}).single('image');




router.get('/editAdminInfo', function(req, res){
   users = req.session.username;
admin.getByUname(users, function(results){
      //console.log(status);
      if(req.session.username != ""){
    console.log(req.session.username);
     res.render('admin/editAdminInfo',{users:results});
  }else{
    res.redirect('/login');
}
        //response.render('volunteer/editprofile',{userList:status});
      });
});



//post for editAdminInfo

router.post('/editAdminInfo', function(req, res)
  {

		console.log("insert into post/editAdminInfo");


					upload(req, res, function(err)
					{
							if(err)
							{
							   res.redirect('admin/editAdminInfo');
							}

				else
				{
							     var users =

									{
						                  fullname:req.body.fullname,
						                  email:req.body.email,
						                  username : req.body.username,
						                  contactNo:req.body.contactNo,
						                  address:req.body.address,
						                  position:req.body.position,
						                  gender:req.body.gender,
										          image:req.file.filename

			                        };




                                admin.updateProfile(users,function(status)
								  {
                                      if (status)
									  {
                                          res.redirect('/admin/editAdminInfo');
                                      }
                                       else
                                       {
                                          console.log("missing some data");
                                      }

                                   });






                     }

                 });


               });







//insert into login controller and render the login views
router.get('/',function(req,res)
    {
          if (req.session.username==null)
          {
            res.render('login');
          }
          else {
            {
              res.render('admin/admin');
            }
          }

    }
  );

  router.get('/admin',function(req,res)
      {
            if (req.session.username == null)
            {
              res.render('login');
            }
            else {
              {
                res.render('admin/admin');
              }
            }

      }
    );

router.get('/updateEmployee',function(req,res)
{
   res.render('admin/updateEmployee');

});

router.post('/updateEmployee',function(req,res)
{
	var users=
	{
		userid:"",
		fullname:"",
		email:"",
		username :"",
		contactNo:"",
		address:"",
		password:"",
		gender:"",
		type:"",
		status:"",
		image:""

	 };

		res.render('admin/updateEmployee', {users});


});





   module.exports = router;
