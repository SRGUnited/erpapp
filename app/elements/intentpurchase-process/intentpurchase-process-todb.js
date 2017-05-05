var mysql=require('mysql');

exports.searchitem=function(callback){
  connection.query("select distinct(T1.itemname) FROM m_item_details as T1 JOIN m_intent_itemtype_department_mapping as T2 where T1.itemtypeid = T2.itemtypeid",function(err,itemnames){
    if(itemnames.length>0){
      return callback(itemnames);
    }
    else {
      return callback("No items found!");
    }
  })
}

exports.getintentitem=function(itemname,callback){
  connection.query("select * from m_item_details where itemname='"+itemname+"'",function(err,itemdetails){
    if(itemdetails.length>0){
      return callback(itemdetails);
    }
    else {
      return callback("No Data!");
    }
  })
}

exports.getwarehouselocation=function(itemname,callback){
  var id;
    connection.query("select itemid from m_item_details where itemname='"+itemname+"'",function(err,itemid){
      if(itemid.length>0){
        global.id=itemid[0].itemid;
        connection.query("select * from m_item_details where itemid='"+global.id+"'",function(err,warehouselocation){
          return callback(warehouselocation);
        })
      }
      else{
        connection.query("select itemid from finishedgoods_itemtype where itemname='"+itemname+"'",function(err,itemid){
          global.id=itemid[0].itemid;
          connection.query("select * from finishedgoods_itemtype where itemid='"+global.id+"'",function(err,warehouselocation){
            return callback(warehouselocation);
          })
        })
      }
    });
}

exports.saveintent=function(intentid,iid,selectedtype,itemspec1,whlocation,selectedcontainer,itemcontainerquantity,itemquantity,intentdate,requireddate,callback){
  var data={
    "intent_number":intentid,
    "intent_date":intentdate,
    "intent_type_id":selectedtype,
    "item_id":iid,
    "item_quantity":itemquantity,
    "container_quantity":itemcontainerquantity,
    "warehouse_stores_id":whlocation,
    "status":"Created",
    "item_required_date":requireddate
  }
  connection.query("insert into o_purchase_register set ?",[data],function(err,rows){
    if(rows.affectedRows>0){
      return callback("Saved");
    }
    else {
      return callback("Not Saved!");
    }
  })
}
