var express    = require("express");
var mysql      = require('mysql');
var file='app/config/data.json';
var jsonfile=require('jsonfile');

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


var fetchpath=[];
var fetchpath = "/template polymer/workshop template/app/elements/salesorder-summary/fetch.json";
exports.fetch=function(callback){
  connection.query('Select * FROM salesordercreate',function(err,rows){
  if(rows.length>0){
  //  console.log(rows);
  return callback(rows);
  jsonfile.writeFile(fetchpath,rows,function(err){
//  res.status(200).json({'returnval': rows});
// consw4ole.log(rows);
// writes automatically as json file
  })
}
else{
  //res.status(200).json({'returnval': "Data not found!"});
  return callback("reject");
}
});
//console.log("j");
}
