var mysql=require('mysql');
var express=require('express');

var jsonfile   = require('jsonfile');
var item_details_directory='/polymer/erpapp/app/config/item_details.json';

var dbjson=[];
exports.getconnection=function(){
  require('fs').readFile('app/config/getconnection.json','utf8',function(err,data){
    dbjson=JSON.parse(data);
    exports.connectionvalues();
  });
}

var connection;
exports.connectionvalues=function(){
  connection=mysql.createConnection({
    host:dbjson[0].host,
    port:dbjson[0].port,
    user:dbjson[0].user,
    password:dbjson[0].password,
    database:dbjson[0].database
  });
  connection.connect(function(err){
    if(!err){
      console.log("Connected with database");
      // exports.login();
    }
    else {
      console.log("Failed to connect with database!");
    }
  });
}

exports.login=function(eid,epass,callback){
  // var response={
  //   emp_id:req.query.empid,
  //   password:req.query.password
  // };

  //console.log(eid);
  //console.log("connectdbid:"+eid);
  //console.log("connectdbpass:"+epass);
  	connection.query("SELECT * FROM test.emp_login where emp_id='"+eid+"' and password='"+epass+"'",function(err,rows){
  	if(rows.length>0){
    //  console.log("if");
      var roleid=rows[0].role_id;
      connection.query("select * from emp_login_menu where menu_id in(SELECT menu_id FROM test.menu_map where role_id='"+roleid+"')",function(err,rows){
        //console.log(rows);
        return callback(rows);
        //res.status(200).json({'returnval': rows});
      });
      }
    else{
    //  console.log("else");
      return callback("reject");
      //res.status(200).json({'returnval': "Invalid!"});
    }
    });
}

exports.insertitems=function(id,name,description,specification1,specification2,container,unit,group,type,status,ptype,callback){
//  console.log("cdb:"+id);
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
                // console.log("connectdb:"+JSON.stringify(response));
                callback = callback || function(){};
                jsonfile.writeFile(item_details_directory,response,function(err){
                  if(!err){
                    require('fs').readFile('/polymer/erpapp/app/config/item_details.json','utf8',function(err,jsondata){
                      dbjsondata=JSON.parse(jsondata);
                       connection.query('INSERT INTO m_item_details SET ?',[dbjsondata],function(err,result){});
                    });
                  // exports.writetodb();
                    return callback("saved!");
                  }
                  else
                    return callback("notsaved");
                })


  // connection.query('INSERT INTO itemdetails_card SET ?',[response],function(err,rows){
    //console.log("result"+result);
    //  console.error(err);
    // if(err) throw err;
    // if(rows.affectedRows>0){
      // return callback("saved!");
    // }
      // res.status(200).json({'returnval': "Saved!"});
      // jsonfile.writeFile(file,response,function(err){
            // })
  //  else{
    //  return callback("notsaved");
    // }
        // res.status(200).json({'returnval': "Unable to save!"});
    // });
}

// var dbjsondata=[];
// exports.writetodb=function(){
//   require('fs').readFile('/polymer/erpapp/app/config/item_details.json','utf8',function(err,jsondata){
//     dbjsondata=JSON.parse(jsondata);
//      connection.query('INSERT INTO m_item_details SET ?',[dbjsondata],function(err,result){});
//   });
// }

// var dbjsondata=[];

exports.searchitem=function(id,callback){
  var response={
  	"itemid":id
  };
    callback = callback || function(){};
  	connection.query('Select * FROM m_item_details WHERE ?',[response],function(err,rows){
  	if(rows.length>0)
      return callback(rows);
      // res.status(200).json({'returnval': rows});
    else
      return callback("no data");
      // res.status(200).json({'returnval': "Data not found!"});

    });
}
