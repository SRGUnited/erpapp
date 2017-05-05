  Polymer({
    is: "warehouse-details-ironajax",
    handleWarehouselabel:function(){
      document.querySelector('warehouse-details').warehouselabel=this.warehouseddlabel[0].warehouselabel;
    }
  });
