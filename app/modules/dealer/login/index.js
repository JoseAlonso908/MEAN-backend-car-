var dealer = require('../../../models/dealer');
var md5 = require("md5");
var jwtsign = require('jsonwebtoken');

module.exports.dealerLogin = function(req,res){
	var data = req.body;
	dealer.find(data, function(err, dealer){
		if(err){
			res.status(500).send(err);
		}
		else{
			console.log(dealer , "dealer data");
			if(dealer && dealer.password == md5(data.password)){
                //Generate token now
                var loginToken = jwtsign.sign({email : dealer.email}, 'Car-Deals-2017shhhhHHHHH');
                res.send({error:false, token: loginToken, user: dealer});
            }
            else{
            	res.status(401).send({ error:true , message : "Invalid credentials."});	
            }
            
		}
	})
}