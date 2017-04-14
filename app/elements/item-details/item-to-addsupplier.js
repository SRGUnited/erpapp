var express    = require('express');
var mysql      = require('mysql');

exports.fixSupplier=function(itemname,suppliername,callback){
var x;
var y;
global.connection.query("select itemid from m_item_details where itemname='"+itemname+"'",function(err,itemid){
  global.x=itemid;
  global.connection.query("select supplierid from m_supplierdetails where suppliername='"+suppliername+"'",function(err,supplierid){
    global.y=supplierid;
    var z=[{"itemid":global.x[0].itemid,"supplierid":global.y[0].supplierid}];
    global.connection.query("insert into item_supplier_map set ?",z,function(err){
      if(!err){
        return callback("Supplier Added");
      }
      else {
        return callback("Failed to add!");
      }
    });
  });
});
}
