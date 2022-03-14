var express = require('express');
const https =require('https');
const http=require('http');
const fs = require('fs');
var app = express();
var httpApp=express();
const path = require('path');
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
//app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
//app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('css', express.static(__dirname));
app.use('js',express.static(__dirname));
app.use(express.static(__dirname + '/public'));


//get methods
app.get('/', function (req, res) {
    res.sendFile(__dirname+'/index.html');
    console.log("connection received");
});

httpApp.get('/', function (req, res) {
    res.sendFile(__dirname+'/index.html');
    console.log("connection received");
});


//http server

var server = httpApp.listen(80, function () {
    console.log('Node server is running..');
    //res.redirect("https://" + req.headers.host + "/" + req.path);
});

//https server

https.createServer({
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cer"),
},app).listen(443, function () {
    console.log(
        "App listening on prot 443!"
    );
});



