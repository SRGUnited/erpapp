var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');
exports.quantityidfetch=function(unitofmeasureidvalue,callback){
 connection.query("select unit_of_measure_name from m_unit_of_measure_detail where unit_of_measure_id='"+unitofmeasureidvalue+"'",function(err,rows){
<<<<<<< HEAD
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
=======
>>>>>>> 422fcccd05ab71a79fe2d66361b407aa43050709
   if(rows.length>0){
    //  console.log(rows);
      return callback(rows);
<<<<<<< HEAD
>>>>>>> 08defefa01ef3184a9449267b75fde9388f3fb47
>>>>>>> 94126fca815cb9bd1bdbb97bcc82f117484cedfc
=======
>>>>>>> 422fcccd05ab71a79fe2d66361b407aa43050709
  }
  else{
      return callback("reject");
  }
    });
}
