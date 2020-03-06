var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {

	req.session.username = "";
  //console.log("session destroyes".req.session.username);
	res.redirect('/login');
});

module.exports = router;
