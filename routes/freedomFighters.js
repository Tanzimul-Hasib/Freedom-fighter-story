var express				=	require('express');
var router 				= 	express.Router();
var appText				= 	require('../settings/en-lang.js');
var moment 				=	require('moment');
var FF = require('../models/freedomFighter.js');

// **************************************************get request******************************************************

//homepage
router.get('/',ensureAuthenticated,function (req,res) {

    FF.find( function (err, result) {

        if (err){
            return;
        }

        res.render('listFf',{
         title:"All Freedom fighters",
         items:result,
         appText:appText
        });
    });
});


// FF/add page
router.get('/add',ensureAuthenticated,function (req,res) {
    res.render('addFf',{
    	title:"Add another great man",
    	appText:appText
    });
});
// FF/edit page
router.get('/edit/:id',ensureAuthenticated,function (req,res) {
        FF.findById(req.params.id, function (err, result) {

        if (err){
            return;
            console.log(err)
        }

        res.render('editFf',{
         title:"Update",
         items:result,
         appText:appText
        });
});
});

// **************************************************Post request******************************************************

router.post('/add',ensureAuthenticated, function (req, res) {
    var name = req.body.name;
    var rank = req.body.rank;
    var birth= req.body.birth;
    var death= req.body.death;
    var education = req.body.education;
    var profission = req.body.profission;
    var address = req.body.address;
    var family_members = req.body.family_members;
    var story_1 = req.body.story_1;
    var story_2 = req.body.story_2;
    var peoples_say = req.body.peoples_say;

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
        res.render('addFf',{
        title:"error",
        appText:appText
    });
    }
    else {
            var newFF = new FF({
                name :name,
                rank :rank,
                birth :birth,
                death :death,
                education :education,
                profission :profission,
                address :address,
                family_members :family_members,
                story_1 :story_1,
                story_2 :story_2,
                peoples_say :peoples_say
            });

            // ************** Schema direct save function******
                // newFFsave(function(err,ff){
                //     if (err) throw err;
                //     console.log(ff);
                // });

                // ************ ff.js imported schema saving function*******
            FF.createFF(newFF, function (err, ff) {
                        if (err) throw err;
                        console.log(ff);
                    });

            req.flash('success_msg', 'Success');
            res.redirect('/freedomFighters');
        
    }
});


// **************edit or update*************
router.post('/',function (req,res) {
        FF.findOneAndUpdate({_id:req.body._id}, req.body,{new:true}, function (err, result) {

        if (err){
            return;
            console.log(err)
        }
        else{
            res.redirect('/freedomFighters/');
        }
        
    });
});
// ***********************************Delete*******************
router.get('/delete/:id',ensureAuthenticated,function (req,res) {
        FF.findByIdAndRemove(req.params.id, function (err, result) {

        if (err){
            return;
            console.log(err)
        }

        else{
            res.redirect('/freedomFighters/');
        }
});
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