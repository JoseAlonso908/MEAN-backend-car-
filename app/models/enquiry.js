var mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Enquiry = mongoose.model('Enquiry', new Schema({
    listing : { type: Schema.Types.ObjectId, ref: 'Listing'},    
    first_name : String,
    last_name : String, 
    phone: String,
    email : String,
    user_id: String, 
    message: String
    })
);

module.exports.save = function(data, cb){
    var newEnquiry = new Enquiry;
    newEnquiry.listing = data.listing_id;
    newEnquiry.first_name = data.first_name; 
    newEnquiry.last_name = data.last_name;
    newEnquiry.phone = data.phone;
    newEnquiry.email = data.email;
    newEnquiry.user_id = '1';
    newEnquiry.message = data.message;    
    newEnquiry.save(function(err, response){
        if(err){
            cb(err);
        }
        Enquiry.findById(response._id).populate({path: "listing", populate: {path: "dealer"}}).exec(function(err, enqListing){
            if(err){
                cb(err);
            }
            cb(false,enqListing);
        })
        
    })
}

/* 'listing', {_id : '5a476261d0d745192477f6ca' */

module.exports.find = function(data, cb){
    Enquiry.find(data).populate({path: 'listing', populate: {path :'dealer' , match: {_id : mongoose.Types.ObjectId('5a476261d0d745192477f6ca')}}}).exec(function(err, listings){
        if(err) cb(err);
        cb(false, listings);
    })
}
