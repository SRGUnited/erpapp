Polymer({
  is:"ceo-customer-card-ironajax",
  ready:function(){
    // alert("ceo-customer-card-ironajax");
  },
  ceocustomercardAjaxresponse:function(e){
    // alert(e.detail.response.returnval);
    this.$.ceocustomercardjsonreadAjax.generateRequest();
  },
  ceocustomercardjsonreadresponse:function(){
    document.querySelector("ceo-customer-card").getcardcontendFn(this.customerjsondata);
  },
  sendapprovalFN(data){
    this.approvalparams=data;
    this.$.ceocustomercardapprovalAjax.generateRequest();
  },
  ceocustomercardapprovalresponse:function(e){
    alert(e.detail.response.returnval);
  }
});
