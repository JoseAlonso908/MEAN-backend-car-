var user = require('../../models/user');
var md5 = require("md5");
var jwtsign = require('jsonwebtoken');

module.exports.getUser = function(req,res){
    user.findById(req.params.id, function(err, response_user){
        if(err) res.status(501).send(err);
        res.send(response_user);
    })    
}

module.exports.signup = function(req, res){
    user.save(req.body, function(err, responseUser){
        if(err) res.status(501).send(err);
        res.send({error: false, message: "Customer signup sucessfull !!"});
    });
}

module.exports.login = function(req,res){
	var data = req.body;
	user.find(data, function(err, user){
		if(err){
			res.status(500).send(err);
		}
		else{			
			if(user && user.password == md5(data.password)){
                var loginToken = jwtsign.sign({email : user.email}, 'Car-Deals-2017shhhhHHHHH');
                res.send({error:false, token: loginToken, user: user});
            }
            else{
            	res.status(401).send({ error:true , message : "Invalid credentials."});	
            }
            
		}
	})
}