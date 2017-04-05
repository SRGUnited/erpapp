(function() {
  'use strict';
  Polymer({
    is: 'sales-order',
    saveitems1:function(){
      this.requesturl1="http://localhost:4000"+"/insertsales";
      var obj={};
      obj.salesid=this.salesid;
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


      this.writeparam=obj;

      this.$.writeajax.generateRequest();

      },
    salesResponse:function(e){
      alert(e.detail.response.returnval);
    },
    getJsondata:function(salesid,customername,customerid,customerlocation,itemid,itemdescription,itemspecification,container,quantity,dquantity,status){
    this.salesorderid=salesid;
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
