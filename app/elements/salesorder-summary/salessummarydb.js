var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');

exports.fetch=function(callback){
connection.query("SELECT salesordercreate.salesorderid,salesordercreate.salesorderdate,salesordercreate.customerid,salesordercreate.customerlocation,salesordercreate.itemid,salesordercreate.containerquantity,salesordercreate.orderquantity,salesordercreate.requireddeliverydate,salesordercreate.status,salesordercreate.deliveredquantity,m_customerdetail.customername FROM salesordercreate INNER JOIN m_customerdetail WHERE salesordercreate.customerid=m_customerdetail.customerid",function(err,rows){
  if(rows.length>0){
 //console.log(rows);
    return callback(rows);
}
else{
  return callback("reject");
}
});
}
