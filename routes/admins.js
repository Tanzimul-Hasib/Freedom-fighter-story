var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Admin = require('../models/admin');

// Register
router.get('/register',sureAuthenticatedAdmin, function (req, res) {
	res.render('registerAdmin',{title:"Register", layout: false});
});

//Login
router.get('/login', sureAuthenticatedAdmin, function (req, res) {
res.render('loginAdmin',{title:"Login", layout:false});
});

// Register Admin
router.post('/register', function (req, res) {
	var name = req.body.name;
	var phone= req.body.phone;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('phone', 'Phone Number is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if (errors) {
		res.render('registerAdmin', {
			errors: errors,
			layout: false
		});
	}
	else {
		//checking for email and username are already taken
		Admin.findOne({ username: {
			"$regex": "^" + username + "\\b", "$options": "i"
	}}, function (err, administrator) {
			Admin.findOne({ email: {
				"$regex": "^" + email + "\\b", "$options": "i"
		}}, function (err, mail) {
				if (administrator || mail) {
					res.render('registerAdmin', {
						administrator: administrator,
						mail: mail,
						layout:false
					});
				}
				else {
					var newAdmin = new Admin({
						name: name,
						email: email,
						phone: phone,
						username: username,
						password: password
					});
					Admin.createUser(newAdmin, function (err, administrator) {
						if (err) throw err;
						console.log(administrator);
					});
         	req.flash('success_msg', 'You are registered and can now login');
					res.redirect('/admins/login');
				}
			});
		});
	}
});

passport.use('administrator-local',new LocalStrategy(
	function (username, password, done) {
		Admin.getUserByUsername(username, function (err, administrator) {
			if (err) throw err;
			if (!administrator) {
				return done(null, false, { message: 'Unknown Admin' });
			}

			Admin.comparePassword(password, administrator.password, function (err, isMatch) {
				if (err) throw err;
				if (isMatch) {
					return done(null, administrator);
					console.log(" suuccess, administrator returned")
				} else {
					return done(null, false, { message: 'Invalid password' });
				}
			});
		});
	}));

passport.serializeUser(function (administrator, done) {
	done(null, administrator.id);
});

passport.deserializeUser(function (id, done) {
	Admin.getUserById(id, function (err, administrator) {
		done(err, administrator);
	});
});

router.post('/login',
	passport.authenticate('administrator-local', { successRedirect: '/', failureRedirect: '/admins/login', failureFlash: true }),
	function (req, res) {
		res.redirect('/');
	});

router.get('/logout', function (req, res) {
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/admins/login');
});



// authentication check 

function sureAuthenticatedAdmin(req,res,next){
     if(req.isAuthenticated()){
         res.redirect('/');
     }
     else {
         //req.flash('error_msg','You are not logged in');
         return next();
     }
};

module.exports = router;