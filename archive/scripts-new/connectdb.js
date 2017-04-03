var mysql=require('mysql');
var express=require('express');

var jsonfile   = require('jsonfile');
var file='/tmp1/data.json';

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

exports.insertitems=function(id,name,description,container,unit,type,group,purchase,callback){
//  console.log("cdb:"+id);
  var response={"Item_ID":id,
                "Item_Name":name,
                "Item_Description":description,
                "Item_Container":container,
                "Item_Unit":unit,
                "Item_Type":type,
                "Item_Group":group,
                "Item_Purchase":purchase
                };
                // console.log("connectdb:"+JSON.stringify(response));
                callback = callback || function(){};
                jsonfile.writeFile(file,response,function(err){
                  if(!err){
                  exports.writetodb();
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

var dbjsondata=[];
exports.writetodb=function(){
  require('fs').readFile('/tmp1/data.json','utf8',function(err,jsondata){
    dbjsondata=JSON.parse(jsondata);
    // console.log("writetodb!!!!!"+JSON.stringify(dbjsondata));
    exports.jsontodb(dbjsondata);
  });
}

// var dbjsondata=[];
exports.jsontodb=function(dbjsondata){
  // console.log("jsontodb****"+JSON.stringify(dbjsondata));
    var jresponse={"Item_ID":dbjsondata.Item_ID,
                  "Item_Name":dbjsondata.Item_Name,
                  "Item_Description":dbjsondata.Item_Description,
                  "Item_Container":dbjsondata.Item_Container,
                  "Item_Unit":dbjsondata.Item_Unit,
                  "Item_Type":dbjsondata.Item_Type,
                  "Item_Group":dbjsondata.Item_Group,
                  "Item_Purchase":dbjsondata.Item_Purchase
              };
              // console.log(response);
              connection.query('INSERT INTO itemdetails_card SET ?',[jresponse],function(err,result){
                // if(result.affectedRows>0){
                //   console.log("no err");
                // }
                // else {
                //   console.log(err);
                // }
              });
}

exports.searchitem=function(id,callback){
  var response={
  	"Item_ID":id
  };
  	connection.query('Select * FROM itemdetails_card WHERE ?',[response],function(err,rows){
  	if(rows.length>0)
      return callback(rows);
      // res.status(200).json({'returnval': rows});
    else
      return callback("no data");
      // res.status(200).json({'returnval': "Data not found!"});

    });
}
