var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');
exports.itembrandsave=function(brand_id_back,dress_id_back,callback){
  var shopresponse={
    brand_id:brand_id_back,
    itemid:dress_id_back

  };
  // console.log(shopresponse);
 connection.query("INSERT INTO item_brand_mapping SET ?",[shopresponse],function(err,rows){
   if(!err){

      return callback("saved");
  }
  else{
    
      return callback("reject");

  }
    });
}
