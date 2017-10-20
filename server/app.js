
var express = require('express');
var morgan = require('morgan');
var axios = require('axios');

//create express server below
var app = express();
var cache = {};
app.use(morgan('dev'));

//conditional that base on i or t format the string where 
// var preLinkT = 'http://localhost.com/?t=' + 
app.get('/', function(req, res) {  
    if (cache[req.query.i]) {
        console.log('Hey Vy is there any ID in cache');
        res.json(cache[req.query.i]);
    }
    if (cache[req.query.t]) {
        console.log('Hey Vy is there any TITLE in cache');
        res.json(cache[req.query.t]);
    } else { 
        if (req.query.i) {
        axios.get('http://www.omdbapi.com/?apikey=8730e0e&i=' + req.query.i) 
        .then(function (response) {
            console.log('hey vy here is the info for ID', response.data);  
            res.json(response.data);  
            cache[req.query.i] = response.data; 
        })
        .catch(function (error) {
            console.log('hey vy theres an error for ID CATCH', error);
            res.status(500).send(error.message)
        });
    }
    if (req.query.t) {
        axios.get('http://www.omdbapi.com/?apikey=8730e0e&t=' + req.query.t) 
        .then(function (response) {
            console.log('hey vy here is the info for TITLE', response.data);
            res.json(response.data); 
            cache[req.query.t] = response.data; 
        })
        .catch(function (error) {
            console.log('hey vy theres an error for TITLE CATCH', error);
            res.status(500).send(error.message)
        });
    }
    }
});


module.exports = app;