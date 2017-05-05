var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');
exports.categorydetailsautocomplete=function(callback){
connection.query("SELECT UPPER(category_name) as category_name,category_id FROM m_category",function(err,rows){
    if(rows.length>0){
    // console.log(rows);
    return callback(rows);
    }
    else{
    return callback("reject");
    }
  });
}
