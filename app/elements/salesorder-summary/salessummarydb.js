
var fetchpath=[];
var fetchpath = "./app/elements/salesorder-summary/fetch.json";
exports.fetch=function(callback){
  connection.query('Select * FROM salesordercreate',function(err,rows){
  if(rows.length>0){
  //  console.log(rows);
  return callback(rows);
  jsonfile.writeFile(fetchpath,rows,function(err){
//  res.status(200).json({'returnval': rows});
// consw4ole.log(rows);
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
