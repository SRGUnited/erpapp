var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');

exports.subcategoryautocomplete=function(categoryname,categoryid,callback){
connection.query("SELECT UPPER(subcategory_details.subcategory_id) as subcategory_id,UPPER(subcategory_details.subcategory_name) as subcategory_name FROM subcategory_details LEFT JOIN item_categories ON subcategory_details.subcategory_id = item_categories.subcategory_id where item_categories.category_id='"+ categoryid +"'",function(err,rows){
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
