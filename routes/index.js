var express				=	require('express');
var router 				= 	express.Router();
var appText				= 	require('../settings/en-lang.js');
var moment 				=	require('moment');
var FF = require('../models/freedomFighter.js');

// **************************************************get request******************************************************

//homepage
router.get('/',function (req,res) {

    FF.find( function (err, result) {

        if (err){
            return;
        }

        res.render('index',{
         title:"Home",
         items:result,
         appText:appText
        });
    });
});

router.get('/details/:id',function (req,res) {
        FF.findById(req.params.id, function (err, result) {

        if (err){
            return;
            console.log(err)
        }

        res.render('detailsFf',{
         title:result.name,
         items:result,
         appText:appText
        });
});
});

// router.get('/',ensureAuthenticated,function (req,res) {
//     res.render('index',{title:"Home"});
// });

// function ensureAuthenticated(req,res,next){
//      if(req.isAuthenticated()){
//          return next();
//      }
//      else {
//          //req.flash('error_msg','You are not logged in');
//          res.redirect('/users/login');
//      }
// };
module.exports= router;