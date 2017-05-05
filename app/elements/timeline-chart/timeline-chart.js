 (function() {
    'use strict';
 Polymer({
      is: 'timeline-chart',
    	    getJsondata:function(goodsvehiclenumber,goodsvehicleintime,loadstart,loadend,goodsvehicleouttime,delivered){
    			  	this.vehicleno=goodsvehiclenumber;
          	  this.vehicleintime=goodsvehicleintime;
              this.vehicleloadstartdatetime=loadstart;
              this.vehicleloadenddatetime=loadend;
              this.vehicleouttime=goodsvehicleouttime;
              this.deliveredtime=delivered;
          },
          Jsondata:function(vehicleintime,vehicleloadstartdatetime,vehicleloadenddatetime,vehicleouttime,vehicledelivered){
              this.vehicleintimelabel=vehicleintime;
              this.vehicleloadstartdatetimelabel=vehicleloadstartdatetime;
              this.vehicleloadenddatetimelabel=vehicleloadenddatetime;
              this.vehicleouttimelabel=vehicleouttime;
              this.deliveredtimelabel=vehicledelivered;
          },

          confirm: function() {
            document.getElementById("myH1").style.backgroundColor = "green";
          },

          confirm1: function() {
            document.getElementById("myH2").style.backgroundColor = "green";
          },

          confirm2: function() {
            document.getElementById("myH3").style.backgroundColor = "green";
          },

          confirm3: function() {
            document.getElementById("myH4").style.backgroundColor = "green";
          },

          confirm4: function() {
            document.getElementById("myH5").style.backgroundColor = "green";
          }

    });
  })();
