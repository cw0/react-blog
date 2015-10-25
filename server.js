//import dependencies
var express = require('express'),
    exphbrs = require('express-handlebars'),
    http = require('http'),
    mongoose = require('mongoose'),
    twitter = require('ntwitter'),
    routes = require('./routes'),
    config = require('./config'),
    streamHandler = require('./utils/streamHandler');

//setup express instance and bind default port
var app = express,
    port = process.env.PORT || 8080;

//set handlebars as the default templating engine

//disable etag headers on responses
