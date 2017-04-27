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
<<<<<<< HEAD
  global.connection.query("SELECT * FROM od_quality_parameter",function(err,testingdata){
    console.log(testingdata);
=======
  global.connection.query("select T1.*,T2.* from m_quality_parameter T1 JOIN od_quality_parameter T2 where T1.quality_parameter_id = T2.quality_parameter_id;",function(err,testingdata){
>>>>>>> 2d3eba0b144e76b1cb7423e0e4586257bb16ef3d
  if(testingdata.length>0)
    return callback(testingdata);
  else
    return callback("No testingdata!");
  });
}
