var mongoose = require("mongoose");
var md5 = require('md5');
const Schema = mongoose.Schema;
var User = mongoose.model('User', new Schema({ 
    first_name: String,
    last_name: String,
    email : String,
    mobile_no: String,  
    password : String     
}));

module.exports.save = function(data, cb) {
    var newUser = new User;
    newUser.first_name = data.first_name;
    newUser.last_name = data.last_name;
    newUser.email = data.email;
    newUser.password = md5(data.password);    
    newUser.mobile_no = data.mobile_no;
    newUser.save(function(err, response){
        if(err){
            cb(err);
        }
        cb(false,response);
    })
}




module.exports.find = function(data, cb){
    User.findOne({email: data.email }, function(err,user){        
        if(err) {
            cb(err);
        }
        cb(false, user);        
    });
}


module.exports.findById = function(userId, cb){
    User.findById(userId, function(err,user){        
        if(err) {
            cb(err);
        }
        cb(false, user);        
    });
}