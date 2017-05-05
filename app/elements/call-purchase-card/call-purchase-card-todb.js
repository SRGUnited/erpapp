var mysql=require('mysql');

exports.searchpurchaseitem=function(callback){
  connection.query("select * from o_purchase_register where status='Created'",function(err,rows){
  	if(rows.length>0){
        return callback(rows);
    }
    else{
      return callback("No data!");
    }
    });
}


exports.purchaseresponse=function(respond,purchasenumber,callback){
  console.log(purchasenumber);
  console.log('update o_purchase_register set status="'+respond+'" where purchasenumber="'+purchasenumber+'"');
  connection.query('update o_purchase_register set status="'+respond+'" where purchasenumber="'+purchasenumber+'"',function(err,rows){
    console.log(rows);
    if(rows.affectedRows>0){
        return callback("UPDATED");
    }
    else{
      return callback("Not updated!");
    }
    });
}
