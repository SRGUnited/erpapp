var express    = require("express");
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var jsonfile   = require('jsonfile');

var file='/tmp1/data.json';

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var connectdb=require("./app/script/connectdb.js");
connectdb.getconnection();

app.use(express.static('app'));

app.get('/' ,function (req, res) {
  res.sendFile( "app/index.html" );
});

app.post('/login', urlencodedParser, function (req, res) {
  var response={
    emp_id:req.query.empid,
    password:req.query.password
  };

  connectdb.login(req.query.empid,req.query.password,function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
  	// connection.query("SELECT * FROM test.emp_login where emp_id='"+req.query.empid+"' and password='"+req.query.password+"'",function(err,rows){
  	// if(rows.length>0){
    //   var roleid=rows[0].role_id;
    //   connection.query("select * from emp_login_menu where menu_id in(SELECT menu_id FROM test.menu_map where role_id='"+roleid+"')",function(err,rows){
    //   res.status(200).json({'returnval': rows});
    //     });
    //   }
    // else{
    //   console.log(err);
    //   res.status(200).json({'returnval': "Invalid!"});
    // }
    // });
});

app.post('/insertitems', urlencodedParser, function (req, res) {
  var response={
  	itemid:req.query.id,
    itemname:req.query.name,
    itemdescription:req.query.description,
    container:req.query.container,
    // Item_Unit:req.query.unit,
    // Item_Type:req.query.type,
    // Item_Group:req.query.group,
    status:req.query.purchase
  };
	connection.query('INSERT INTO test.m_itemdetail SET ?',[response],function(err,result){
    if(result.affectedRows>0)
      res.status(200).json({'returnval': "Saved!"});
      // jsonfile.writeFile(file,response,function(err){
      // console.error("Error:"+err)
            // })

    else
        res.status(200).json({'returnval': "Unable to save!"});
    });
});

app.post('/vehsavedata', urlencodedParser, function (req, res) {
  var response={
  	vehnoval:req.query.VehicleNoval,
    drivnameval:req.query.DriverNameval,
    drivmobnoval1:req.query.DriverMobNumberval1,
    drivmobnoval2:req.query.DriverMobNumberval2,
    ownmobnumberval:req.query.OwnMobNumberval,
    vehtimeval:req.query.Vehintimeval,
    vehtime2val:req.query.Vehoutimeval,
    vehdateval:req.query.Vehdateval
  };

	connection.query('INSERT INTO test.vehicle_table SET ?',[response],function(err,result){
    if(!err)
      res.status(200).json({'datavalue': "Saved!"});
      // jsonfile.writeFile(file,response,function(err){
      // console.error("Error:"+err)

    else
        res.status(200).json({'datavalue': "Unable to save!"});
    });
});


app.post('/insertsales', urlencodedParser, function (req, res) {
  var response={

    // Cust_name:req.query.ccname,
  	// Item_ID:req.query.id,
    // Item_Name:req.query.name,
    // Item_Spec:req.query.ispec,
    // Item_Description:req.query.description,
    salesorderdate:req.query.datetimeq,
    containerquantity:req.query.rcoilsq,
    orderquantity:req.query.rtonq,
    status:req.query.status,
    requiredeliverydate:req.query.datetimeq1




  };
  connectdb.insertsales();

  connectdb.insertsales(req.query.datetimeq,req.query.rcoilsq,req.query.rtonq,req.query.status,req.query.datetimeq1,function(callback){

  })
    // connection.query('INSERT INTO test.salesordercreate SET ?',[response],function(err,result){


    // if(result.affectedRows>0)
    // jsonfile.writeFile('../config/person.json', response, function (err) {
    //  console.error(err)
  //  })
  // res.status(200).json({'returnval': "Saved!"});



    // else
      // res.status(200).json({'returnval': "Unable to save!"});
    // });
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

// var connection=null;
// app.post('/loadconnection' ,function (req, res) {
//   dbname=req.query.dbname;
//   dbpass=req.query.dbpass;
//   dbuser=req.query.dbuser;
//   dbport=req.query.dbport;
//   dbhost=req.query.dbhost;
//   connection = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'admin',
//     database:'test'
//     });
//  res.status(200).json({'returnval': "Connected"});
// });

app.post('/savedata', urlencodedParser, function (req, res) {
  var response={
  	customername:req.query.snameval,
  	address1:req.query.adval1,
  	address2:req.query.drnoval,
    address3:req.query.stnameval,
    city:req.query.citynameval,
    state:req.query.stateval,
    // Pincode:req.query.pinval,
    mobile1:req.query.mobnumval,
    // Alias_Name:req.query.alinameval,
    // Address2:req.query.addval2,
    // Street_No:req.query.stnoval,
    // location:req.query.locval,
    // District:req.query.distval,
    mobile2:req.query.phnumval,
    email:req.query.emidval
  };
  // var connection = mysql.createConnection({
  //    host    : req.query.dbhost,
  //    user    : req.query.dbuser,
  //   password : req.query.dbpass,
  //    database: req.query.dbname
  //  });
  	connection.query(" INSERT INTO test.m_customerdetail SET ?",[response],function(err,result){
  	if(result.affectedRows>0)
      res.status(200).json({'datavalue': "Saved!"});
    else
      res.status(200).json({'datavalue': "Unable to save!"});
    });
});

app.post('/Taxsaveinfo', urlencodedParser, function (req, res) {
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

app.post('/searchtax', urlencodedParser, function (req, res) {
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

app.post('/saveexcise', urlencodedParser, function (req, res) {
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

app.post('/searchtax', urlencodedParser, function (req, res) {
  var response={
  	cexregno:req.query.value1
  };
  	connection.query('Select * FROM test.excise_card WHERE ?',[response],function(err,rows){
  	if(rows.length>0)
      res.status(200).json({'returnval': rows});
    else{
      res.status(200).json({'returnval': "Data not found!"});
    }
    });
});


app.listen(4000);
