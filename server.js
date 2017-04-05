var express    = require("express");
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var jsonfile   = require('jsonfile');

var fetchpath=[];
var fetchpath = "./app/config/fetch.json";

var file='/tmp1/data.json';

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var connection;
  require('fs').readFile('/polymer/erpapp-current/app/config/getconnection.json','utf8',function(err,data){
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
  	global.connection.query("SELECT * FROM test.emp_login where emp_id='"+req.query.empid+"' and password='"+req.query.password+"'",function(err,rows){
  	if(rows.length>0){
      var roleid=rows[0].role_id;
    global.connection.query("select * from emp_login_menu where menu_id in(SELECT menu_id FROM test.menu_map where role_id='"+roleid+"')",function(err,rows){
        res.status(200).json({'returnval': rows});
      });
      }
    else{
      res.status(200).json({'returnval': "Invalid!"});
    }
    });
});

var salessummarydb=require("./app/elements/salesorder-summary/salessummarydb.js");
salessummarydb.getconnection();
app.get('/fetch', urlencodedParser, function (req, res) {
salessummarydb.fetch(function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});

var vehiclesummarydb=require("./app/elements/vehicleorder-summary/vehiclesummarydb.js");
vehiclesummarydb.getconnection();
app.post('/vehiclefetch', urlencodedParser, function (req, res) {
  vehiclesummarydb.vehiclefetch(function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});

var itemdesigndb=require("./app/elements/all-design/itemdesigndb.js");
itemdesigndb.getconnection();
app.post('/itemfetch', urlencodedParser, function (req, res) {
  itemdesigndb.itemfetch(function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});

var customerdesigndb=require("./app/elements/all-design/customerdesigndb.js");
customerdesigndb.getconnection();
app.post('/customerfetch', urlencodedParser, function (req, res) {
  customerdesigndb.customerfetch(function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});

var timelinedb=require("./app/elements/timeline-chart/timelinedb.js");
timelinedb.getconnection();
app.post('/timelinefetch', urlencodedParser, function (req, res) {
  timelinedb.timelinefetch(function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});


var itemdetailsdb=require("./app/elements/item-details/item-details-todb.js");
app.post('/insertitems', urlencodedParser, function (req, res) { //add items save process
  itemdetailsdb.insertitems(req.query.id,req.query.name,req.query.description,req.query.specification1,req.query.specification2,req.query.container,req.query.unit,req.query.group,req.query.type,req.query.status,req.query.ptype,function(callback){
    if(callback=="saved!"){
      res.status(200).json({'returnval': "Saved!"});
    }
    else{
      res.status(200).json({'returnval': "Unable to save!"});
    }
  });
});

app.post('/searchitem', urlencodedParser, function (req, res) { //add item search process
  itemdetailsdb.searchitem(req.query.id,function(rows){
    if(rows!="no data")
      res.status(200).json({'returnval': rows});
    else
      res.status(200).json({'returnval': "Data not found!"});
  });
});


app.post('/insertsales', urlencodedParser, function (req, res) {
  connectdb.insertsales(req.query.datetimeq,req.query.rcoilsq,req.query.rtonq,req.query.status,req.query.datetimeq1,function(callback){
  })
});

app.listen(4000);
