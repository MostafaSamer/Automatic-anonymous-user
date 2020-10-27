const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

// POST REQ DATA
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CONNECT DB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/aau', { useNewUrlParser: true, useUnifiedTopology: true });

// ROUTERS
var index = require('./router/index');
app.use('/', index);
var guest = require('./router/guest');
app.use('/guest', guest);

// Schudle Manger
require('./schudleManger/index')

const port = process.env.PORT || 3000
app.listen(port, ()=> {
    console.log("App is running at port ", port)
})