var express    = require("express");
var mysql      = require('mysql');

var jsonfile=require('jsonfile');

var file='/workshop template/app/elements/sales-person/data.json';
exports.insertsales=function(ccname,customerid,customerlocation,id,description,ispecification,rcoilsq,rtonq,rdqty,status,datetimeq1,callback){
  var response={
    // "salesorderdate":datetimeq,
    "customername":ccname,
    "customerid":customerid,
    "customerlocation":customerlocation,
    "itemid":id,
    // "itemname":name,
    "itemdescription":description,
    "itemspecification":ispecification,
    "containerquantity":rcoilsq,
    "orderquantity":rtonq,
    // "aquantity":raqty,
    "dquantity":rdqty,
    "status":status,
    "requireddeliverydate":datetimeq1
  };
  jsonfile.writeFile(file,response,function(err){
    if(!err){
      require('fs').readFile('/workshop template/app/elements/sales-person/data.json','utf8',function(err,jsondata){
        dbjsondata=JSON.parse(jsondata);
        connection.query('INSERT INTO salesordercreate SET ?',[dbjsondata],function(err){
          if(!err)
          console.log("saved");
          else {
            console.log(err);
            console.log("not saved");
          }
        });
      });
  }
  });
}
