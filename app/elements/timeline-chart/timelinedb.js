
var timelinefetchpath=[];
var timelinefetchpath = "./app/elements/timeline-chart/timelinedesign.json";
exports.timelinefetch=function(callback){
  connection.query('Select * FROM goodsvehiclestatustracking',function(err,rows){
  if(rows.length>0){
    return callback(rows);
//console.log("hi");
// writes automatically as json file
  jsonfile.writeFile(timelinefetchpath,rows,function(err){
  })
}
else{
  //res.status(200).json({'returnval': "Data not found!"});
    return callback("reject");
}
});
//console.log("j");
}
