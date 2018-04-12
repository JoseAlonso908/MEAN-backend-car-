const car = require('../../../models/car');
const listing = require('../../../models/listing');
const https = require('https');
const http = require('http');
const path = require('path'), fs = require('fs');
const helpers = require("../../../services/helpers");


module.exports.getModelData = function(req, res){
    console.log("get model data");    
    //let modelId = req.params.modelId;

    let modelYear = req.params.modelYear;
    let makeName = req.params.makeName;
    let modelName = req.params.modelName;
    let styleName = req.params.styleName;    
    
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
                     '<urn:modelYear>' + modelYear + '</urn:modelYear>' +
                    '<urn:makeName>' + makeName + '</urn:makeName>' +
                    '<urn:modelName>' + modelName + '</urn:modelName>' +
                    '<urn:styleName>' + styleName + '</urn:styleName>' +
                    '<urn:switch>ShowExtendedDescriptions</urn:switch>' +
                    '<urn:switch>ShowAvailableEquipment</urn:switch>' +
                  '</urn:VehicleDescriptionRequest>' +
               '</soapenv:Body>' +
            '</soapenv:Envelope>'; 
    console.log('post_data' + post_data);
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

    // car.getModelData(modelId, function(err, model_info){
    //     if(err) {res.status(501).send(err)}
    //     listing.find({model_id : modelId}, function(err, listings){
    //         if(err) {res.status(501).send(err)}            
    //         res.send({model_info : model_info , listings: listings});
    //     });        
    // })
}

module.exports.getModelGalleryData = function(req, res){
    console.log("get gallery data");    

    let styleId = req.params.styleId;
    let request = "https://313496:6d84d5c446a84c98@media.chromedata.com/MediaGallery/service/style/" + styleId + "/.json";
    console.log(request);
    // res.send(request); 

    https.get(request , (resp) => {           
    
          let data = '';
          //A chunk of data has been recieved.
          resp.on('data', (chunk) => {
            data += chunk;
          });

          resp.on('end', () => {
            let galleryData = JSON.parse(data);            
            res.send(galleryData);            
          });

        
    }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.status(500).send(err.message);
    });

}



module.exports.getRelatedModels = function(req, res){
    let modelId = req.params.modelId;
    car.getRelatedModels(modelId, function(err, related_models){
        if(err) res.status(501).send(err);
        res.send(related_models);
    })
}