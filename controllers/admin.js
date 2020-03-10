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

//all tarnsaction

router.get('/allTransaction', function(req, res){

	admin.allTransaction(function(results){
		if(results.length> 0)
		{
				res.render('admin/allTransaction',{transaction: results});
		}
		else {
			res.redirect('/admin');
		}

	});
});
/////employee transactions


router.get('/employeeTransaction', function(req, res){

	admin.employeeTransaction(function(results){
		if(results.length> 0)
		{
				res.render('admin/employeeTransaction',{transaction: results});
		}
		else {
			res.redirect('/admin');
		}

	});
});

router.post('/deleteEmpTrans/:tid', function(req, res){

	var transaction = {

			tid: req.params.tid
		};

		admin.deleteTransaction(transaction, function(status){
			if(status){
				res.redirect('/admin/employeeTransaction');
			}else{
			res.render('admin/admin');
			}
		});
});


//deleteEmployeee
router.post('/deleteEmployeeTransaction/:tid', function(req, res){

	var transaction = {

			tid: req.params.tid
		};

		admin.deleteTransaction(transaction, function(status){
			if(status){
				res.redirect('/admin/employeeTransaction');
			}else{
			res.render('admin/admin');
			}
		});
});

//bankTransaction
router.get('/bankTransaction', function(req, res){

	admin.bankTransaction(function(results){
		if(results.length> 0)
		{
				res.render('admin/bankTransaction',{transaction: results});
		}
		else {
			res.redirect('/admin');
		}

	});
});

router.post('/deleteBank/:tid', function(req, res){

	var transaction = {

			tid: req.params.tid
		};

		admin.deleteTransaction(transaction, function(status){
			if(status){
				res.redirect('/admin/bankTransaction');
			}else{
			res.render('admin/admin');
			}
		});
});




router.post('/update/:userid', function(req, res){

		var users = {
			userid: req.params.userid,
			fullname:req.body.fullname,
			email:req.body.email,
			username : req.body.username,
			contactNo:req.body.contactNo,
			address:req.body.address,
			password:req.body.password,
			gender:req.body.gender,
			type:req.body.type,
			status:req.body.status
		};

		console.log(users);

		admin.updateEmployee(users, function(status){
			if(status){
				res.redirect('/admin/employeeList');
			}else{
				res.redirect('/admin/update/'+req.params.userid);
			}
		});
});
//agent List
router.get('/agentList', function(req, res){

	admin.agentList(function(results){
		if(results.length> 0)
		{
				res.render('admin/agentList', {users: results});
		}
		else {
			res.redirect('/admin');
		}

	});
});

//employeeList get

router.get('/employeeList', function(req, res){

	admin.employeeList(function(results){
		if(results.length> 0)
		{
				res.render('admin/employeeList', {users: results});
		}
		else {
			res.redirect('/admin');
		}

	});
});

//updateEmployee
router.get('/update/:userid', function(req, res){
	admin.getById(req.params.userid, function(results){
		res.render('admin/updateEmployee', {users: results});
	});
});


router.post('/update/:userid', function(req, res){

		var users = {
			userid: req.params.userid,
			fullname:req.body.fullname,
			email:req.body.email,
			username : req.body.username,
			contactNo:req.body.contactNo,
			address:req.body.address,
			password:req.body.password,
			gender:req.body.gender,
			type:req.body.type,
			status:req.body.status
		};

		console.log(users);

		admin.updateEmployee(users, function(status){
			if(status){
				res.redirect('/admin/employeeList');
			}else{
				res.redirect('/admin/update/'+req.params.userid);
			}
		});
});


//deleteEmployeee
router.post('/delete/:userid', function(req, res){

	var users = {

			userid: req.params.userid
		};

		admin.deleteEmployee(users, function(status){
			if(status){
				res.redirect('/admin/employeeList');
			}else{
			res.render('admin/admin');
			}
		});
});




//multer setting
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "./storage"); //here we specify the destination. in this case i specified the current directory
    },
    filename: function(req, file, cb) {
      console.log(file); //log the file object info in console
      cb(null, file.originalname);//here we specify the file saving name. in this case.
  //i specified the original file name .you can modify this name to anything you want
    }
  });

  var upload = multer({ storage: storage });

	///


router.post('/update/:id', function(req, res){







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


//add Agent

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


router.get('/addAgent',function(req,res)
{
   res.render('admin/addAgent');

});
//add Employee post
router.post('/addAgent',function(req,res)
{
    upload(req,res,function(err)
		{
       if(err)
			 {
				 res.redirect('admin/addAgent');
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
					 type:"agent",
					 status:req.body.status,
					 image:req.file.filename

					};
					admin.addAgent(users,function(status)
					{
           if (status)
						 {
							 res.redirect('addAgent');
						 }

						 else
								 {
                    console.log("data missing");
								 }

					});

			 }

		});


});



//delete agentList


router.post('/deleteA/:userid', function(req, res){

	var users = {

			userid: req.params.userid
		};

		admin.deleteAgent(users, function(status){
			if(status){
				res.redirect('/admin/agentList');
			}else{
			res.render('admin/admin');
			}
		});
});


//updateAgent

router.get('/updateA/userid', function(req, res){

	admin.getAgent(function(results){
		if(results.length> 0)
		{
				res.render('admin/updateAgent', {users: results});
		}
		else {
			res.redirect('/admin');
		}

	});
});



router.post('/updateAg/:userid', function(req, res){


		var users = {
			userid: req.params.userid,
			fullname:req.body.fullname,
			email:req.body.email,
			username : req.body.username,
			contactNo:req.body.contactNo,
			address:req.body.address,
			password:req.body.password,
			gender:req.body.gender,
			type:req.body.type,
			status:req.body.status
		};


		console.log(users);

		admin.updateAgent(users, function(status){
			if(status){
				res.redirect('/admin/agentList');
			}else{
				res.redirect('/admin/updateAg/'+req.params.userid);
			}
		});
});
//agent List
router.get('/agentList', function(req, res){

	admin.agentList(function(results){
		if(results.length> 0)
		{
				res.render('admin/agentList', {users: results});
		}
		else {
			res.redirect('/admin');
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


		res.render('admin/changePassword');


});

//post change password
router.post('/changePassword', function(req, res)
  {
				var users= {
				username:req.session.username,
				password:req.body.password,
				newPassword:req.body.newPassword,
				confirmPassword:req.body.confirmPassword
			};
			console.log(users);


		admin.getByUname(users,function(results)
		{

			if(results[0].password == users.password)
			{  	console.log("password set");

					if (users.newPassword == users.confirmPassword)
					{
	admin.changePassword(users,function(status)

				{
		if (status)
		{
		res.redirect('/logout');
		console.log("password set");
		}
		else
		{
		res.redirect('/admin/admin');
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






   module.exports = router;
