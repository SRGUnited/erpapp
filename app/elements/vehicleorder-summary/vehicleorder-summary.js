
  (function() {
    'use strict';
    Polymer({
      is: 'vehicleorder-summary',
	  ready:function(){
		    alert("vehicleorder-summary");
		  },
     getfunction:function(jsonsummary){
       this.jsondata=jsonsummary;
     }
      });
  })();
