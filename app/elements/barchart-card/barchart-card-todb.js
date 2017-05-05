var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');
// var itemid1 = sessionStorage.getItem('itemid');
var barcharttablefetchpath=[];
var barcharttablefetchpath = "./app/elements/barchart-card/barchart.json";
  exports.barcharttablefetch=function(itemid,callback){
// console.log("barrritem"+itemid1);

  connection.query("SELECT materialinventory.itemavailablequantity,salesordercreate.orderquantity, salesordercreate.deliveredquantity from materialinventory inner join salesordercreate WHERE materialinventory.itemid & salesordercreate.itemid='"+ itemid +"' ",function(err,rows){
    if(rows.length>0){

        jsonfile.writeFile(barcharttablefetchpath,rows,function(err){
      })
      console.log("barrrrrrrr"+JSON.stringify(rows));
  }
    else{
      res.status(200).json({'returnval': "Data not found!"});
  }
});
}
