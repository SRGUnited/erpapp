var mysql=require('mysql');
var express=require('express');

var dbjson=[];
exports.getconnection=function(){
  require('fs').readFile('app/config/getconnection.json','utf8',function(err,data){
    dbjson=JSON.parse(data);
    exports.connnectionvalues();
  });
}

var connection;
exports.connnectionvalues=function(){
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
  connection.query('INSERT INTO itemdetails_card SET ?',[response],function(err,result){
    //console.log("result"+result);
    //  console.error(err);
    // if(err) throw err;
    if(result.affectedRows>0){
      return callback("saved!");
    }
      // res.status(200).json({'returnval': "Saved!"});
      // jsonfile.writeFile(file,response,function(err){
            // })
   else{
     return callback("notsaved");
    }
        // res.status(200).json({'returnval': "Unable to save!"});
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
