(function() {
  'use strict';
  Polymer({
    is: 'item-details',

    jsonlabel:function(itemid,itemname,itemdescription,itemspecification1,itemspecification2,itemcontainer,itemunit,itemgroup,itemtype,itemstatus,itempurchasetype){
      this.itemid=itemid;
      this.itemname=itemname;
      this.itemdescription=itemdescription;
      this.itemspecification1=itemspecification1;
      this.itemspecification2=itemspecification2;
      this.itemcontainer=itemcontainer;
      this.itemunit=itemunit;
      this.itemgroup=itemgroup;
      this.itemtype=itemtype;
      this.itemstatus=itemstatus;
      this.itempurchasetype=itempurchasetype;
    },

    saveitems:function(){
      var obj={};
      obj.id=this.iid;
      obj.name=this.iname;
      obj.description=this.idescription;
      obj.specification1=this.ispecification1;
      obj.specification2=this.ispecification2;
      obj.container=this.icontainer;
      obj.unit=this.iunit;
      obj.group=this.igroup;
      obj.type=this.itype;
      obj.status=this.istatus;
      obj.ptype=this.iptype;
      document.querySelector("item-details-ironajax").send(obj);
      },

    searchdetails:function(){
      var obj={};
      obj.id=this.iid;
      document.querySelector("item-details-ironajax").sendresponse(obj);
     },

     searchbind:function(arr){
       this.iid=arr[0].itemid;
       this.iname=arr[0].itemname;
       this.idescription=arr[0].itemdescription;
       this.ispecification1=arr[0].itemspecification1;
       this.ispecification2=arr[0].itemspecification2;
       this.selectedcontainer=arr[0].itemcontainer;
       this.selectedunit=arr[0].unitofmeasures;
       this.selectedgroup=arr[0].itemgroup;
       this.selectedtype=arr[0].itemtype;
       this.selectedstatus=arr[0].itemstatus;
       this.selectedptype=arr[0].itempurchasetype;
    //  this.iid=arr[0].Item_ID;
    //  this.iname=arr[0].Item_Name;
    //  this.idescription=arr[0].Item_Description;
    //  this.selectedcontainer=arr[0].Item_Container;
    //  this.selectedunit=arr[0].Item_Unit;
    //  this.selectedtype=arr[0].Item_Type;
    //  this.selectedgroup=arr[0].Item_Group;
    //  this.iselectedpurchase=arr[0].Item_Purchase;
   }
  });
})();
