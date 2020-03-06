var db = require('./db');

module.exports={




	validate: function(users, callback){
		var sql ="SELECT * FROM users where username=? and password=?";
		db.getResults(sql, [users.username, users.password], function(results){

			if(results.length > 0){
				callback(results);
			}
			else{
				callback(false);
			}
		});
	},


	insert: function(users, callback){
		var sql = "INSERT INTO users (userid,fullname,email,username,contactNo,address,password,gender) values(?, ?, ?,?,?,?,?,?)";
		db.execute(sql,[users.userid,users.fullname,users.email,users.username,users.contactNo,users.address,users.password,users.gender ], function(status){
			console.log(sql);
			if(status){
					callback(true);
				}else{
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





}
