var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');

exports.dresscollectionautocomplete=function(itemnameparam,itemidparam,callback){
connection.query("SELECT UPPER(dress_details.itemid) as itemid,UPPER(dress_details.itemname) as itemname FROM dress_details LEFT JOIN item_categories ON dress_details.itemid = item_categories.itemid where item_categories.subcategory_id='"+itemidparam+"'",function(err,rows){
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
