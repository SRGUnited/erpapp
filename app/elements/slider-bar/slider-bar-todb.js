var mysql=require('mysql');

exports.mapsupplier=function(callback){
  global.connection.query("SELECT suppliername FROM m_supplierdetails",function(err,rows){
  if(rows.length>0)
    return callback(rows);
  else
    return callback("Invalid!");
  });
}

exports.gettestingdata=function(callback){
  global.connection.query("SELECT * FROM od_quality_parameter",function(err,testingdata){
    console.log(testingdata);
  if(testingdata.length>0)
    return callback(testingdata);
  else
    return callback("No testingdata!");
  });
}
