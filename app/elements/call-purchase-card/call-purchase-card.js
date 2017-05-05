  Polymer({
    is: 'call-purchase-card',
    ready:function(){
      // alert("call-purchase-card");
    },
    handleResponse:function(e){
      this.newitems=e.detail.response.returnval;
      // this.newitemsfg=e.detail.response.returnfg;
      // alert("handleResponse");
    }
  });
