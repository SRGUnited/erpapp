var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');
exports.categorysubcategorysaving=function(subcategory_id_back,category_id_back,callback){
  var shopresponse={
    subcategory_id:subcategory_id_back,
    category_id:category_id_back

  };
  // console.log(shopresponse);
 connection.query("INSERT INTO subcategory_category_mapping SET ?",[shopresponse],function(err,rows){
   if(!err){

      return callback("saved");
  }
  else{
      return callback("reject");
  }
    });
}
