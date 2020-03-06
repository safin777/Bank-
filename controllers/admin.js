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



//show admin info
router.get('/showAdminInfo', function(req, res){

	admin.getByUname(req.session.username,function(results){
		res.render('admin/showAdminInfo', {users: results});
	});
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
