var express    = require("express");
var mysql      = require('mysql');

var jsonfile=require('jsonfile');
// var customerfetchpath=[];
var customerfetchpath = "./app/elements/item-customerdetail/customerdesign.json";
// console.log(customerfetchpath);
exports.customerfetch=function(customerid,callback){
  console.log("customer id"+customerid);
  connection.query("select * from m_customerdetail where customerid='"+customerid+"'",function(err,rows){
console.log(rows);
  if(rows.length>0){
  jsonfile.writeFile(customerfetchpath,rows,function(err){

  })
    console.log(rows);
    return callback(rows);
}
else{
//  res.status(200).json({'returnval': "Data not found!"});
  return callback("reject");
}
});
//console.log("j");
}
