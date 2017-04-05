(function() {
    'use strict';

    Polymer({
      is: 'sales-ironajax',
	  ready:function(){

		  },

	  jsoninfoResponse:function(){
  var labeljsondata=this.jsondata;
  document.querySelector("sales-order").getJsondata(labeljsondata[0].salesorderid,labeljsondata[0].customername,labeljsondata[0].customerid,labeljsondata[0].customerlocation,labeljsondata[0].itemid,labeljsondata[0].itemdescription,labeljsondata[0].itemspecification,labeljsondata[0].container,labeljsondata[0].quantity,labeljsondata[0].deliveredquantity,labeljsondata[0].status);
}

    });
  })();
