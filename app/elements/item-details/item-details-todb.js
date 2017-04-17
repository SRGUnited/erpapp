var express    = require('express');
var mysql      = require('mysql');

exports.insertitems=function(sid,id,name,description,specification1,specification2,container,unit,group,type,status,ptype,ceostatus,callback){
  var response={"itemid":id,
                "itemname":name,
                "itemdescription":description,
                "itemspecification1":specification1,
                "itemspecification2":specification2,
                "containerid":container,
                "unitofmeasures":unit,
                "itemgroup":group,
                "itemtypeid":type,
                "itemstatus":status,
                "itempurchasetype":ptype,
                "status":ceostatus
                };
  // var supid={"supplierid":sid,
  //            "itemid":id};
  //  connection.query('INSERT INTO item_supplier_map SET ?',[supid],function(err){});
  if(type=="FG"){
   connection.query('INSERT INTO finishedgoods_itemtype SET ?',[response],function(err){
     if(!err)
       return callback("saved!");
     else{
       console.log(err);
       return callback("Not Saved");
     }
   });
 }
 else{
   connection.query('INSERT INTO m_item_details SET ?',[response],function(err){
     if(!err)
       return callback("saved!");
     else{
       console.log(err);
       return callback("Not Saved");
     }
   });
 }
}

exports.searchitem=function(name,callback){
  // var response={
  // 	"itemname":name
  // };
  // var array=[];
    // connection.query("select * from m_item_details where itemid='"+id+"'",function(err,rows){});
    // console.log(rows);
    connection.query("select * from m_item_details where itemname='"+name+"'",function(err,rows){
      if(rows.length>0)
        return callback(rows);
      else{
        connection.query("select * from finishedgoods_itemtype where itemname='"+name+"'",function(err,rows1){
          console.log(rows1);
          return callback(rows1);
        })
      }
    });
    // connection.query("select suppliername from m_supplierdetails where supplierid in(SELECT supplierid FROM item_supplier_map where itemid='"+id+"')",function(err,rows){
  	// if(rows.length>0)
    //   return callback(rows);
    // else
    //   return callback("no data");
    // });
}
