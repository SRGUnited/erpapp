var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');
exports.itemdetailsautocomplete=function(callback){
connection.query("SELECT UPPER(itemname) as itemname,itemid FROM m_item_details",function(err,rows){
    if(rows.length>0){
    // console.log(rows);
    return callback(rows);
    }
    else{
    return callback("reject");
    }
    });
}
