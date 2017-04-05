var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');
var file='app/config/data.json';
var dbjson=[];
exports.getconnection=function(){
  require('fs').readFile('/template polymer/workshop template/app/config/getconnection.json','utf8',function(err,data){
    dbjson=JSON.parse(data);
    exports.connectionvalues();
  });
}
var connection;
exports.connectionvalues=function(){
  connection=mysql.createConnection({
    host:dbjson[0].host,
    port:dbjson[0].port,
    user:dbjson[0].user,
    password:dbjson[0].password,
    database:dbjson[0].database
  });
  connection.connect(function(err){
    if(!err){
      console.log("Connected with database");

    }
    else {
      console.log("Failed to connect with database!");
    }
  });
}

var timelinefetchpath=[];
var timelinefetchpath = "./app/elements/timeline-chart/timelinedesign.json";
exports.timelinefetch=function(callback){
  connection.query('Select * FROM goodsvehiclestatustracking',function(err,rows){
  if(rows.length>0){
    return callback(rows);
//console.log("hi");
// writes automatically as json file
  jsonfile.writeFile(timelinefetchpath,rows,function(err){
  })
}
else{
  //res.status(200).json({'returnval': "Data not found!"});
    return callback("reject");
}
});
//console.log("j");
}
