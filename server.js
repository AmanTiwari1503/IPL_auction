/*
Aman Tiwari
*/
const express = require('express');
const bodyParser = require('body-parser');
const upload = require('multer')({ dest: 'uploads/' });
var logger = require('morgan');
var app = require('./ApplicationInstance');
var _ = require("underscore");
var mainRoutes = require('./backend/routes/MainRoutes');
// var adminRoutes = require('./backend/routes/AdminRoutes');
// var sessionController = require('./backend/controllers/sessionController');
// var playerController = require('./backend/controllers/playerController');
const cors = require('cors');
// enable cors
var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));
app.use(logger('dev'));
app.set('port', (process.env.PORT || 4000));


app.use(express.static(__dirname + '/main'));
app.set('views', __dirname + '/main/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// app.use('/admin', adminRoutes);
app.use('/', mainRoutes);
app.listen(app.get('port'),function(){
    console.log("Started listening on port", app.get('port'));
});
