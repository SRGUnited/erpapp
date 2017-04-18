var express    = require("express");
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var jsonfile   = require('jsonfile');

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var connection;
var connectdb=require("./app/script/connectdb.js");
  require('fs').readFile('./app/config/getconnection.json','utf8',function(err,data){
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

/*var salespersondb=require("./app/elements/sales-person/sales-person-todb.js");
app.post('/insertsales', urlencodedParser, function (req, res) {
  salespersondb.insertsales(req.query.salesid,req.query.datetimeq,req.query.ccname,req.query.customerid,req.query.customerlocation,req.query.id,req.query.description,req.query.ispecification,req.query.rcoilsq,req.query.rtonq,req.query.rdqty,req.query.datetimeq1,req.query.status,function(callback){
    if(callback==saved)
    res.status(200).json({'returnval':"saved"});
    else {
    res.status(200).json({'returnval':"not saved"});
    }
  })
});
*/
/*var itemapprovaldb=require("./app/elements/call-ceo-card/call-ceo-card-todb.js")
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

var itemToAddSupplier=require("./app/elements/item-details/item-to-addsupplier.js");
app.post('/fixsupplier', urlencodedParser, function (req, res) {
  itemToAddSupplier.fixSupplier(req.query.item,req.query.supplier,function(callback){
    if(callback=="Supplier Added"){
      console.log("Supplier Added");
      res.status(200).json({'returnval': "Data found"});
    }
    else{
      console.log("Failed to add!");
      // res.status(200).json({'returnval': "Unable to save!"});
    }
  });
});
// slider server file
*/
var salessummarydb=require("./app/elements/salesorder-summary/salessummarydb.js");
// salessummarydb.getconnection();
app.get('/fetch', urlencodedParser, function (req, res) {
salessummarydb.fetch(function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});

var timelinedb=require("./app/elements/timeline-chart/timelinedb.js");
app.post('/timelinefetch', urlencodedParser, function (req, res) {
  timelinedb.timelinefetch(req.query.salesid,req.query.itemssid,function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});

var sliderfetchdb=require("./app/elements/slider-barnew/sliderdb.js");
app.post('/sliderchange', urlencodedParser,function (req, res) {
  console.log("sliderrows");
  sliderfetchdb.sliderchange(req.query.itemssid,function(rows,callback){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else{
      res.status(200).json({'returnval': "Invalid!"});
    }
  });
});
// vehicle     7777777777777777
app.post('/securityinfo', urlencodedParser, function (req, res) {
  connectdb.securityjsonsaveFn(req.query.invNum,req.query.saleid,req.query.invDate,req.query.delqunty,
    req.query.vehouttime,function(err,rows){
    if(rows="json writed"){
      // console.log("not reject");
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Json not writed"});
  });
  });

  app.post('/supplieritempostinfo', urlencodedParser, function (req,res) {
    var response={supplierid:req.query.supid,
                  itemid:req.query.itemid};
      connectdb.supplieritempostFn(response,function(rows){
        if(rows=="saved"){
          res.status(200).json({'returnval': rows});
        }
        else
          res.status(200).json({'returnval': "not saved"});
      });
      });
      app.post('/customeritempostinfo', urlencodedParser, function (req,res) {
        var response={customerid:req.query.supid,
                      itemid:req.query.itemid};
          connectdb.customeritempostFn(response,function(rows){
            if(rows=="saved"){
              res.status(200).json({'returnval': rows});
            }
            else
              res.status(200).json({'returnval': "not saved"});
          });
          });
      app.post('/searchsupplierid', urlencodedParser, function (req,res) {
        var response={supname:req.query.supname}
        connectdb.searchsupplieridFn(response,function(rows){
          if(rows!="not get"){
        if(rows.length>0){
          res.status(200).json({'returnval': rows});
              }
            }
        else
          res.status(200).json({'returnval': "does not get supplier details"});
          });
      });


      app.post('/searchcustomerid', urlencodedParser, function (req,res) {
        var response={supname:req.query.supname}
        connectdb.searchcustomeridFn(response,function(rows){
          if(rows!="not get"){
        if(rows.length>0){
          res.status(200).json({'returnval': rows});
              }
            }
        else
          res.status(200).json({'returnval': "does not get supplier details"});
          });
      });

// app.post('/getsupplierdata', urlencodedParser, function (req,res) {
//   connectdb.getsupplierdataFn(function(rows){
//     if(rows!="not get"){
//   if(rows.length>0){
//     res.status(200).json({'returnval': rows});
//         }
//       }
//   else
//     res.status(200).json({'returnval': "does not get supplier details"});
//     });
//  });
app.post('/loopsecuritysearchinfo', urlencodedParser, function (req,res) {
connectdb.loopsecuritysearchFn(req.query.salid,function(rows){
  if(rows!="reject"){
    res.status(200).json({'returnval': rows});
  }
  else
    res.status(200).json({'returnval': "does not get saleid"});
});
});
app.post('/supplieritem_map', urlencodedParser, function (req,res) {
  connectdb.supplieritem_mapFn(function(rows){
    if(rows.length>0){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "didn't get value"});
  });
  });
  app.post('/customeritem_map', urlencodedParser, function (req,res) {
    connectdb.customeritem_mapFn(function(rows){
      if(rows.length>0){
        res.status(200).json({'returnval': rows});
      }
      else
        res.status(200).json({'returnval': "didn't get value"});
    });
    });
app.post('/autosecuritysearchinfo', urlencodedParser, function (req,res) {
  connectdb.autosecuritysearchFn(function(rows){
    if(rows!="reject"){
      // console.log(rows);
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "does not get vehicleno"});
  });
  });
  app.post('/securitysearchinfo', urlencodedParser, function (req,res) {
    connectdb.securitysearchFn(req.query.searchvehiclenum,function(rows){
      if(rows!="reject"){
        // console.log(rows);
        res.status(200).json({'returnval': rows});
      }
      else
        res.status(200).json({'returnval': "does not get vehicel no"});
    });
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
connection.query('INSERT INTO m_itemdetail SET ?',[response],function(err,result){
  if(result.affectedRows>0)
    res.status(200).json({'returnval': "Saved!"});
    // jsonfile.writeFile(file,response,function(err){
    // console.error("Error:"+err)
          // })
  else
      res.status(200).json({'returnval': "Unable to save!"});
  });
});

app.post('/ceocustomerapprovalinfo', urlencodedParser, function (req, res) {
// console.log("ceo-customer-card");
var response={customerid:req.query.cuid,
              status:req.query.radio};
connectdb.ceocustomeapprovalFn(response,function(rows){
  if(rows!="reject"){
    res.status(200).json({'returnval': rows});
  }
  else
    res.status(200).json({'returnval': "customer table doesn't updated"});
});
});


app.post('/ceocustomerajaxinfo', urlencodedParser, function (req, res) {
// console.log("ceo-customer-card");
connectdb.ceocustomerajaxFn(function(rows){
  if(rows!="reject"){
    res.status(200).json({'returnval': rows});
  }
  else
    res.status(200).json({'returnval': "ceo-customer-card.json not created"});
});
});
app.post('/vehiclefetch', urlencodedParser, function (req, res) {
connectdb.vehiclefetch(function(rows){
  if(rows!="reject"){
    res.status(200).json({'returnval': rows});
  }
  else
    res.status(200).json({'returnval': "vehicle.json not created"});
});
});
app.post('/searchsalesorder', urlencodedParser, function (req, res) {
connectdb.searchsalesorderconncetdbFn(function(rows){
  if(rows!="reject"){
    // console.log(rows);
    res.status(200).json({'returnval': rows});
  }
  else
    res.status(200).json({'returnval': "Invalid salesordercreate id"});
});
});
// app.post('/autocomplete', urlencodedParser, function (req,res) {
//   // console.log("autocomplte");
//   	connection.query("select customerid from m_customerdetail",function(err,rows){
//   	if(!err)
//       res.status(200).json({'datavalue': rows});
//     else{
//       // console.log(err);
//       res.status(200).json({'datavalue': "autocomplete access"});
//     }
//     });
// });


// var vehiclepath=[];
// var vehiclepath = "./app/config/vehicle.json";
// app.post('/vehiclesummary',urlencodedParser,function (req, res) {
//
//     connection.query('Select * FROM vehicle_summary',function(err,rows){
//     if(rows.length>0){
//     res.status(200).json({'returnval': rows});
//
//     jsonfile.writeFile(vehiclepath,rows,function(err){
//
//     })
//   }
//   else{
//     res.status(200).json({'returnval': "Data not found!"});
//   }
//   });
// });



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

connection.query('INSERT INTO vehicle_table SET ?',[response],function(err,result){
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
// connectdb.insertsales();

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
  customerid:req.query.sidval,
  customername:req.query.snameval,
  address1:req.query.adval1,
  address2:req.query.adval2,
  address3:req.query.adval3,
  city:req.query.citynameval,
  state:req.query.stateVal,
  country:req.query.countryVal,
  pincode:req.query.pinval,
  mobile1:req.query.mobnumval1,
  mobile2:req.query.mobnumval2,
  email:req.query.emidval,
  status:req.query.statusval
};
connectdb.savecustomertdetFn(response,function(result){
  if(result=="saved"){
    res.status(200).json({'datavalue': "Saved!"});
  }
  else {
    res.status(200).json({'datavalue': "Saved!"});
  }
});
// var connection = mysql.createConnection({
//    host    : req.query.dbhost,
//    user    : req.query.dbuser,
//   password : req.query.dbpass,
//    database: req.query.dbname
//  });

});
app.post('/savesupplierdata', urlencodedParser, function (req, res) {
var response={
  supplierid:req.query.sidval,
  suppliername:req.query.snameval,
  address1:req.query.adval1,
  address2:req.query.adval2,
  address3:req.query.adval3,
  city:req.query.citynameval,
  state:req.query.stateVal,
  country:req.query.countryVal,
  pincode:req.query.pinval,
  mobile1:req.query.mobnumval1,
  mobile2:req.query.mobnumval2,
  email:req.query.emidval,
  status:req.query.statusval
};
console.log(response);
connectdb.savesupplierdetFn(response,function(result){
  if(result=="saved"){
    res.status(200).json({'datavalue': "Saved!"});
  }
  else {
    res.status(200).json({'datavalue': "Saved!"});
  }
});
// var connection = mysql.createConnection({
//    host    : req.query.dbhost,
//    user    : req.query.dbuser,
//   password : req.query.dbpass,
//    database: req.query.dbname
//  });

});

app.post('/Taxsaveinfo', urlencodedParser, function (req, res) {
var response={
  pan:req.query.pan_no,
  tann:req.query.tann_no,
  cin:req.query.cin_no,
  tin:req.query.tin_no,
  cst:req.query.cst_no
  };
connection.query('INSERT INTO tax_card SET ?',[response],function(err,result){
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
  connection.query('Select * FROM tax_card WHERE ?',[response],function(err,rows){
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
connection.query('INSERT INTO excise_card SET ?',[response],function(err,result){
  if(result.affectedRows>0)
    res.status(200).json({'returnval': "Saved!"});

  else
      res.status(200).json({'returnval': "Unable to save!"});
  });
});
app.post('/savesalesvehicleorder', urlencodedParser, function(req,res) {
var response={goodsvehiclenumber:req.query.vehno,
              salesorderid:req.query.salid
              };
  connectdb.savesalesorderconncetdbFn(response,function(data){
  if(rows="saved"){
    // console.log(data);
  res.status(200).json({'returnval': "data saved"});
}
  else{
    // console.log(err);
  res.status(200).json({'returnval': "data not saved"});
}
});
});

var autoGenerateID=require("./app/elements/autogen-id/autogen-id-todb.js");
app.post ('/autogenerateid', urlencodedParser, function (req, res) {
  autoGenerateID.generateId(function(retrievedData){
    if(retrievedData>=0)
      res.status(200).json({'returnid': retrievedData});
    else
      res.status(200).json({'returnid': "No ID to Generate!"});
  });
});

app.listen(4000);
