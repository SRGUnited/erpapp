
var customerfetchpath=[];
var customerfetchpath = "./app/elements/all-design/customerdesign.json";
exports.customerfetch=function(callback){
  connection.query('Select * FROM m_customerdetail',function(err,rows){
  if(rows.length>0){
      jsonfile.writeFile(customerfetchpath,rows,function(err){
    return callback(rows);

  })
}
else{
//  res.status(200).json({'returnval': "Data not found!"});
  return callback("reject");
}
});
//console.log("j");
}
