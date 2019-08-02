//Connecting Mongodb
var mongoose=require('mongoose');
var bcrypt= require('bcryptjs');


// ****************event schema*******************
var eventSchema = mongoose.Schema({
    e_name:{
        type:String,
        index:true
    },
    e_start_date:{
        type:Date,
    },
    e_end_date:{
        type:Date
    },
    e_location:{
        type:String
    },
    e_desc:{
        type:String
    }
});

var Event= module.exports=mongoose.model('events',eventSchema);


module.exports.createEvent=function (newEvent,callback) {
    
    newEvent.save(callback);

};