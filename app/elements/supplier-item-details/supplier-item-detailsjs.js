Polymer({
  is:"supplier-item-details",

  submitFn:function(){
        var jsonobject={};
        jsonobject.SupplierNameVal=this.SupplierNameVal,
        jsonobject.CategoryNameVal=this.CategoryNameVal,
        jsonobject.ItemNameVal=this.ItemNameVal,
        jsonobject.Specification1Val=this.Specification1Val,
        jsonobject.Specification2Val=this.Specification2Val,
        jsonobject.Specification3Val=this.Specification3Val,
        jsonobject.Specification4=this.Specification3Val
        document.querySelector("vehiclecard-ironajax").to_ironajax(jsonobject);
      },

    getJsondata:function(vno,vname,dname,dno1,dno2,ownname,ownno,vintime,vindate,typelab,sin,sout){
      this.SupplierName=vno;
      this.CategoryName=vname;
      this.ItemName=dname;
      this.Specification1=dno1;
      this.Specification2=dno2;
      this.Specification3=ownname;
      this.Specification4=ownno;

    }
});
