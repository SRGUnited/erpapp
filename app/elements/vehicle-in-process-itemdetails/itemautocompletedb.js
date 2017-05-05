var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');
var arr=[];
exports.itemdescriptionautocomplete=function(suppliername,supplierid,callback){
<<<<<<< HEAD
  connection.query("SELECT item_supplier_map.itemid ,UPPER(m_item_details.itemname) as itemname,m_item_details.containerid,m_item_details.unitofmeasures from m_item_details left join item_supplier_map on item_supplier_map.itemid=m_item_details.itemid where item_supplier_map.supplierid ='"+ supplierid +"'",function(err,rows){
 // console.log(rows);
=======
  connection.query(" SELECT item_supplier_map.itemid ,UPPER(m_item_details.itemname) as itemname,m_item_details.containerid,m_item_details.unitofmeasures from m_item_details left join item_supplier_map on item_supplier_map.itemid=m_item_details.itemid where item_supplier_map.supplierid ='"+ supplierid +"'",function(err,rows){
<<<<<<< HEAD
 console.log(rows);
// var i=2;
// console.log(JSON.stringify(getrows));
>>>>>>> 94126fca815cb9bd1bdbb97bcc82f117484cedfc
=======
 // console.log(rows);
>>>>>>> 422fcccd05ab71a79fe2d66361b407aa43050709
if(rows.length>0){

         return callback(rows);
       }
       else{
           return callback("reject");
       }
      });

}
