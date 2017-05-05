var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');
exports.testingfunction=function(field1,field2,targettablename,customerid,addressid,callback){
  var key1 = field1;
    var key2 = field2;
var json = {
    [key1]:customerid,
    [key2]:addressid
};
 // console.log(json);
// var field1={"field1":field1};
// var field2={"field2":field2};
 // console.log(JSON.stringify(field1));
 //  console.log(JSON.stringify(field2));

  // var testsaving={
  //   field1:customername,
  //   field2:"12"
  // };
//   var obj = {};
// obj['field1'] = field1;
// obj['field2'] = field2;
// console.log(JSON.stringify(obj));
  // console.log(JSON.stringify(testsaving));
var tablename=[targettablename];
connection.query(" INSERT INTO " +tablename[0]+ " SET ? ",[json],function(err,rows){
 // connection.query(" INSERT INTO " +tablename[0]+,'"+field1,field2+"', "values" '"+customername+"' ,[testsaving],function(err,rows){
// console.log(err);
    if(!err){

    return callback(rows);
    }
    else{
    return callback("reject");
    }
  });
}
