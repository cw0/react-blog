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
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//disable etag headers on responses
app.disable('etag');

//Connect to mongo database
mongoose.connect('mongodb://localhost/react-tweets');

//Create a new ntwitter instance
var twit = new twitter(config.twitter);

//Index Route
app.get('/', routes.index);

//Page Route
app.get('/page/:page/:skip', routes.page);

//Set /public as our static content dir
app.use('/', express.static(__dirname + "/public"));

//Start server
var server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});

//init socket.io
var io = require('socket.io').listen(server);

//set a stream listener for tweets matching keywords
twit.stream('statuses/filter', { track: 'scotch_io, #scotchio'}, function(stream) {
  streamHandler(stream, io);
})
