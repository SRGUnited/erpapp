var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');

exports.brandnameautocomplete=function(itemnameparam,itemidparam,callback){
  connection.query("SELECT UPPER(brand_detail.brand_id) as brand_id,UPPER(brand_detail.brand_name) as brand_name FROM brand_detail LEFT JOIN item_categories ON brand_detail.brand_id = item_categories.brand_id where item_categories.subcategory_id='"+itemidparam+"'",function(err,rows){
 // console.log(rows);
if(rows.length>0){
                    return callback(rows);
                  }
                    else
                  {
                        return callback("reject");
                  }
      });

}
