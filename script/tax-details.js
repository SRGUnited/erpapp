Polymer({
  is:"tax-details",
  savetax:function(){
    var obj={};
    obj.id=this.panno;
    obj.name=this.tanno;
    obj.description=this.cinno;
    obj.container=this.cstno;
    document.querySelector("tax-details-ironajax").send(obj);
    },
  }
})
