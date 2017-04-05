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
var itemfetchpath=[];
var itemfetchpath = "/template polymer/workshop template/app/elements/all-design/itemdesign.json";
exports.itemfetch=function(callback){
  connection.query('Select * FROM m_item_details',function(err,rows){
  if(rows.length>0){
      jsonfile.writeFile(itemfetchpath,rows,function(err){
    return callback(rows);
//  res.status(200).json({'returnval': rows});
// console.log(rows);
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
