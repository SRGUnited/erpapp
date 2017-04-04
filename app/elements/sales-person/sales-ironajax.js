(function() {
  'use strict';
  Polymer({
    is: 'sales-ironajax',

     jsoninfoResponse:function(){
       var labeljsondata=this.jsondata;
       document.querySelector("sales-person").getJsondata(labeljsondata[0].customername,labeljsondata[0].itemname,labeljsondata[0].itemdescription,labeljsondata[0].itemspec,labeljsondata[0].container,labeljsondata[0].quantity,labeljsondata[0].status);
      },

      send:function(jsinputs){
        this.requesturl1="http://localhost:4000"+"/insertsales";
        this.writeparam=jsinputs;
        this.$.writeajax.generateRequest();
      }
   });
 })();
