const car = require('../../../models/car');
const https = require('https');
const http = require('http');
const apiUrl = "https://vpic.nhtsa.dot.gov/api/";
const path = require('path'), fs = require('fs');
const helpers = require("../../../services/helpers");

module.exports.fetchAllMakes = function(req,res){
	https.get(apiUrl+ "vehicles/GetMakesForVehicleType/car?format=json", (resp) => {
		
	
		  let data = '';
		  //A chunk of data has been recieved.
		  resp.on('data', (chunk) => {
		    data += chunk;
		  });

		  resp.on('end', () => {
			let allMakes = JSON.parse(data);		    
			allMakes.Results = allMakes.Results.map(function(a){
				return {
					name : a.MakeName,
					make_id : a.MakeId
				};
			});
			car.addMakes(allMakes.Results, function(err, response){
				console.log(err,"Error while entering data");
				res.send(allMakes.Results);
			})
		  });

		
	}).on("error", (err) => {
	  	console.log("Error: " + err.message);
		res.status(500).send(err.message);
	});
}

module.exports.listMakes = function(req, res){
	car.listAllMakes(function(err, makes){
		if(err) res.status(500).send(err);
		res.send(makes);
	})
}

module.exports.listAllModelsByMakeId = function(req, res){
	let makeId =  req.params.makeId ;
	car.listAllModelsByMakeId(makeId, function(err, makes){
		if(err) res.status(500).send(err);
		res.send(makes);		
	})
}

module.exports.fetchModelsByMakeId = function(req,res){
	let makeId = req.params.makeId;
	https.get(apiUrl+ "vehicles/GetModelsForMakeId/"+makeId+"?format=json", (resp) => {

		console.log(resp,"response");
		  let data = '';
		  //A chunk of data has been recieved.
		  resp.on('data', (chunk) => {
		    data += chunk;
		  });

		  resp.on('end', () => {
			let makeModels = JSON.parse(data);    
			makeModels.Results = makeModels.Results.map(function(a){
				return {
					name : a.Model_Name,
					make_id : a.Make_ID,
					model_id : a.Model_ID
				};
			});
			car.addModelsByMakeId(makeId, makeModels.Results, function(err, response){
				console.log(err,"Error while entering data");
				res.send(makeModels.Results);
			})
		  });
		}).on("error", (err) => {
		  	console.log("Error: " + err.message);
			res.status(500).send(err.message);
		});	
}

module.exports.uploadModelImage = function(req,res){	
	let modelId  = req.params.modelId;	
	console.log(modelId, "modelId");
	car.findModels({model_id : modelId}, function(err, data){
		if(err || !data.length) {
			helpers.sendError(res,"Invalid Car Model");
		}
		else{
			let tempPath = req.body.image_url;
			let fileType = tempPath.split('.').pop();
			let uuid = helpers.uuid();
			var fileName = `${modelId}${uuid}.${fileType}`;
			var uploadedfile = fs.createWriteStream(`./app/uploads/${fileName}`);	
			let client = https;
			if(tempPath.indexOf("http://") > -1){
				client = http;
			}
			client.get(tempPath, (response)=> {
				response.pipe(uploadedfile);
				car.addModelImage({image_name: fileName , model_id: modelId},function(err,imgsaved){
					if(err) helpers.sendError(res,err);
					helpers.sendSuccess(res, imgsaved);
				})			
			}, error=>{
				helpers.sendError(res,error);
			});	
		}
			
	})
    
}

module.exports.updateMakeLogo = function(req,res){
	let makeId  = req.params.makeId;
	car.findMake({make_id : makeId}, function(err, data){
		if(err || !data._id) {
			helpers.sendError(res,"Invalid Car Make");
		}
		else{
			let tempPath = req.body.image_url;
			let fileType = tempPath.split('.').pop();
			let uuid = helpers.uuid();
			var fileName = `${makeId}${uuid}.${fileType}`;
			var uploadedfile = fs.createWriteStream(`./app/uploads/${fileName}`);	
			let client = https;
			if(tempPath.indexOf("http://") > -1){
				client = http;
			}
			client.get(tempPath, (response)=> {
				response.pipe(uploadedfile);
				car.updateMakeLogo({logo: fileName , make_id: makeId},function(err,imgsaved){
					if(err) {helpers.sendError(res,err);}
					helpers.sendSuccess(res, imgsaved);
				})
			}, error=>{
				helpers.sendError(res,error);
			});	
		}
	})	
}

module.exports.getMakeData = function(req,res){
	let makeId  = req.params.makeId;
	car.findMake({make_id : makeId}, function(err,makeData){
		if(err) helpers.sendError(res, err);
		helpers.sendSuccess(res,makeData);
	});	
}