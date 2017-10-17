var express= require("express");
var cors= require("cors");
var app=express();
app.use(cors());
var MongoClient= require("mongodb").MongoClient;
var ObjectID = require('mongodb').ObjectID;
var assert= require("assert");  // assert is used for exception handling
var url ='mongodb://localhost:27017/aagan';

app.listen(3000);
