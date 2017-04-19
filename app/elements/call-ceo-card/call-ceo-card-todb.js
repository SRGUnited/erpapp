var mysql=require('mysql');

exports.searchitem=function(callback){
  connection.query("select * from m_item_details where status='Created'",function(err,rows){
  	if(rows.length>0){
      connection.query("select * from finishedgoods_itemtype where status='Created'",function(err,fgrows){
        return callback(rows,fgrows);
      });
    }
    else{
      return callback("No data!");
    }
    });
}

exports.ceoresponse=function(respond,id,type,callback){
  if(type=="FG"){
  connection.query('update finishedgoods_itemtype set status="'+respond+'" where itemid="'+id+'"',function(err,rows){
    return callback("Updated");
  })
}
  else if(type!="FG"){
  connection.query('update m_item_details set status="'+respond+'" where itemid="'+id+'"',function(err,rows){
    return callback("Updated");
  })
}

  else {
    return callback("Not Updated!")
  }
}
