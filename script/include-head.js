Polymer({
  is:"include-head",

  ready:function(){
    this.url="../../config/suppliermenu.json";
    },

  menureadResponse:function(e){
    this.menus=e.detail.response;
   }
});
