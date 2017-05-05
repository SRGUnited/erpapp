var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');
var arr=[];
exports.itemdescriptionautocomplete=function(suppliername,supplierid,callback){
  connection.query("SELECT item_supplier_map.itemid ,UPPER(m_item_details.itemname) as itemname,m_item_details.containerid,m_item_details.unitofmeasures from m_item_details left join item_supplier_map on item_supplier_map.itemid=m_item_details.itemid where item_supplier_map.supplierid ='"+ supplierid +"'",function(err,rows){
 // console.log(rows);
if(rows.length>0){

         return callback(rows);
       }
       else{
           return callback("reject");
       }
      });

}
