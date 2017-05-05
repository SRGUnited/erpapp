var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');
exports.subcategoryitemsave=function(subcategory_id_back,dress_id_back,callback){
  var shopresponse={
    subcategory_id:subcategory_id_back,
    itemid:dress_id_back

  };
  // console.log(shopresponse);
 connection.query("INSERT INTO subcategory_item_mapping SET ?",[shopresponse],function(err,rows){
   if(rows.length>0){

      return callback("saved");
  }
  else{
      return callback("reject");
  }
    });
}
