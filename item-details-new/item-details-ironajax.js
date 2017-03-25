  Polymer({
    is:"item-details-ironajax",

    send:function(jsinputs){
      this.requesturl="http://localhost:4000"+"/insertitems";
      this.writeparam=jsinputs;
      this.$.writeajax.generateRequest();
    },

    itemResponse:function(e){
      alert(e.detail.response.returnval);
    },

    sendresponse:function(search){
    this.responseurl="http://localhost:4000"+"/searchitem";
    this.readparam=search;
    this.$.readajax.generateRequest();
  },

  searchitemdetails:function(e){
    var arr=e.detail.response.returnval;
    document.querySelector("item-details").searchbind(arr);
    }
  });
