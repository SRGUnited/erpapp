(function() {
   'use strict';
   var vehnoarr=[];
Polymer({
  is:"call-security-card-ironajax",
  ready:function(){
  },
  savesecurityFn:function(data){
    this.securityjsonparams=data;
    this.$.securityAjax.generateRequest();
  },
  securityhandleResponse:function(e){
    alert(e.detail.response.returnval);
  },
  searchidFn:function(data){
    this.securitysearchparams=data;
    this.$.securitysearchAjax.generateRequest();
  },
  securitysearchResponse:function(e){
    var salesdata=e.detail.response.returnval;
    // alert(salesdata);
    // alert(JSON.stringify(salesdata));
    if(salesdata!="does not get vehicel no"){
      alert("first"+salesdata.length);
    if(salesdata.length>0){
      alert("second"+salesdata);
      for(var i=0;i<salesdata.length;i++){
        var obj={salid:salesdata[i].salesorderid};
        this.loopsecuritysearchparams=obj;
        // alert(JSON.stringify(this.loopsecuritysearchparams));
        this.$.loopsecuritysearchAjax.generateRequest();
        // alert(JSON.stringify(obj));
        // arr.push(obj);
        }
    }
    else{
      document.querySelector("call-security-card").securityresponseFn(salesdata);
    }
  }
  else {
    alert(salesdata);
    }
  },
  loopsecuritysearchResponse:function(e){
    var data=e.detail.response.returnval;
    // alert(JSON.stringify(data));
    for(var i=0;i<data.length;i++){
      // alert(JSON.stringify(data[i]));
      document.querySelector("call-security-card").securityresponseFn1(data[i]);
    }
  },
  autosecuritysearchResponse:function(e){
    var arr=e.detail.response.returnval;
      for(var i=0;i<=arr.length;i++){
        if(arr[i].state="in"){
          vehnoarr.push(arr[i]);
          document.querySelector("call-security-card").getvehnoFn(vehnoarr);
          // alert(JSON.stringify(vehnoarr));
        }
        else {
          alert("no number of vehicle In state");
        }
      }
    alert("end");
  }
});
})();
