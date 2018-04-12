var dealer = require('../../../models/dealer');
module.exports.dealerSignUp = function(req,res){
    dealer.save(req.body, function(err, result){
        if(err){
        	res.status(500).send("Error in saving dealer data");            
        }
        else{
            res.send(result);
        }
    });
}