var express    = require('express');
var mysql      = require('mysql');
var jsonfile   = require('jsonfile');
var sales_person_directory='./app/elements/sales-order/sales-order.json';

exports.insertsales=function(salesid,datetimeq,customerid,id,itemname,description,ispecification,rcoilsq,rtonq,rdqty,datetimeq1,status,callback){
  var response={
    "salesorderid":salesid,
    "salesorderdate":datetimeq,
    "customerid":customerid,
    "itemid":id,
    "itemname":itemname,
    "itemdescription":description,
    "itemspecification":ispecification,
    "containerquantity":rcoilsq,
    "orderquantity":rtonq,
    "deliveredquantity":rdqty,
    "requireddeliverydate":datetimeq1,
    "status":status
  };
  jsonfile.writeFile(sales_person_directory,response,function(err){
    console.log("wrres"+JSON.stringify(response));

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
