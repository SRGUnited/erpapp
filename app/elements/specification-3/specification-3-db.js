var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');
exports.Specification3=function(callback){
connection.query("SELECT UPPER(specification_3_name) as specification_3_name,specification_3_id FROM m_specification3",function(err,rows){
    if(rows.length>0){
    //  console.log(rows);
      return callback(rows);
  }
  else{
      return callback("reject");
  }
    });
}
