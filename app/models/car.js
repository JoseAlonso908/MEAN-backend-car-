var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Make = mongoose.model('Make', new Schema({ 
        name: String,
        make_id : String,
        logo : String
    }, {collection: 'Make'})
);

const Model = mongoose.model('Model', new Schema({
        make_id : String,
        name : String,
        type : String,
        model_id: String,
        image_original : String
    }, {collection: 'Model'})
);

const ModelImage = mongoose.model('Model_Image', new Schema({ 
        image_name: String,
        model_id : String
    }, {collection: 'ModelImage'})
);

module.exports.addMakes = function(data, cb){
    Make.remove({}, function(err1, response1){
        Make.insertMany(data , function(err, response){
            if(err){
                cb(err);
            }
            cb(false,response);
        })    
    })
}

module.exports.listAllMakes = function(cb){
    Make.find({}, function(err, makes){
        if(err) cb(err);
        console.log("make data : "+JSON.stringify(makes));
        cb(false, makes);
    })
}

module.exports.listAllModelsByMakeId= function(makeId , cb){
    Model.find({make_id:makeId}, function(err, makeModels){
        if(err) cb(err);
        cb(false, makeModels);
    })
}

module.exports.searchModelsByMakeId = function(params, cb){
    let skip = (params.page -1) * parseInt(params.limit);    
    Model.find({make_id:params.makeId }, ["id", "name", "model_id","make_id","image_original"], {skip:skip , limit: parseInt( params.limit) }, function(err, models){
        if(err) cb(err);
        cb(false, models);
    })
}

module.exports.addModelsByMakeId = function(makeId, data, cb){    
    Model.remove({make_id: makeId }, function(err1, response1){
        Model.insertMany(data, function(err, response){
            if(err){
                cb(err);
            }
            cb(false,response);
        })
    })   
}

module.exports.findModels = function(data, cb){
    Model.find(data, function(err, models){
        if(err) {
            cb(err);
        }
        cb(false, models);        
    })
}

module.exports.findMake = function(data, cb){
    Make.findOne(data, function(err, makes){
        if(err) {
            cb(err);
        }
        cb(false, makes);        
    })
}


module.exports.searchMakes = function(make, cb){
    Make.find({name : new RegExp(make, 'i')}, function(err, makes){
        if(err) {
            cb(err);
        }
        cb(false, makes);
    })
}

module.exports.searchModels = function(make, cb){
    Model.find({name : new RegExp(make, 'i')}, function(err, models){
        if(err) {
            cb(err);
        }
        cb(false, models);
    })
}

module.exports.addModelImage = function(data,cb){    
    Model.findOne({model_id: data.model_id}, function(err, model){
        if(err) cb(err);
        model.image_original =  data.image_name;
        model.save(function(err2, model2){
            if(err2) cb(err2);
            cb(false, model2);
        });
    })
}

module.exports.updateMakeLogo = function(data,cb){
    Make.findOne({make_id: data.make_id}, function(err, make){
        if(err){
            cb(err)
        }
        make.logo = data.logo ;
        make.save(function(err2, saved){
            if (err) cb(err2);
            cb(false, "Logo added successfully!");
        });
    });    
}

module.exports.getModelData = function(modelId, cb){
    Model.findOne({model_id : modelId} , function(err,modelresponse){
        if(err) cb(err);
        Make.findOne({make_id : modelresponse.make_id}, function(err, makeresponse){
            if(err) cb(err);
            var modeldata = {model: modelresponse, make : makeresponse};
            cb(false, modeldata);
        });
    })
}

module.exports.getRelatedModels = function(modelId, cb){
    Model.findOne({model_id : modelId} , function(err,modelresponse){        
        if(err) cb(err);
        if(modelresponse.make_id){
            Model.find({make_id : modelresponse.make_id}).where("model_id").nin([modelId]).limit(4).exec(function(err, related_models){
                if(err) cb(err);
                cb(false, related_models);
            })
        }
    })
}