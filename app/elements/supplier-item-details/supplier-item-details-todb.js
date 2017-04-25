var file=[];
var file='./app/elements/supplier-item-details/supplier-item-details.json';

exports.vehiclesavedata=function(SupplierNameVal,CategoryNameVal,ItemNameVal,Specification1Val,Specification2Val,Specification3Val,Specification4Val,callback){
  var response={
  	"suppliername":SupplierNameVal,
    "categoryname":CategoryNameVal,
    "itemname":ItemNameVal,
    "specification1":Specification1Val,
    "specification2":Specification2Val,
    "specification3":Specification3Val,
    "specification4":Specification4Val
  };
  jsonfile.writeFile(file,response,function(err){
    if(!err)
      require('fs').readFile('./app/elements/supplier-item-details/supplier-item-details.json','utf8',function(err,jsondata){
     dbjsondata=JSON.parse(jsondata);
     connection.query('INSERT INTO test.supplier-item-details SET ?',[dbjsondata],function(err){});
      });

  });
}
