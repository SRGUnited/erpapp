var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');
exports.Specification1=function(callback){
connection.query("SELECT specification_1_name,specification_1_id FROM m_specification1",function(err,rows){
    if(rows.length>0){
     console.log(rows);
      return callback(rows);
  }
  else{
      return callback("reject");
  }
    });
}
