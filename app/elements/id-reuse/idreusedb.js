var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');
// var itemid="it";
// var brand_id="re";

exports.idsaving=function(idvalue1,idvalue2,tbname,callback){
  var iddbresponse={
    itemid:idvalue1,
    brand_id:idvalue2
  };
 var tablename=[tbname];
connection.query(" INSERT INTO " +tablename[0]+ " SET ? ",[iddbresponse],function(err,rows){
  // console.log(err);
if(!err){
                    return callback("saved");
                  }
                    else
                  {
                        return callback("reject");
                  }
      });

}
