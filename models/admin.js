//Connecting Mongodb
var mongoose=require('mongoose');
var bcrypt= require('bcryptjs');

//Admin Schema
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

//Setup Mongodb connection In Admin variable
var Admin= module.exports=mongoose.model('admin',userSchema); //'S'will be added after Admin in collection name
//Create Admin while registration
module.exports.createUser=function (newAdmin,callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newAdmin.password, salt, function(err, hash) {
            // Store hash in your password DB.
            newAdmin.password = hash;
            newAdmin.save(callback);
        });
    });
};


//login modules
module.exports.getUserByUsername = function (username,callback) {
    var query={username:username};
    Admin.findOne(query,callback);
};

module.exports.comparePassword = function (candidatePassword,hash,callback) {
    // Load hash from your password DB.
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err) throw err;
        callback(null,isMatch);
    });
};

module.exports.getUserById = function (id,callback) {
     Admin.findById(id,callback);
}


