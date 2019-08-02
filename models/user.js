//Connecting Mongodb
var mongoose=require('mongoose');
var bcrypt= require('bcryptjs');

//User Schema
var userSchema = mongoose.Schema({
    username:{
        type:String,
        index:true
    },
    phone:{
        type:String,
    },
    password:{
        type:String
    },
    email:{
        type:String
    },
    name:{
        type:String
    }
});

//Setup Mongodb connection In User variable
var User= module.exports=mongoose.model('user',userSchema); //'S'will be added after user in collection name
//Create User while registration
module.exports.createUser=function (newUser,callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            // Store hash in your password DB.
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};


//login modules
module.exports.getUserByUsername = function (username,callback) {
    var query={username:username};
    User.findOne(query,callback);
};

module.exports.comparePassword = function (candidatePassword,hash,callback) {
    // Load hash from your password DB.
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err) throw err;
        callback(null,isMatch);
    });
};

module.exports.getUserById = function (id,callback) {
     User.findById(id,callback);
}


