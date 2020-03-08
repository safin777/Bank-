var db = require('./db');

module.exports={



  getByUname:function(username, callback){
  		var sql = "select * from users where username=?";
  		db.getResults(sql, [username], function(results){
  			if(results.length > 0){
  				callback(results[0]);
  			}else{
  				callback(null);
  			}
  		});
  	},


    all:function(users, callback){
        var sql ="SELECT * FROM users";
        db.getResults(sql,[],function(results){
          //console.log(sql);
            console.log(results);


          if(results.length > 0){
            callback(results);
          }
          else{
            callback(false);
          }
        });
      },


    updateProfile: function(users, callback){
    console.log(users);
		var sql = "update users set fullname=?,email=?,username=?,contactNo=?,address=?,position=?,gender=?,image=? where username=?";
		db.execute(sql,[users.fullname, users.email, users.username, users.contactNo,users.address,users.position,users.gender,users.image,users.username], function(status){
		if(status){
        callback(true);
      }else{
        callback(false);
      }
    });

  },

  updatePassword: function(users, callback){
  console.log(users);
  var sql = "update users set password=? where username=?";
  db.execute(sql,[users.newPassword,users.username], function(status){
  if(status){
      callback(true);
    }else{
      callback(false);
    }
  });

},

addEmployee:function(users, callback)
{
  var sql = "INSERT INTO users (userid,fullname,email,username,contactNo,address,password,gender,type,status,image) values(?,?, ?,?,?,?,?,?,?,?,?)";
  db.execute(sql,[users.userid,users.fullname,users.email,users.username,users.contactNo,users.address,users.password,users.gender,users.type,users.status,users.image ], function(status)
  {
    console.log(sql);
    if(status){
        callback(true);
      }else{
        callback(false);
      }
  });


},



employeeList: function(callback){
		var sql = "select * from users where type='employee'" ;
		db.getResults(sql, [], function(results){
			console.log(results);
			callback(results);
		});
	}



}
