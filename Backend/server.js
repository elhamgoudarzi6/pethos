const express = require('express');
const helmet = require('helmet');
//const fetch = require('node-fetch');
const { stringify } = require('querystring');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
const expressValidator = require('express-validator');
global.config = require('./modules/config');
autoIncrement = require('mongoose-auto-increment');
// var cors = require('cors');

// Connect to DB
mongoose.connect('mongodb://pethosap_pethosDB:123456789@localhost:27017/pethosap_pethosDB' , { useMongoClient : true });

mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json({ type : 'application/json' }));
app.use(expressValidator());
app.use(express.json());
// app.use(cors());

//helmet
app.use(helmet());
app.use(helmet.xssFilter());
app.use(helmet.frameguard());

app.use('/public' , express.static('public'));

const apiRouter = require('./modules/routes/api');
const webRouter = require('./modules/routes/web');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization,Accept");
    next();
});





app.options("/*", function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.sendStatus(200);
});



            
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use('/api' , apiRouter);
app.use('/' , webRouter);
app.use(require('./modules/routes/errorHandler'));

app.listen(config.port , () => {
    console.log(`Server running at Port ${config.port}`)
});
