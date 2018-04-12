var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Listing = mongoose.model('Listing', new Schema({
    dealer_id : String,
    dealer : { type: Schema.Types.ObjectId, ref: 'Dealer' },
    model_id : String,
    year: Number,
    term_of_lease : Number, 
    miles_per_year: Number,
    fuel_type: String,
    average_city : Number,
    average_highway : Number,
    monthly_lease_price: Number,
    vin_number : String,
    color : String,
    money_down: Number
    })
);

module.exports.save = function(data, cb){
    var listing = new Listing;
    listing.dealer_id = data.dealer_id;
    listing.dealer = data.dealer_id;
    listing.model_id = data.model_id;
    listing.term_of_lease = data.term_of_lease;
    listing.monthly_lease_price = data.monthly_lease_price;
    listing.vin_number = data.vin_number ? data.vin_number :0;
    listing.color = data.color;
    listing.miles_per_year = data.miles_per_year;
    listing.money_down = data.money_down? data.money_down: 0 ;    
    listing.save(function(err, response){
        if(err){
            cb(err);
        }
        cb(false,response);
    })
}

module.exports.find = function(data, cb){    
    Listing.find(data).populate('dealer').exec(function(err,listings){   
        console.log("find details result: "+JSON.stringify(listings));
        if(err) {
            cb(err);
        }
        cb(false, listings);        
    });
}