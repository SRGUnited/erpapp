(function() {
  'use strict';
  Polymer({
    is: 'sales-person',

    savesales:function(){
      var obj={};
      obj.ccname=this.cname;
      obj.customerid=this.cid;
      obj.customerlocation=this.clocation;
      obj.id=this.iid;
      obj.description=this.idescription;
      obj.ispecification=this.ispecification;
      obj.rcoilsq=this.rcoils;
      obj.rtonq=this.rtons;
      obj.rdqty=this.dqty;
      obj.status=this.selectedcontainer;
      obj.datetimeq=this.min;
      obj.datetimeq1=this.min1;
      document.querySelector("sales-ironajax").send(obj);
      },

    salesResponse:function(e){
      alert(e.detail.response.returnval);
    },

    getJsondata:function(customername,customerid,customerlocation,itemid,itemdescription,itemspecification,container,quantity,dquantity,status){
      this.customername=customername;
      this.customerid=customerid;
      this.customerlocation=customerlocation;
      this.ItemId=itemid;
      this.itemdescription=itemdescription;
      this.itemspecification=itemspecification;
      this.container=container;
      this.quantity=quantity;
      this.dquantity=dquantity;
      this.status=status;
    }
  });
})();
