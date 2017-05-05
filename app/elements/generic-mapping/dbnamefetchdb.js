var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');
exports.dbnamefetch=function(dbtoken,customerid,addressid,callback){
connection.query("select field1,field2,target_tablename  from generic_mapping where target_tablename='"+dbtoken+"'",function(err,rows){

console.log(JSON.stringify(rows));
      var targettablename=rows[0].target_tablename;
      var key1 = rows[0].field1;
      var key2 =rows[0].field2;
        var json = {
        [key1]:customerid,
        [key2]:addressid
      };
      var tablename=[targettablename];
  if(rows.length>0){
    connection.query(" INSERT INTO " +tablename[0]+ " SET ? ",[json],function(err,rows2){
return callback(rows2);
      });
// console.log(JSON.stringify(rows2));

    // return callback(rows);
    }
    else{
    return callback("reject");
    }
  });
}
