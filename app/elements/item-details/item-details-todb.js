var mysql=require('mysql');

exports.insertitems=function(sid,id,name,description,specification1,specification2,container,unit,group,type,status,ptype,ceostatus,callback){
  var response={"itemid":id,
                "itemname":name,
                "itemdescription":description,
                "itemspecification1":specification1,
                "itemspecification2":specification2,
                "containerid":container,
                "unitofmeasures":unit,
                "itemgroup":group,
                "itemtypeid":type,
                "itemstatus":status,
                "itempurchasetype":ptype,
                "status":ceostatus
                };
  if(type=="FG"){
   connection.query('INSERT INTO finishedgoods_itemtype SET ?',[response],function(err){
     if(!err)
       return callback("saved!");
     else{
       console.log(err);
       return callback("Not Saved");
     }
   });
 }
 else{
   connection.query('INSERT INTO m_item_details SET ?',[response],function(err){
     if(!err)
       return callback("saved!");
     else{
       console.log(err);
       return callback("Not Saved");
     }
   });
 }
}

exports.searchitem=function(name,callback){
    connection.query("select * from m_item_details where itemname='"+name+"'",function(err,rows){
      if(rows.length>0){
        connection.query("select * from m_supplierdetails left join item_supplier_map on item_supplier_map.supplierid=m_supplierdetails.supplierid left join m_item_details on m_item_details.itemid=item_supplier_map.itemid where m_item_details.itemname='"+name+"'",function(err,suppliers){
          return callback(rows,suppliers);
        });
      }
      else{
        connection.query("select * from finishedgoods_itemtype where itemname='"+name+"'",function(err,rows1){
          connection.query("select * from m_supplierdetails left join item_supplier_map on item_supplier_map.supplierid=m_supplierdetails.supplierid left join m_item_details on m_item_details.itemid=item_supplier_map.itemid where m_item_details.itemname='"+name+"'",function(err,suppliers){
            return callback(rows1,suppliers);
          });
        })
      }
    });
}
