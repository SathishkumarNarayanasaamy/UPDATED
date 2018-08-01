var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
// var DB = require('./config/database');
var jwt = require('jsonwebtoken');
// var config = require('./config/config');

// var connection = require('./config/database');
const rewinderProd = require('./routes/rewinder-prod.js')

require('dotenv').config()
var port = process.env.PORT;
// const mongoClient = require('./config/database');
const mongoose = require('mongoose');

mongoose.connect('mongodb://192.168.99.100:27017/winder');
let db = mongoose.connection;

// Check connection
db.once('open', function(){
  console.log('Connected MongoDB');
});

// Check connection
db.on('error', function(err){
  console.log('Db error', err);
});

//BodyParser middleware
app.use(bodyParser.urlencoded({
    extended: true
  }));
  // app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.use(bodyParser.json());
  app.use(express.json({ limit: '50mb' }));
  //app.use(express.urlencoded({limit: '50mb'}));
  //app.use(cookieParser());
  
  //CORS
  app.use(cors());
  
  // Add headers
  app.use(function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
    //   res.setHeader('Access-Control-Allow-Origin', process.env.NG_HOST);
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Headers', 'x-account, accept, access-control-request-origin');
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);
      // Pass to next layer of middleware
      next();
  });



  app.use('/rewinder-prod', rewinderProd);



  

app.listen(port);
console.log("The listing port is " + port);