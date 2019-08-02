var express				=	require('express');
var router 				= 	express.Router();
var appText				= 	require('../settings/en-lang.js');
var moment 				=	require('moment');
var Event = require('../models/event');

// **************************************************get request******************************************************

//homepage
router.get('/',function (req,res) {

    Event.find( function (err, result) {

        if (err){
            return;
        }

        res.render('listEvent',{
         title:"test",
         items:result,
         appText:appText,
         moment: moment
        });
    });
});


// Event/add page
router.get('/add',function (req,res) {
    res.render('addEvent',{
    	title:"test",
    	appText:appText,
    	moment: moment
    });
});
// Event/add page
router.get('/edit',function (req,res) {
    res.render('editEvent',{
    	title:"test",
    	appText:appText,
    	moment: moment
    });
});

// **************************************************Post request******************************************************

router.post('/add', function (req, res) {
    var e_name = req.body.e_name;
    var e_start_date= req.body.e_start_date;
    var e_end_date = req.body.e_end_date;
    var e_location = req.body.e_location;
    var e_desc = req.body.e_desc;
    console.log(e_name+e_start_date);

    // Validation
    // req.checkBody('name', 'Name is required').notEmpty();
    // req.checkBody('phone', 'Phone Number is required').notEmpty();
    // req.checkBody('email', 'Email is required').notEmpty();
    // req.checkBody('email', 'Email is not valid').isEmail();
    // req.checkBody('username', 'Username is required').notEmpty();
    // req.checkBody('password', 'Password is required').notEmpty();
    // req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
        res.render('addEvent',{
        title:"test",
        appText:appText,
        moment: moment
    });
    }
    else {
            var newEvent = new Event({
                e_name: e_name,
                e_start_date: e_start_date,
                e_end_date: e_end_date,
                e_location: e_location,
                e_desc: e_desc
            });

            // ************** Schema direct save function******
                // newEvent.save(function(err,event){
                //     if (err) throw err;
                //     console.log(event);
                // });

                // ************ event.js imported schema saving function*******
            Event.createEvent(newEvent, function (err, event) {
                        if (err) throw err;
                        console.log(event);
                    });





            req.flash('success_msg', 'You are registered and can now login');
            res.redirect('/events');
        
    }
});




















































function ensureAuthenticated(req,res,next){
     if(req.isAuthenticated()){
         return next();
     }
     else {
         //req.flash('error_msg','You are not logged in');
         res.redirect('/users/login');
     }
};
module.exports= router;