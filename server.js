/*jshint node:true*/
'use strict';
var express = require('express');
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var async = require('async');
var cors = require ('cors');
var bodyParser = require('body-parser');
var app = express();

var port = 9001;

// Enable CORS
app.options('*', cors());
app.use(cors());

// parse application/json and look for raw text                                        
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  

// require endpoints
app.use('/', require('./endpoints/auth.js'));
app.use('/', require('./endpoints/users.js'));

var DBSTRING = 'mongodb://localhost/testDB';

async.series([
        function(callback) {
            mongodb.connect(DBSTRING, function (err, res) {
                callback(err, res);
            });
        },
        function(callback) {
            mongoose.connect(DBSTRING, function(err, res) {
                callback(err, res);
            });
        }
    ],
    // This is the callback
    function(err, results) {
        if (err) {
            console.log(err);
        } else {
            console.log('Successfully connected to MongoDB and Mongoose.');
            // Start the express server on the given port
            app.listen(port, function () {
                console.log('Server is running on localhost:' + port);
            });

        }
    }
);

module.exports = app;