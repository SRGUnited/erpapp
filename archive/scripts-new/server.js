var express    = require("express");
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// var jsonfile   = require('jsonfile');
// var file='/tmp1/data.json';


app.use(express.static('app'));

app.get('/' ,function (req, res) {
  res.sendFile( "app/index.html" );
});

var connectdb=require("./app/script/connectdb.js");
connectdb.getconnection();

app.post('/login', urlencodedParser, function (req,res) {
  var response={
     emp_id:req.query.empid,
     password:req.query.password
   };

   //console.log("serverjs:"+req.query.empid);
   //console.log("serverjs:"+req.query.password);
   //return callback(JSON.stringify(response));
  connectdb.login(req.query.empid,req.query.password,function(rows){
    if(rows!="reject"){
    //  console.log("server:"+JSON.stringify(rows));
    //  console.log("server:"+JSON.stringify(rows));
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
    // if(getcallback=="reject")
    //   res.status(200).json({'returnval': "Invalid!"});
    // else
    // console.log("server:"+rows);
    //   res.status(200).json({'returnval': rows});
  });
  // var response={
  //   emp_id:req.query.empid,
  //   password:req.query.password
  // };
  // 	connection.query("SELECT * FROM test.emp_login where emp_id='"+req.query.empid+"' and password='"+req.query.password+"'",function(err,rows){
  // 	if(rows.length>0){
  //     var roleid=rows[0].role_id;
  //     connection.query("select * from emp_login_menu where menu_id in(SELECT menu_id FROM test.menu_map where role_id='"+roleid+"')",function(err,rows){
  //       res.status(200).json({'returnval': rows});
  //     });
  //     }
  //   else{
  //     console.log(err);
  //     res.status(200).json({'returnval': "Invalid!"});
  //   }
  //   });
});

app.post('/savedata', urlencodedParser, function (req, res) { //add supplier save process
  var response={
  	Supplier_Name:req.query.snameval,
  	Address1:req.query.adval1,
  	Door_No:req.query.drnoval,
    Street_Name:req.query.stnameval,
    City:req.query.citynameval,
    State:req.query.stateval,
    Pincode:req.query.pinval,
    Mobile_Number:req.query.mobnumval,
    Alias_Name:req.query.alinameval,
    Address2:req.query.addval2,
    Street_No:req.query.stnoval,
    location:req.query.locval,
    District:req.query.distval,
    Phone_Number:req.query.phnumval,
    Email_ID:req.query.emidval
  };
  var connection = mysql.createConnection({
     host    : req.query.dbhost,
     user    : req.query.dbuser,
    password : req.query.dbpass,
     database: req.query.dbname
   });
  	connection.query(" INSERT INTO "+req.query.dbtable+" SET ?",[response],function(err,result){
  	if(!err)
      res.status(200).json({'datavalue': "Saved!"});
    else
      res.status(200).json({'datavalue': "Unable to save!"});
    });
});

app.post('/Taxsaveinfo', urlencodedParser, function (req, res) { //tax details save process
  var response={
  	pan:req.query.pan_no,
    tann:req.query.tann_no,
    cin:req.query.cin_no,
    tin:req.query.tin_no,
    cst:req.query.cst_no
    };
	connection.query('INSERT INTO test.tax_card SET ?',[response],function(err,result){
    if(result.affectedRows>0)
      res.status(200).json({'returnval': "Saved!"});

    else
        res.status(200).json({'returnval': "Unable to save!"});
    });
});

app.post('/searchtax', urlencodedParser, function (req, res) { //tax details search process
  var response={
  	pan:req.query.pan_no
  };
  	connection.query('Select * FROM test.tax_card WHERE ?',[response],function(err,rows){
  	if(rows.length>0)
      res.status(200).json({'returnval': rows});
    else{
      res.status(200).json({'returnval': "Data not found!"});
    }
    });
});

app.post('/saveexcise', urlencodedParser, function (req, res) { //excise details save process
  var response={
  	cexregno:req.query.value1,
    eccno:req.query.value2,
    range:req.query.value3,
    division:req.query.value4,
    excise_cardcol:req.query.value5,
    servicetaxno:req.query.value6
    };
	connection.query('INSERT INTO test.excise_card SET ?',[response],function(err,result){
    if(result.affectedRows>0)
      res.status(200).json({'returnval': "Saved!"});

    else
        res.status(200).json({'returnval': "Unable to save!"});
    });
});


app.post('/insertitems', urlencodedParser, function (req, res) { //add items save process
// console.log("serverjs:"+response);
  // var response={
  // 	Item_ID:req.query.id,
  //   Item_Name:req.query.name,
  //   Item_Description:req.query.description,
  //   Item_Container:req.query.container,
  //   Item_Unit:req.query.unit,
  //   Item_Type:req.query.type,
  //   Item_Group:req.query.group,
  //   Item_Purchase:req.query.purchase
  // };
  connectdb.insertitems();
  // console.log(req.query.id);
// console.log("serverjs:"+response);
  connectdb.insertitems(req.query.id,req.query.name,req.query.description,req.query.container,req.query.unit,req.query.type,req.query.group,req.query.purchase,function(callback){
      if(callback=="saved!"){
        res.status(200).json({'returnval': "Saved!"});
        // jsonfile.writeFile(file,response,function(err){})
      }
      else{
        res.status(200).json({'returnval': "Unable to save!"});
      }
      });
	// connection.query('INSERT INTO itemdetails_card SET ?',[response],function(err,result){
  //   if(result.affectedRows>0) {
  //     res.status(200).json({'returnval': "Saved!"});
  //     jsonfile.writeFile(file,response,function(err){
  //           })
  //       }
  //   else
  //       res.status(200).json({'returnval': "Unable to save!"});
  //   });
});

app.post('/searchitem', urlencodedParser, function (req, res) { //add item search process
  connectdb.searchitem();

  connectdb.searchitem(req.query.id,function(rows){
    if(rows!="no data")
      res.status(200).json({'returnval': rows});
    else
      res.status(200).json({'returnval': "Data not found!"});
  });
  // var response={
  // 	Item_ID:req.query.id
  // };
  // 	connection.query('Select * FROM itemdetails_card WHERE ?',[response],function(err,rows){
  // 	if(rows.length>0)
  //     res.status(200).json({'returnval': rows});
  //   else{
  //     res.status(200).json({'returnval': "Data not found!"});
  //   }
  //   });
});

app.listen(4000);
