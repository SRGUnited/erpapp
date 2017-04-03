(function() {
  'use strict';
  Polymer({
    is: 'item-details',

    saveitems:function(){
      var obj={};
      obj.id=this.iid;
      obj.name=this.iname;
      obj.description=this.idescription;
      obj.container=this.icontainer;
      obj.unit=this.iunit;
      obj.type=this.itype;
      obj.group=this.igroup;
      obj.purchase=this.iselectedpurchase;
      document.querySelector("item-details-ironajax").send(obj);
      },

    searchdetails:function(){
      var obj={};
      obj.id=this.iid;
      document.querySelector("item-details-ironajax").sendresponse(obj);
     },

     searchbind:function(arr){
     this.iid=arr[0].Item_ID;
     this.iname=arr[0].Item_Name;
     this.idescription=arr[0].Item_Description;
     this.selectedcontainer=arr[0].Item_Container;
     this.selectedunit=arr[0].Item_Unit;
     this.selectedtype=arr[0].Item_Type;
     this.selectedgroup=arr[0].Item_Group;
     this.iselectedpurchase=arr[0].Item_Purchase;
   }
  });
})();
