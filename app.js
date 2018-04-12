const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const jwt = require('express-jwt');

//app.use(jwt({ secret: 'Car-Deals-2017shhhhHHHHH'}).unless({path: ['/hello','/dealer/signup','/dealer/login','/car/upload-image','/uploads']}));


app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid Authorization token');
  }
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  next();
});


app.use('/uploads', express.static('app/uploads'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('./app/routes'));

var dbConnect = require("./app/config/db");
app.listen(3030, function () {
  console.log('Example app listening on port 3030!');
});

dbConnect.connect(function(err,db){
  if(err) {
    console.log(err, "Error in connecting database");
  } else{

    //console.log(db, "Database connected");
  }  
})