var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');
exports.Specification4=function(callback){
connection.query("SELECT UPPER(specification_4_name) as specification_4_name,specification_4_id FROM m_specification4",function(err,rows){
    if(rows.length>0){
    //  console.log(rows);
      return callback(rows);
  }
  else{
      return callback("reject");
  }
    });
}
