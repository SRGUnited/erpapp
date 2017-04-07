(function() {
   'use strict';
   var arr=[];
  //  var content;
Polymer({
  is:"call-security-card",
  ready:function(){
    alert("call-security-card");
  },
  testFn:function(){
    alert("testFn");
    this.salesorderdata=arr;
    // alert(JSON.stringify(arr));
    arr=null;
  },
  savesecurityjsonFn:function(){
    var data={
              invNum:this.invoiceNumVal,
              saleid:this.salesorderidVal,
              invDate:this.invoiceDateVal,
              delqunty:this.deliverquantityVal,
              vehouttime:this.vehicleouttimeVal
              };
    document.querySelector("call-security-card-ironajax").savesecurityFn(data);
  },
  vehNumSearchFn:function(){
    // alert("vehNumSearchFn");
   alert("dropedown selection"+this.selection);
    var data={searchvehiclenum:this.selection};
      document.querySelector("call-security-card-ironajax").searchidFn(data);
  },
securityresponseFn1:function(obj){
      arr.push(obj);
  },
  getvehnoFn:function(data){
    // alert(JSON.stringify(data));
    for(var i=0;i<data.length;i++){
      alert(JSON.stringify(data[i].goodsvehiclenumber));
    }
    this.vehicleNumdata=data;
  }
});
})();
