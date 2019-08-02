var http              = require('http');
var express           = require('express');
var app               = express();
var path              = require('path');
var cookieParser      = require('cookie-parser');
var bodyParser        = require('body-parser');
var exphbs            = require('express-handlebars');
var expressValidator  = require('express-validator');
var flash             = require('connect-flash');
var session           = require('express-session');
var passport          = require('passport');
var LocalStrategy     = require('passport-local').Strategy;
var mongo             = require('mongodb');
var mongoose          = require('mongoose');
var moment            = require('moment');

mongoose.connect('mongodb://localhost/loginapp', { useNewUrlParser: true });
// var db = mongoose.connection;



// adding bootstrap & jquery 
app.use('/js',express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js',express.static(__dirname + '/node_modules/tether/dist/js'));
app.use('/js',express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/',express.static(__dirname + '/node_modules/moment'));
app.use('/js',express.static(__dirname + '/scripts/js'));
app.use('/css',express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/css',express.static(__dirname + '/styles/css'));
// app.use('/settings',express.static(__dirname + '/settings'));



// Define file & folders
var routes = require('./routes/index');
var users = require('./routes/users');
var events = require('./routes/events');
var admins = require('./routes/admins');


// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  res.locals.admin = req.admin || null;
  next();
});


// connecting files with app js
app.use('/', routes);
app.use('/users', users);
app.use('/events', events);
app.use('/admins', admins);


// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
console.log('Server started on port '+app.get('port'));
});