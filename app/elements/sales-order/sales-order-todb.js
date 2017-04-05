var express    = require('express');
var mysql      = require('mysql');
var jsonfile   = require('jsonfile');
var sales_person_directory='./app/elements/sales-person/sales-person.json';

exports.insertsales=function(salesid,datetimeq,ccname,customerid,customerlocation,id,description,ispecification,rcoilsq,rtonq,rdqty,datetimeq1,status,callback){
  var response={
    "salesorderid":salesid,
    "salesorderdate":datetimeq,
    "customername":ccname,
    "customerid":customerid,
    "customerlocation":customerlocation,
    "itemid":id,
    "itemdescription":description,
    "itemspecification":ispecification,
    "containerquantity":rcoilsq,
    "orderquantity":rtonq,
    "deliveredquantity":rdqty,
    "requireddeliverydate":datetimeq1,
    "status":status
  };
  // console.log(response);
  jsonfile.writeFile(sales_person_directory,response,function(err){
    if(!err){
      require('fs').readFile(sales_person_directory,'utf8',function(err,jsondata){
        dbjsondata=JSON.parse(jsondata);
        console.log("jres"+JSON.stringify(dbjsondata));
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
