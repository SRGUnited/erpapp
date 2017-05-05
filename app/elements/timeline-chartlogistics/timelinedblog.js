var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');

  var timelinefetchpath=[];
  var timelinefetchpath = "./app/elements/timeline-chartlogistics/timelinedesignlog.json";
  exports.timelinefetch=function(salesid,itemssid,callback){
    connection.query("select * from goodsvehiclestatustracking where goodsvehiclenumber in(SELECT goodsvehiclenumber FROM vehiclesalesordermapping where salesorderid='"+salesid+"')",function(err,rows){
    if(rows.length>0){
      jsonfile.writeFile(timelinefetchpath,rows,function(err){
    })
      return callback(rows);
    }
    else{
      return callback("reject");
    }
      });
  }

// update timeline query
exports.updatevehicle=function(x,y,vehicleno,callback){
  var response={
    "loadstart":x,
    "loadend":y
  };
    console.log("fdsggfdgfdggdfhshfdjgj");
    console.log("update goodsvehiclestatustracking set loadstart='"+x+"' where goodsvehiclenumber='"+vehicleno+"'");
        connection.query("update goodsvehiclestatustracking set loadstart='"+x+"' where goodsvehiclenumber='"+vehicleno+"'",[response],function(err){
          if(!err)
          console.log("saved");
          else {
            console.log(err);
            console.log("not saved");
          }
        });

  }


  exports.updatevehicleend=function(x,y,vehicleno,callback){
    var update={
      "loadstart":x,
      "loadend":y
      };
      console.log("update goodsvehiclestatustracking set loadend='"+y+"' where goodsvehiclenumber='"+vehicleno+"'");
          connection.query("update goodsvehiclestatustracking set loadend='"+y+"' where goodsvehiclenumber='"+vehicleno+"'",[update],function(err){
            if(!err)
            console.log("saved");
            else {
              console.log(err);
              console.log("not saved");
            }
          });

    }
