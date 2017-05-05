var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');
exports.shopitemsaving=function(shop_id_back,dress_id_back,callback){
  var shopresponse={
    shop_id:shop_id_back,
    itemid:dress_id_back

  };
  // console.log(shopresponse);
 connection.query("INSERT INTO shop_item_mapping SET ?",[shopresponse],function(err,rows){
   if(!err){

      return callback("saved");
  }
  else{
      return callback("reject");
  }
    });
}
