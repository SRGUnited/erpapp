Polymer({
  is: "intentpurchase-process-ironajax",
  searchitem:function(e){
    var json={};
    json.itemname=e;
    this.searchitemparam=json;
    this.$.searchitem.generateRequest();
  },
  handleintentsave:function(e){
    // this.itemnames=e.detail.response.;
    alert(e.detail.response.status)
  },
  handleintentlabel:function(){
    document.querySelector("intentpurchase-process").intentlabel(this.intentlabel);
  },
  handleItems:function(e){
    document.querySelector("intentpurchase-process").itemdata(e.detail.response.itemdetails);
  },
  savedata:function(data){
    this.intentparam=data;
    this.$.intentia.generateRequest();
  },
  handleintentitems:function(e){
    document.querySelector('intentpurchase-process').itemnames=e.detail.response.itemnames;
  }
});
