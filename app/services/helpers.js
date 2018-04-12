module.exports.uuid = function(){
    let today = new Date().getTime();
    let uniqId = Math.floor((Math.random() * 100000) + 1);
    return `${uniqId}${today}`;
}

module.exports.sendSuccess = function(res, message, code = 200){
    res.send({
        error:false ,
        message: message
    });
}

module.exports.sendError = function(res, message, code = 501){
    res.status(code).send({
        error:true ,
        message: message
    });
}