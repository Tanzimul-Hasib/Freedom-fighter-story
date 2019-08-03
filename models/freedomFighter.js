//Connecting Mongodb
var mongoose=require('mongoose');
var bcrypt= require('bcryptjs');


// ****************event schema*******************
var ffSchema = mongoose.Schema({
    name:{
        type:String,
        index:true
    },
    rank:{
        type:String
    },
    birth:{
        type:String
    },
    death:{
        type:String
    },
    education:{
        type:String
    },
    profission:{
        type:String,
    },
    address:{
        type:String
    },
    family_members:{
        type:String
    },
    story_1:{
        type:String
    },
    story_2:{
        type:String
    },
    peoples_say:{
        type:String
    }

});

var FF= module.exports=mongoose.model('ff',ffSchema);


module.exports.createFF=function (newFF,callback) {
    
    newFF.save(callback);

};