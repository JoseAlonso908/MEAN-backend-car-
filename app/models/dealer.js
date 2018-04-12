var mongoose = require("mongoose");
var md5 = require("md5");

const Schema = mongoose.Schema;
var Dealer = mongoose.model('Dealer', new Schema({ 
    first_name: String,
    last_name: String,
    email : String, 
    password : String, 
    mobile_no: String,
    businessname : String
    })
);

module.exports.save = function(data, cb){
    var dealer = new Dealer;
    dealer.first_name = data.first_name;
    dealer.last_name = data.last_name;
    dealer.email = data.email;
    dealer.password = md5(data.password);
    dealer.businessname = data.businessname;
    dealer.mobile_no = data.mobile_no;
    dealer.save(function(err, response){
        if(err){
            cb(err);
        }
        cb(false,response);
    })
}


module.exports.find = function(data, cb){
    Dealer.findOne({email: data.email }, function(err,dealer){        
        if(err) {
            cb(err);
        }
        cb(false, dealer);        
    });
}