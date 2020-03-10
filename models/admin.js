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

    allTransaction:function( callback){
        var sql ="SELECT * FROM transactions";
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

  changePassword: function(users, callback){
     console.log("model");
  console.log(users);
  console('data nai');
  var sql = "update users set password=? where username=?";
  db.execute(sql,[users.newPassword,users.username], function(status){
  if(status){
      callback(true);
    }else{
      callback(false);
    }
  });

},

addAgent:function(users, callback)
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

getById:function(id, callback){
		var sql = "select * from users where userid=?";
		db.getResults(sql, [id], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},




  updateEmployee : function(users, callback){
		var sql = "update users set fullname=?,email=?, username=?, contactNo=?, address=?,gender=? type=? where userid=?";
		//console.log('I am in update function');
		db.execute(sql, [users.fullname, users.email, users.username, users.contactNo, users.address,users.gender,users.type, users.userid], function(status){
			if(status){
        console.log(status);
				callback(true);
			}else{
				callback(false);
			}
		});
	},

  deleteEmployee: function(users, callback){
		var sql = "delete from users where userid=?";
		db.execute(sql, [users.userid], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},


deleteTransaction: function(transaction, callback){
		var sql = "delete from transactions where tid=?";
		db.execute(sql, [transaction.tid], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},


bankTransaction:function(callback){
var sql = "SELECT transactions.tid,transactions.contactNo,transactions.amount,transactions.bname,transactions.bacc FROM transactions RIGHT JOIN users ON transactions.contactNo = users.contactNo";
      		db.getResults(sql, [], function(results){
            if(results.length >0){
              callback(results);
            }
            else{
            //  console.log("no data in sql");
              callback(false);
            }
      		});
      	},


employeeTransaction:function(callback){
var sql = "SELECT transactions.tid,transactions.contactNo,transactions.amount,transactions.bname,transactions.bacc,transactions.taxid,transactions.ttype,users.contactNo FROM transactions RIGHT JOIN users ON transactions.contactNo = users.contactNo";
db.getResults(sql, [], function(results){
if(results.length >0){
  callback(results);
}
else{
//  console.log("no data in sql");
  callback(false);
}
});
},






//Agent
agentList:function(callback){
    		var sql = "select * from users where type='agent'" ;
    		db.getResults(sql, [], function(results){
    			//console.log(results);
    			callback(results);
    		});
    	},


deleteAgent: function(users, callback){
        var sql = "delete from users where userid=?";
        db.execute(sql, [users.userid], function(status){
          if(status){
            callback(true);
          }else{
            callback(false);
          }
        });
      },


  getAgent:function(id, callback){
      		var sql = "select * from users where userid=?";
      		db.getResults(sql, [id], function(results){
      			if(results.length > 0){
      				callback(results[0]);
      			}else{
      				callback(null);
      			}
      		});
      	},

updateAgent : function(users, callback){
		var sql = "update users set fullname=?,email=?, username=?, contactNo=?, address=?,gender=? type=? where userid=?";
		//console.log('I am in update function');
		db.execute(sql, [users.fullname, users.email, users.username, users.contactNo, users.address,users.gender,users.type, users.userid], function(status){
			if(status){
        console.log(status);
				callback(true);
			}else{
				callback(false);
			}
		});
	},





employeeList:function(callback){
    		var sql = "select * from users where type='employee'" ;
    		db.getResults(sql, [], function(results){
    			//console.log(results);
    			callback(results);
    		});
    	},

  getById : function(userid,callback){
		var sql = "select * from users where userid=?";
		db.getResults(sql, [userid], function(results){
			if(results.length>0){
        console.log(results);
				callback(results[0]);
			}else{
				callback(null);
			}
		});


}




}
