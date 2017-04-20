var mysql=require('mysql');

exports.mapitem=function(callback){
global.connection.query("SELECT itemname FROM m_item_details",function(err,rows){
if(rows.length>0){
  global.connection.query("SELECT itemname FROM finishedgoods_itemtype",function(err,rows1){
    rows.push(rows1[0]);
    return callback(rows);
  });
}

else
  return callback("Invalid!");
});
}

exports.mapsupplier=function(callback){
  global.connection.query("SELECT suppliername FROM m_supplierdetails",function(err,rows){
  if(rows.length>0)
    return callback(rows);
  else
    return callback("Invalid!");
  });
}
