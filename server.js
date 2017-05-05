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
// console.log("Welcome!!!");
//login-card
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

//**********************************ITEM DETAILS PROCESSES
//add items save process
var itemdetailsdb=require("./app/elements/item-details/item-details-todb.js");
app.post('/insertitems', urlencodedParser, function (req, res) { //add items save process
  itemdetailsdb.insertitems(req.query.sid,req.query.id,req.query.name,req.query.description,req.query.specification1,req.query.specification2,req.query.container,req.query.unit,req.query.group,req.query.type,req.query.status,req.query.ptype,req.query.ceostatus,function(callback){
    if(callback=="saved!"){
      res.status(200).json({'returnval': "Saved!"});
    }
    else{
      res.status(200).json({'returnval': "Unable to save!"});
    }
  });
});
//add item search process
app.post('/searchitem', urlencodedParser, function (req, res) { //add item search process
  itemdetailsdb.searchitem(req.query.name,function(itemdetails,suppliers){
    if(itemdetails||suppliers!=null)
      res.status(200).json({'returnval':itemdetails,'returnval1':suppliers});
    else
      res.status(200).json({'returnval':"No Data"});
  });
});
//*********************************END

//*********************************CEO APPROVAL PROCESSES
var itemapprovaldb=require("./app/elements/call-ceo-card/call-ceo-card-todb.js")
app.post('/ceoitemsearch', urlencodedParser, function (req, res) {
  itemapprovaldb.searchitem(function(callback,fgrows){ // Other than Finished Goods
    if(callback||fgrows!=null){
      res.status(200).json({'returnval': callback,'returnfg': fgrows});
    }
    else{
      res.status(200).json({'returnval': "No Data"});
    }
  });
});

app.post('/ceoresponse', urlencodedParser, function (req, res) {
  itemapprovaldb.ceoresponse(req.query.respond,req.query.itemid,req.query.itemtype,function(callback){
    if(callback=="Updated"){
      res.status(200).json({'returnval': "Updated"});
    }
    else{
      res.status(200).json({'returnval': "Not Updated!"});
    }
  });
});
//********************************END

//********************************ITEM TO SUPPLIER MAPPING
var mapItemsDB=require("./app/elements/item-details/map-items-todb.js");
app.post('/mapitem', urlencodedParser, function (req, res) {
  mapItemsDB.mapitem(function(callback){
    if(callback!=null){
      res.status(200).json({'returnval': callback});
    }
    else{
      res.status(200).json({'returnval': "Invalid!"});
    }
  })
});

app.post('/mapsupplier', urlencodedParser, function (req, res) {
  mapItemsDB.mapsupplier(function(callback){
    if(callback!=null){
      res.status(200).json({'returnval': callback});
    }
    else{
      res.status(200).json({'returnval': "Invalid!"});
    }
  })
});

var itemToAddSupplier=require("./app/elements/item-details/item-to-addsupplier.js");
app.post ('/fixsupplier', urlencodedParser, function (req, res) {
  itemToAddSupplier.fixSupplier(req.query.item,req.query.supplier,req.query.pricing,req.query.date,function(callback){
    if(callback=="Supplier Added"){
      res.status(200).json({'returnval': "Supplier Added"});
    }
    else{
      res.status(200).json({'returnval': "Failed to add!"});
    }
  });
});
//*******************************END

//salessummary
var salessummarydb=require("./app/elements/salesorder-summary/salessummarydb.js");
app.post('/fetch', urlencodedParser, function (req, res) {
salessummarydb.fetch(function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});

//timelinechart
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

//sliderbar
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

// vehicle securitycard
app.post('/securityinfo', urlencodedParser, function (req, res) {
  connectdb.securityjsonsaveFn(req.query.invNum,req.query.saleid,req.query.invDate,req.query.delqunty,
    req.query.vehouttime,function(err,rows){
    if(rows="json writed"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Json not writed"});
  });
  });

//supplier item
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

  //customer item
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

  //searchsupplier
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
        app.post ('/autogenerateid', urlencodedParser, function (req, res) {
          connectdb.generateIdFn(function(retrievedData){
            if(retrievedData>=0)
              res.status(200).json({'returnid': retrievedData});
            else
              res.status(200).json({'returnid': "No ID to Generate!"});
          });
        });
//searchcustomer
app.post('/searchcustomerid', urlencodedParser, function (req,res) {
          var response={supname:req.query.supname}
          connectdb.searchcustomeridFn(response,function(rows){
            if(rows!="not get"){
          if(rows.length>0){
            res.status(200).json({'returnval': rows});
                }
              }
          else
            res.status(200).json({'returnval': "please enter valid customername"});
            });
        });

//security search
app.post('/loopsecuritysearchinfo', urlencodedParser, function (req,res) {
connectdb.loopsecuritysearchFn(req.query.salid,function(rows){
  if(rows!="reject"){
    res.status(200).json({'returnval': rows});
  }
  else
    res.status(200).json({'returnval': "does not get saleid"});
});
});

// supplier item mapping
app.post('/supplieritem_map', urlencodedParser, function (req,res) {
  connectdb.supplieritem_mapFn(function(rows){
    if(rows.length>0){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "didn't get value"});
  });
  });

  //customer item mapping
  app.post('/customeritem_map', urlencodedParser, function (req,res) {
    connectdb.customeritem_mapFn(function(rows){
      if(rows.length>0){
        res.status(200).json({'returnval': rows});
      }
      else
        res.status(200).json({'returnval': "didn't get value"});
    });
    });

    //auto security search
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

  //security search
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

//CEO customer

app.post('/ceocustomerapprovalinfo', urlencodedParser, function (req, res) {
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
connectdb.ceocustomerajaxFn(function(rows){
  if(rows!="reject"){
    res.status(200).json({'returnval': rows});
  }
  else
    res.status(200).json({'returnval': "ceo-customer-card.json not created"});
});
});

//vehicle fetch
app.post('/vehiclefetch', urlencodedParser, function (req, res) {
connectdb.vehiclefetch(function(rows){
  if(rows!="reject"){
    res.status(200).json({'returnval': rows});
  }
  else
    res.status(200).json({'returnval': "vehicle.json not created"});
});
});

//search sales order
app.post('/searchsalesorder', urlencodedParser, function (req, res) {
connectdb.searchsalesorderconncetdbFn(function(rows){
  if(rows!="reject"){
    res.status(200).json({'returnval': rows});
  }
  else
    res.status(200).json({'returnval': "Invalid salesordercreate id"});
});
});

//vehicle IN
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
  else
    res.status(200).json({'datavalue': "Unable to save!"});
  });
});

// customer data
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
});
//supplier data
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
  connectdb.savesupplierdetFn(response,function(result){
    if(result=="saved"){
      res.status(200).json({'datavalue': "Saved!"});
    }
    else {
      res.status(200).json({'datavalue': "Saved!"});
    }
  });
});

//tax info
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

//search tax
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

//save excise_card
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

//sales vehicle order
app.post('/savesalesvehicleorder', urlencodedParser, function(req,res) {
var response={goodsvehiclenumber:req.query.vehno,
              salesorderid:req.query.salid
              };
  connectdb.savesalesorderconncetdbFn(response,function(data){
  if(rows="saved"){
  res.status(200).json({'returnval': "data saved"});
}
  else{

  res.status(200).json({'returnval': "data not saved"});
}
});
});

//auto complete
app.post('/autocomplete', urlencodedParser, function (req, res) {
  global.connection.query("SELECT UPPER(customername) as customername,customerid,city FROM m_customerdetail",function(err,rows){
    // console.log("adfasf:"+JSON.stringify(rows));
  if(rows.length>0){
    console.log("here:"+JSON.stringify(rows));
    res.status(200).json({'returnval': rows});
    }
  else
    res.status(200).json({'returnval': "Invalid!"});
  });
});


//bar-chart
var barchart=require("./app/elements/barchart-card/barchart-card-todb.js");
app.post('/barcharttablefetch',urlencodedParser,function (req, res) {
  console.log("barrr");

  barchart.barcharttablefetch(function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});

});
});


// // sales order page
var salespersondb=require("./app/elements/sales-order/sales-order-todb.js");
app.post('/salesinsert', urlencodedParser, function (req, res) {
  console.log("working");
  // console.log(req.query.salesid+req.query.datetimeq+req.query.customerid+req.query.id+req.query.description+req.query.ispecification+req.query.rcoilsq+req.query.rtonq+req.query.rdqty+req.query.datetimeq1+req.query.status);
  salespersondb.insertsales(req.query.salesid,req.query.datetimeq,req.query.customerid,req.query.id,req.query.description,req.query.ispecification,req.query.rcoilsq,req.query.rtonq,req.query.rdqty,req.query.datetimeq1,req.query.status,function(callback){
    if(callback==saved){
      console.log("saved");
    res.status(200).json({'returnval':"saved"});
    console.log(err);}
    else {
      console.log("not saved");
    res.status(200).json({'returnval':"not saved"});
    console.log(err);
    }
  })
});

//auto complete item

app.post('/autocompleteitem', urlencodedParser, function (req, res) {
// console.log("select distinct finishedgoods_itemtype.itemid,UPPER(finishedgoods_itemtype.itemname) as itemname FROM finishedgoods_itemtype inner join item_customer_map on item_customer_map.itemid=finishedgoods_itemtype.itemid inner join salesordercreate on salesordercreate.customerid = item_customer_map.customerid where salesordercreate.customerid='"+req.query.customerid+"'");
  global.connection.query("select distinct finishedgoods_itemtype.itemid,UPPER(finishedgoods_itemtype.itemname) as itemname FROM finishedgoods_itemtype inner join item_customer_map on item_customer_map.itemid=finishedgoods_itemtype.itemid inner join salesordercreate on salesordercreate.customerid = item_customer_map.customerid where salesordercreate.customerid='"+req.query.customerid+"'",function(err,rows){
  if(rows.length>0){
    // console.log("here:"+JSON.stringify(rows));
    res.status(200).json({'returnval': rows});
    }
  else
    res.status(200).json({'returnval': "Invalid!"});
  });
});

//itemcard
var itemdesigndb=require("./app/elements/item-customerdetail/itemdesigndb.js");

app.post('/itemfetch', urlencodedParser, function (req, res) {
  itemdesigndb.itemfetch(req.query.itemssid,function(callback,rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});

//customercard
var customerdesigndb=require("./app/elements/item-customerdetail/customerdesigndb.js");

app.post('/customerfetch', urlencodedParser, function (req, res) {
  console.log("hsjsha"+req.query.customerid);
  customerdesigndb.customerfetch(req.query.customerid,function(rows){
    console.log(rows);
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});

//timeline chart
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


//slider chart
var sliderfetchdb=require("./app/elements/slider-barnew/sliderdb.js");
app.post('/sliderchange', urlencodedParser,function (req, res) {
  sliderfetchdb.sliderchange(req.query.itemssid,function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else{
      res.status(200).json({'returnval': "Invalid!"});
    }
  });
});

//vehicle card
var vehicle_card=require("./app/elements/vehicle-card/vehicle-card-todb.js");
app.post('/vehiclesavedata', urlencodedParser, function (req, res) {
  vehicle_card.vehiclesavedata(req.query.VehicleNoval,req.query.VehicleNameval,req.query.DriverNameval,req.query.DrivMobNumberval1,req.query.DrivMobNumberval2,req.query.OwnerNameval,req.query.OwnMobNumberval,req.query.Vehintimeval,req.query.Vehindateval,req.query.selectedstate,function(callback){
    if(callback=="saved!"){
      res.status(200).json({'returnval': "Saved!"});
    }
    else{
      res.status(200).json({'returnval': "Unable to save!"});
    }
  });

});

app.post('/stores', urlencodedParser, function (req,res) {
    connectdb.storeFn(function(rows){
      if(rows!="reject"){
        res.status(200).json({'returnval': rows});
      }
      else
        res.status(200).json({'returnval': "does not get saleid"});
    });
    });
    app.post('/purchase', urlencodedParser, function (req,res) {
      connectdb.purchaseFn(function(rows){
        if(rows!="reject"){
          res.status(200).json({'returnval': rows});
        }
        else
          res.status(200).json({'returnval': "does not get saleid"});
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


// ********supplier name in auto complete*********
var supplierautocompletedb=require("./app/elements/vehicle-in-process-suppliername/supplierautocompletedb.js");
app.post('/supplierautocomplete',urlencodedParser,function (req, res) {

  supplierautocompletedb.supplierautocomplete(function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
});
});
// *********item name in autocomplte***********
var itemautocompletedb=require("./app/elements/vehicle-in-process-itemdetails/itemautocompletedb.js");
app.post('/itemdescriptionautocomplete', urlencodedParser, function (req, res) {
  itemautocompletedb.itemdescriptionautocomplete(req.query.suppliername,req.query.supplierid,function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});
// *****fetching containername by using id ****
var containerdbpath=require("./app/elements/vehicle-in-process-itemdetails/containerdb.js");
app.post('/containeridfetch', urlencodedParser, function (req, res) {
  containerdbpath.containeridfetch(req.query.containeridvalue,function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});
// ***fetching unitofmeasurename by using id  ******
var quantitydbpath=require("./app/elements/vehicle-in-process-itemdetails/quantitydb.js");
app.post('/quantityidfetch', urlencodedParser, function (req, res) {
  quantitydbpath.quantityidfetch(req.query.unitofmeasureidvalue,function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
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
// ***Invoice no saving ******
var invoicedbpath=require("./app/elements/vehicle-in-process-itemdetails/invoiceprocessdb.js");
app.post('/invoicesaving', urlencodedParser, function (req, res) {
  invoicedbpath.invoicesaving(req.query.invoicenovalue,req.query.invoicedatevalue,req.query.irnnumber,function(rows){
    if(rows=="saved"){
      res.status(200).json({'returnval': "Invoice detail saved"});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});
// ***vehicle-in-process driver details******
var vehicledbpath=require("./app/elements/vehicle-in-process-itemdetails/vehicleprocessdb.js");
app.post('/vehiclesaving', urlencodedParser, function (req, res) {
  vehicledbpath.vehiclesaving(req.query.vehiclenamevalue,req.query.vehiclenovalue,req.query.drivernamevalue,req.query.drivernovalue,req.query.irnnumber,function(rows){
    if(rows=="saved"){
      res.status(200).json({'returnval': "vehicle detail saved"});
    }
    else
      res.status(200).json({'returnval': "Not saved!"});
  });
});
// ***vehicle-in-process-itemdetails db  ******
var supplierdbpath=require("./app/elements/vehicle-in-process-itemdetails/supplierprocessdb.js");
app.post('/supplieridsaving', urlencodedParser, function (req, res) {
  supplierdbpath.supplieridsaving(req.query.supplieridvalue,req.query.irnnumber,req.query.item_id,req.query.containeridvalue,req.query.unitofmeasureidvalue,req.query.remarks,req.query.containergetvalue,req.query.qtygetvalue,req.query.stores,function(rows){
    if(rows=="saved"){
      res.status(200).json({'returnval': "supplierdetails saved"});
    }
    else
      res.status(200).json({'returnval': "Not saved!"});
  });
});

var sliderDB=require("./app/elements/slider-bar/slider-bar-todb.js");
app.post ('/testingdata', urlencodedParser, function (req, res) {
  console.log("testingdata");
  sliderDB.gettestingdata(function(testingdata){
    console.log("server:"+testingdata);
    if(testingdata.length>0)
      res.status(200).json({'testingdata': testingdata});
    else
      res.status(200).json({'testingdata': "No testingdata!"});
  });
});
// ***specification 1 ******
var spec1dbpath=require("./app/elements/specification-1/specification-1-db.js");
app.post('/Specification1', urlencodedParser, function (req, res) {
  spec1dbpath.Specification1(function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Not retrived!"});
  });
});
// ***specification 2 ******
var spec2dbpath=require("./app/elements/specification-2/specification-2-db.js");
app.post('/Specification2', urlencodedParser, function (req, res) {
  spec2dbpath.Specification2(function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Not retrived!"});
  });
});
// ***specification 3 ******
var spec3dbpath=require("./app/elements/specification-3/specification-3-db.js");
app.post('/Specification3', urlencodedParser, function (req, res) {
  spec3dbpath.Specification3(function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Not retrived!"});
  });
});
// ***specification 4 ******
var spec4dbpath=require("./app/elements/specification-4/specification-4-db.js");
app.post('/Specification4', urlencodedParser, function (req, res) {
  spec4dbpath.Specification4(function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Not retrived!"});
  });
});
// ********category details
var categorydetailsautocompletedb=require("./app/elements/category-details/category-detailsautocompletedb.js");
app.post('/categorydetailsautocomplete',urlencodedParser,function (req, res) {
categorydetailsautocompletedb.categorydetailsautocomplete(function(rows){
  // console.log("hiiii");
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
});
});
// ********sub category auto complete
var subcategoryautocompletedb=require("./app/elements/sub-category-details/subcategoryautocompletedb.js");
app.post('/subcategoryautocomplete',urlencodedParser,function (req, res) {
subcategoryautocompletedb.subcategoryautocomplete(req.query.categoryname,req.query.categoryid,function(rows){
 // console.log("hiiii");
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
});
});
// ********brand name auto complete
var brandnameautocompletepathdb=require("./app/elements/brand-details/brandautocompletedb.js");
app.post('/brandnameautocomplete',urlencodedParser,function (req, res) {
brandnameautocompletepathdb.brandnameautocomplete(req.query.itemnameparam,req.query.itemidparam,function(rows){
 // console.log("hiiii");
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
});
});
// ****dress varieties auto complete***********
var dresscollectionautocompletepath=require("./app/elements/dress-collections/dresscollectionautocompletedb.js");
app.post('/dresscollectionautocomplete',urlencodedParser,function (req, res) {
dresscollectionautocompletepath.dresscollectionautocomplete(req.query.itemnameparam,req.query.itemidparam,function(rows){
 // console.log("hiiii");
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
});
});
// ****shop details auto complete***********
var shopdetailsautocompletepath=require("./app/elements/shop-details/shopdetailsautocompletedb.js");
app.post('/shopdetailsautocomplete',urlencodedParser,function (req, res) {
shopdetailsautocompletepath.shopdetailsautocomplete(function(rows){

    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
});
});
// ***item brand details  saving ******
var itembrandpath=require("./app/elements/shopping-category/itembranddb.js");
app.post('/itembrandsave', urlencodedParser, function (req, res) {
  itembrandpath.itembrandsave(req.query.brand_id_back,req.query.dress_id_back,function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': "saved"});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});
// ***subcategory item details  saving ******
var subcategoryitempath=require("./app/elements/shopping-category/subcategoryitemdb.js");
app.post('/subcategoryitemsave', urlencodedParser, function (req, res) {
  subcategoryitempath.subcategoryitemsave(req.query.subcategory_id_back,req.query.dress_id_back,function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': "saved"});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});
// ***subcategory category details  saving ******
var categorysubcategorypath=require("./app/elements/shopping-category/categorysubcategorydb.js");
app.post('/categorysubcategorysaving', urlencodedParser, function (req, res) {
  categorysubcategorypath.categorysubcategorysaving(req.query.subcategory_id_back,req.query.category_id_back,function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': "saved"});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});
// ***shop item details  saving ******
var shopitemsavingpath=require("./app/elements/shopping-category/shopitemdb.js");
app.post('/shopitemsaving', urlencodedParser, function (req, res) {
  shopitemsavingpath.shopitemsaving(req.query.shop_id_back,req.query.dress_id_back,function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': "saved"});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});
// ***db col name fetching ******
var dbnamefetchpath=require("./app/elements/generic-mapping/dbnamefetchdb.js");
app.post('/dbnamefetch', urlencodedParser, function (req, res) {
  // console.log("hi");
  dbnamefetchpath.dbnamefetch(req.query.dbtoken,req.query.customerid,req.query.addressid,function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': "saved"});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});
// ***testing function******
var testingfunctionpath=require("./app/elements/generic-mapping/testingfunctiondb.js");
app.post('/testingfunction', urlencodedParser, function (req, res) {
  // console.log("hi");
  testingfunctionpath.testingfunction(req.query.field1,req.query.field2,req.query.targettablename,req.query.customerid,req.query.addressid,function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': "saved"});
    }
    else
      res.status(200).json({'returnval': "Invalid"});
  });
});






app.listen(4000);
