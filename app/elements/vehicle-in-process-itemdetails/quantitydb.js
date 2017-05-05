var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');
exports.quantityidfetch=function(unitofmeasureidvalue,callback){
 connection.query("select unit_of_measure_name from m_unit_of_measure_detail where unit_of_measure_id='"+unitofmeasureidvalue+"'",function(err,rows){
<<<<<<< HEAD
   if(rows.length>0)
   {
    return callback(rows);
=======
<<<<<<< HEAD
   if(rows.length>0)
   {
    return callback(rows);
=======
   if(rows.length>0){
     console.log(rows);
      return callback(rows);
>>>>>>> 08defefa01ef3184a9449267b75fde9388f3fb47
>>>>>>> 94126fca815cb9bd1bdbb97bcc82f117484cedfc
  }
  else{
      return callback("reject");
  }
    });
}
