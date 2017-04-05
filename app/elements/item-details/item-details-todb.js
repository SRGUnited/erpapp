var express    = require('express');
var mysql      = require('mysql');
var jsonfile   = require('jsonfile');
var app = express();

var item_details_directory='/polymer/erpapp-current/app/elements/item-details/item_details.json';

exports.insertitems=function(id,name,description,specification1,specification2,container,unit,group,type,status,ptype,callback){
  var response={"itemid":id,
                "itemname":name,
                "itemdescription":description,
                "itemspecification1":specification1,
                "itemspecification2":specification2,
                "itemcontainer":container,
                "unitofmeasures":unit,
                "itemgroup":group,
                "itemtype":type,
                "itemstatus":status,
                "itempurchasetype":ptype
                };
  jsonfile.writeFile(item_details_directory,response,function(err){
    if(!err){
      require('fs').readFile(item_details_directory,'utf8',function(err,jsondata){
        dbjsondata=JSON.parse(jsondata);
        connection.query('INSERT INTO m_item_details SET ?',[dbjsondata],function(err){
          if(!err)
            return callback("saved!");
          else
            return callback("Not Saved");
        });
       });
      
      }
    else
      return callback("notsaved");
    })
}

exports.searchitem=function(id,callback){
  var response={
  	"itemid":id
  };
  	connection.query('Select * FROM m_item_details WHERE ?',[response],function(err,rows){
  	if(rows.length>0)
      return callback(rows);
    else
      return callback("no data");
    });
}
