/**
 * Created by praba on 2/10/2016.
 */

var express    = require("express");
var mysql      = require('mysql');
var bodyParser = require('body-parser');



var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//Lodaing static files like elements from app folder
app.use(express.static('app'));

//Receiving get request from index.html to render the home page of the application
app.get('/' ,function (req, res) {
  res.sendFile( "app/index.html" );
});

global.connection=null;
app.post('/loadconnection' ,function (req, res) {
  console.log(req.query.dbhost);
  console.log(req.query.dbname);
  console.log(req.query.dbport);
  console.log(req.query.dbuser);
  console.log(req.query.dbpass);
  global.dbname=req.query.dbname;
  global.dbpass=req.query.dbpass;
  global.dbuser=req.query.dbuser;
  global.dbport=req.query.dbport;
  global.dbhost=req.query.dbhost;
  global.connection = mysql.createConnection({
  host     : req.query.dbhost,
  user     : req.query.dbuser,    /* username*/
  password : req.query.dbpass,   /* password*/
  database : req.query.dbname  /* db name*/
 });
  // console.log(connection);
 res.status(200).json({'returnval': "Connected"});
});

app.post('/insertitems', urlencodedParser, function (req, res) {
  var response={
  	Item_ID:req.query.id,
    Item_Name:req.query.name,
    Item_Description:req.query.description,
    Item_Container:req.query.container,
    Item_Unit:req.query.unit,
    Item_Type:req.query.type,
    Item_Group:req.query.group,
    Item_Purchase:req.query.purchase
  };
  	connection.query('INSERT INTO itemdetails_card SET ?',[response],function(err,result){
      console.log(response);
  	if(result.affectedRows>0)
      res.status(200).json({'returnval': "Saved!"});
    else
      res.status(200).json({'returnval': "Unable to save!"});
    });
});

app.post('/searchitem', urlencodedParser, function (req, res) {
  var response={
  	Item_ID:req.query.id
  };
  	connection.query('Select * FROM itemdetails_card WHERE ?',[response],function(err,rows){
  	if(rows.length>0)
      res.status(200).json({'returnval': rows});
    else{
      res.status(200).json({'returnval': "Data not found!"});
    }
    });
});

//Node server running port number
app.listen(4000);
