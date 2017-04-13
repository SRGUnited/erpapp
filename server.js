var express    = require("express");
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var jsonfile   = require('jsonfile');

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var connection;
  require('fs').readFile('/polymer/erpapp/app/config/getconnection.json','utf8',function(err,data){
    dbjson=JSON.parse(data);
    global.connection=mysql.createConnection({
      host:dbjson[0].host,
      port:dbjson[0].port,
      user:dbjson[0].user,
      password:dbjson[0].password,
      database:dbjson[0].database
    });
    global.connection.connect(function(err){
      if(!err){
        console.log("Connected with database");
      }
      else {
        console.log("Failed to connect with database!");
      }
    });
  });

app.use(express.static('app'));

app.get('/' ,function (req, res) {
  res.sendFile( "app/index.html" );
});

app.post('/login', urlencodedParser, function (req, res) {
  var response={
    emp_id:req.query.empid,
    password:req.query.password
  };
  	global.connection.query("SELECT * FROM emp_login where emp_id='"+req.query.empid+"' and password='"+req.query.password+"'",function(err,rows){
  	if(rows.length>0){
      var roleid=rows[0].role_id;
    global.connection.query("select * from emp_login_menu where menu_id in(SELECT menu_id FROM menu_map where role_id='"+roleid+"')",function(err,rows){
        res.status(200).json({'returnval': rows});
      });
      }
    else{
      res.status(200).json({'returnval': "Invalid!"});
    }
    });
});

var itemdetailsdb=require("./app/elements/item-details/item-details-todb.js");
app.post('/insertitems', urlencodedParser, function (req, res) { //add items save process
  itemdetailsdb.insertitems(req.query.sid,req.query.id,req.query.name,req.query.description,req.query.specification1,req.query.specification2,req.query.container,req.query.unit,req.query.group,req.query.type,req.query.status,req.query.ptype,req.query.iprice,req.query.ceostatus,function(callback){
    if(callback=="saved!"){
      res.status(200).json({'returnval': "Saved!"});
    }
    else{
      res.status(200).json({'returnval': "Unable to save!"});
    }
  });
});

app.post('/searchitem', urlencodedParser, function (req, res) { //add item search process
  itemdetailsdb.searchitem(req.query.name,function(callback){
    // console.log("callback"+JSON.stringify(callback));
    if(callback!=null)
      res.status(200).json({'returnval':callback});
    else
      res.status(200).json({'returnval':"No Data"});
  });
});

var salespersondb=require("./app/elements/sales-person/sales-person-todb.js");
app.post('/insertsales', urlencodedParser, function (req, res) {
  salespersondb.insertsales(req.query.salesid,req.query.datetimeq,req.query.ccname,req.query.customerid,req.query.customerlocation,req.query.id,req.query.description,req.query.ispecification,req.query.rcoilsq,req.query.rtonq,req.query.rdqty,req.query.datetimeq1,req.query.status,function(callback){
    if(callback==saved)
    res.status(200).json({'returnval':"saved"});
    else {
    res.status(200).json({'returnval':"not saved"});
    }
  })
});

var itemapprovaldb=require("./app/elements/call-ceo-card/call-ceo-card-todb.js")
app.post('/ceoitemsearch', urlencodedParser, function (req, res) { //add item search process
  itemapprovaldb.searchitem(function(callback){
    if(callback=="Data found"){
      console.log("Written in json");
      res.status(200).json({'returnval': "Data found"});
    }
    else{
      console.log("Can't write in json!");
      // res.status(200).json({'returnval': "Unable to save!"});
    }
  });
});

app.post('/ceoresponse', urlencodedParser, function (req, res) { //add item search process
  console.log(req.query.respond);
  itemapprovaldb.ceoresponse(req.query.respond,req.query.itemid,function(callback){
    if(callback=="Data found"){
      console.log("Written in json");
      res.status(200).json({'returnval': "Data found"});
    }
    else{
      console.log("Can't write in json!");
      // res.status(200).json({'returnval': "Unable to save!"});
    }
  });
});

app.post('/mapitem', urlencodedParser, function (req, res) { //add item search process
  global.connection.query("SELECT itemname FROM m_item_details",function(err,rows){
    console.log("itemname"+JSON.stringify(rows));
  if(rows.length>0)
  res.status(200).json({'returnval': rows});
  else
    res.status(200).json({'returnval': "Invalid!"});
  });
});

app.post('/mapsupplier', urlencodedParser, function (req, res) { //add item search process
  global.connection.query("SELECT suppliername FROM m_supplierdetails",function(err,rows){
    console.log("supname"+JSON.stringify(rows));
  if(rows.length>0)
  res.status(200).json({'returnval': rows});
  else
    res.status(200).json({'returnval': "Invalid!"});
  });
});

app.post('/fixsupplier', urlencodedParser, function (req, res) {
    global.connection.query("",function(err,supid){});
});

app.listen(4000);
