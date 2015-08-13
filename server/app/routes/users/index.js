'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('User');
var router = require('express').Router();


router.post('/', function (req, res, next) {
	User.create(req.body)
		.then(function(user){
			res.status(201).json(user);
		})
		.then(null, next);
});

module.exports = router;