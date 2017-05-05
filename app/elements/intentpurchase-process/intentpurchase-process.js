var autoid;
var iid;
Polymer({
  is: "intentpurchase-process",
  searchWHLocation:function(){
    document.querySelector("intentpurchase-process-ironajax").searchlocation(this.itemname);
  },
  intentlabel:function(intentlabel){
    this.typelabel=intentlabel[0].itemtype;
    this.namelabel=intentlabel[0].itemname;
    this.spec1label=intentlabel[0].itemspecification1;
    this.whloclabel=intentlabel[0].warehouselocation;
    this.containerlabel=intentlabel[0].itemcontainer;
    this.containerquantitylabel=intentlabel[0].itemcontainerquantity;
    this.itemquantitylabel=intentlabel[0].itemquantity;
  },
  saveintent:function(){
    var json={};
    json.intentid=autoid;
    json.iid=iid;
    json.selectedtype=this.selectedtype;
    json.itemspec1=this.itemspec1;
    json.whlocation=this.whlocation;
    json.selectedcontainer=this.selectedcontainer;
    json.itemcontainerquantity=this.itemcontainerquantity;
    json.itemquantity=this.itemquantity;
    json.intentdate=this.intentdate;
    json.requireddate=this.min;
    document.querySelector('intentpurchase-process-ironajax').savedata(json);
  },
  searchitem:function(){
    document.querySelector('intentpurchase-process-ironajax').searchitem(this.selectedname);
  },
  itemdata:function(e){
    iid=e[0].itemid;
    this.selectedtype=e[0].itemtypeid;
    this.itemspec1=e[0].itemspecification1;
    this.whlocation=e[0].warehouselocation;
    this.selectedcontainer=e[0].containerid;
  },
  checkid:function(x){
    autoid=x;
  }
});
