// 'use strict'

// var router = require('express').Router();
// var User = require('../../db/models/user.js');

// router.get('/logout', function (req, res, next) {
// 	//@@ write
// 	req.logout();
// 	res.status(200).end();
// })

// router.post('/login', function (req, res, next) {
// 	User.findByEmail(req.body.email).exec()
// 	.then(function (user) {
// 		//@@ write authenticate
// 		if (user && user.authenticate(req.body.password)) {
// 			//@@
// 			req.login(user, function () {
// 				res.json(user)
// 			})
// 			return;
// 		}
// 		//couldnt find user with that email
// 		var err = new Error('Not Authenticated');
// 		err.status = 401;
// 		next(err);
// 	}) 
// 	//error with querying the database
// 	.then(null, next)
// })

// router.post('/signup', function (req, res, next) {
// 	User.create(req.body)
// 	.then(function (user) {
// 		req.login(user, function() {
// 			res.status(201).json(user);
// 		})
// 	})
// 	.then(null, next)
// })

// module.exports = router;