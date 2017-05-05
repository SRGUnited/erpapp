var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');
exports.Specification2=function(callback){
connection.query("SELECT UPPER(specification_2_name) as specification_2_name,specification_2_id FROM m_specification2",function(err,rows){
    if(rows.length>0)
    {
        return callback(rows);
    }
  else{
      return callback("reject");
  }
    });
}
