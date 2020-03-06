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
  
  	
		




}

}