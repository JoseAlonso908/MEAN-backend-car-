const car = require('../../../models/car');
const https = require('https');
const http = require('http');
const path = require('path'), fs = require('fs');
const helpers = require("../../../services/helpers");

module.exports.searchCars = function(req,res){
	let query  = req.params.query.toLowerCase();
	query = decodeURIComponent(query);
	console.log(query, "query data");
	var resturnArr = [];
	car.searchMakes(query , function(err, makes){
		if(err){
			res.send({error:true , message :err });
		}
		else{
			if(makes.length){
				resturnArr = makes;
				car.listAllModelsByMakeId(makes[0].make_id, function(err, makeModels){
					if(err){
						res.send({error:false , data : resturnArr});
					}
					else{
						resturnArr = resturnArr.concat(makeModels);
						res.send({error:false , data : resturnArr});
					}
				})
			}
			else{
				car.searchModels(query, function(err, models){
					if(err){
						res.send({error:false , data : resturnArr});
					}
					else{
						resturnArr.concat(models);
						res.send({error:false , data: resturnArr});
					}
				});
			}
		}
	});   
}

module.exports.searchModelsData = function(req,res){
	console.log("search models data");
	var post_data = '<soapenv:Envelope' +
             ' xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"' + 
             ' xmlns:urn="urn:description7b.services.chrome.com">' + 
               '<soapenv:Header/>' +
               '<soapenv:Body>' +
                  '<urn:VehicleDescriptionRequest>' + 
                     '<urn:accountInfo' +
                      ' number="313496"' +
                      ' secret="6d84d5c446a84c98"' +
                      ' country="US"' +
                      ' language="en"' +
                      ' behalfOf="?"' +
                     '/>' +
                     '<urn:modelYear>2017</urn:modelYear>' +
                    '<urn:makeName>Ford</urn:makeName>' +
                    '<urn:modelName>Taurus</urn:modelName>' +                    
                  '</urn:VehicleDescriptionRequest>' +
               '</soapenv:Body>' +
            '</soapenv:Envelope>'; 
    headers = {
        host: 'services.chromedata.com',        
        method: 'POST',
        path: '/Description/7b',        
        headers: {
            'SOAPAction': '',
            'MIME-Version': '1.0',
            'Content-type': 'text/xml; charset=utf-8',
        }
    };

    var xmlData ='';
    var parseString = require('xml2js').parseString;
	var request = http.request(headers, function(response) {
	    response.on('data', function(d) {
	    	xmlData += d;
	        // console.log(d);
	    });
	    response.on('end', function() {
	    	console.log("end");	    		    	
	    	parseString(xmlData, function (err, result) {
			    if(err) res.status(500).send(err);
    			res.send(result);
			});
	    })
	});
	request.on('error', function(err) {
	    console.log("An error ocurred!");
	    console.log(err);
	});
	request.write(post_data);
	request.end();

	////// original code
	// let params = req.params;
	// car.searchModelsByMakeId(params, function(err, makes){
	// 	if(err) res.status(500).send(err);
	// 	res.send(makes);
	// });
}

