var listing = require('../../../models/listing');
module.exports.addListing = function(req,res){
    listing.save(req.body, function(err, result){
        if(err){
        	res.status(500).send(err);            
        }
        else{
            res.send(result);
        }
    });
}