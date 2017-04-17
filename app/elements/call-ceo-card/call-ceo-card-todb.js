var express    = require('express');
var mysql      = require('mysql');
var jsonfile   = require('jsonfile');
var app = express();
var item_approval_write='/polymer/erpapp/app/elements/call-ceo-card/item_approval_write.json';
exports.searchitem=function(callback){
  connection.query("select * from m_item_details where status='Created'",function(err,rows){
  	if(rows.length>0){
      connection.query("select * from finishedgoods_itemtype where status='Created'",function(err,fgrows){
        return callback(rows,fgrows);
      });
    }
    else{
      return callback("No data!");
    }
    });
}

exports.ceoresponse=function(respond,id,callback){
// Other than finished goods
  connection.query('update m_item_details set status="'+respond+'" where itemid="'+id+'"',function(err,rows){

  })
// For finished Goods
  connection.query('update finishedgoods_itemtype set status="'+respond+'" where itemid="'+id+'"',function(err,rows){

  })
}
