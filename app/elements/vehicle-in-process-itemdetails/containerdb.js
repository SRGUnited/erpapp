var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');
exports.containeridfetch=function(containeridvalue,callback){
  connection.query("select containername from m_item_container_detail where containerid='"+containeridvalue+"'",function(err,rows){
   if(rows.length>0){
    //  console.log(rows);
      return callback(rows);
  }
  else{
      return callback("reject");
  }
    });
}
