var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');
exports.shopdetailsautocomplete=function(callback){
connection.query("SELECT UPPER(shop_name) as shop_name,UPPER(shop_id) as shop_id FROM shop_details",function(err,rows){
    if(rows.length>0){
    // console.log(rows);
    return callback(rows);
    }
    else{
    return callback("reject");
    }
  });
}
