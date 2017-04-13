  Polymer({
    is:"item-details-ironajax",

    itemdetailslabel:function(){
      var array=this.itemjsonlabel;
      document.querySelector("item-details").jsonlabel(array[0].itemid,
                                                       array[0].itemname,
                                                       array[0].itemdescription,
                                                       array[0].itemspecification1,
                                                       array[0].itemspecification2,
                                                       array[0].itemcontainer,
                                                       array[0].itemunit,
                                                       array[0].itemgroup,
                                                       array[0].itemtype,
                                                       array[0].itemstatus,
                                                       array[0].itempurchasetype,
                                                       array[0].itempricing)
    },

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
      // this.$.readjson.generateRequest();
      // alert(JSON.stringify(e.detail.response.returnval));
      var arr=e.detail.response.returnval;
      document.querySelector("item-details").searchbind(arr);
    },

    bindsearchdata:function(){
      document.querySelector("item-details").searchbind(this.searchjsondata);
    }
  });
