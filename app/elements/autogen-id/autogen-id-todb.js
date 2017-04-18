var mysql      = require('mysql');
exports.generateId=function(callback){
    connection.query("select id from autogenerateid",function(err,retrievedData){
      if(retrievedData.length>0){
        for(var i=0;retrievedData.length>i;i++){
          retrievedData[0].id++;
        }
        connection.query("insert into autogenerateid (id) values ('"+retrievedData[0].id+"')",function(err){});
        return callback(retrievedData[0].id);
      }
      else{
      console.log("Error:"+err);
      return callback("No ID Found to Generate");
      }
    });
}
