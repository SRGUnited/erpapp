var itemfetchpath=[];
var itemfetchpath = "./app/elements/all-design/itemdesign.json";
exports.itemfetch=function(callback){
  connection.query('Select * FROM m_item_details',function(err,rows){
  if(rows.length>0){
      jsonfile.writeFile(itemfetchpath,rows,function(err){
    return callback(rows);
//  res.status(200).json({'returnval': rows});
// console.log(rows);
// writes automatically as json file

  })
}
else{
  //res.status(200).json({'returnval': "Data not found!"});
    return callback("reject");
}
});
//console.log("j");
}
