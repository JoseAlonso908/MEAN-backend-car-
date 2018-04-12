const https = require('https');
const listing = require("../../../models/listing");
module.exports.newListing = function(req,res) {
    listing.save(req.body, function(err, listingRes){
        if(err) res.status(500).send(err);
        res.send(listingRes);
    })
}