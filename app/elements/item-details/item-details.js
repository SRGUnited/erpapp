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
      document.querySelector("autogen-id").send();
      },

      save:function(e){
        alert("add items"+e)
        var obj={};
        obj.id="ite"+e;
        obj.name=this.iname;
        obj.description=this.idescription;
        obj.specification1=this.ispecification1;
        obj.specification2=this.ispecification2;
        obj.container=this.selectedcontainer;
        obj.unit=this.selectedunit;
        obj.group=this.selectedgroup;
        obj.type=this.selectedtype;
        obj.status=this.selectedstatus;
        obj.ptype=this.selectedptype;
        obj.ceostatus="Created";
        document.querySelector("item-details-ironajax").send(obj);
      },

    searchdetails:function(){
      var obj={};
      obj.name=this.iname;
      document.querySelector("item-details-ironajax").sendresponse(obj);
      },

     searchbind:function(arr){
      //  this.iid=arr[0].itemid;
       this.iname=arr[0].itemname;
       this.idescription=arr[0].itemdescription;
       this.ispecification1=arr[0].itemspecification1;
       this.ispecification2=arr[0].itemspecification2;
       this.selectedcontainer=arr[0].containerid;
       this.selectedunit=arr[0].unitofmeasures;
       this.selectedgroup=arr[0].itemgroup;
       this.selectedtype=arr[0].itemtypeid;
       this.selectedstatus=arr[0].itemstatus;
       this.selectedptype=arr[0].itempurchasetype;
      },

      addsupplier:function(){
        document.querySelector('home-page').FnSetPage("call-add-supplier");
        document.querySelector('addsupplier-dynamic').itemid(this.iid);
      },

      supplierid:function(sid){
        this.sid=sid;
      },

      openmapping:function(){
        this.colvar="false";
        this.$.collapse.toggle();
        this.page="item-to-addsupplier";
      },

      expand:function(){
        this.page="";
        if(this.colvar=="true"){
          this.colvar="true";
        }
        else{
          this.colvar="true";
        }
      }
  });
})();
