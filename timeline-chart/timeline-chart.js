// JavaScript Document
 (function() {
    'use strict';

    Polymer({
      is: 'timeline-chart',
	  ready:function(){
		  },
		  getJsondata:function(goodsvehiclenumber,goodsvehiclename,goodsvehicleintime,goodsvehicleouttime,goodsvehicleindate,goodsvehicleoutdate)
		  {
			  	this.vehiclenumber=goodsvehiclenumber;
          this.vehiclename=goodsvehiclename;
				  this.vehicleintime=goodsvehicleintime;
          this.vehicleouttime=goodsvehicleouttime;
			    this.vehicleindate=goodsvehicleindate;
           this.vehicleoutdate=goodsvehicleoutdate;


		  }
  });
  })();
