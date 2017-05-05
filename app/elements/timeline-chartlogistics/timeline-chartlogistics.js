 (function() {
    'use strict';
 Polymer({
      is: 'timeline-chartlogistics',
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
            document.querySelector('#dis2').disabled=false;
            document.querySelector('#dis1').disabled=true;
            },

          confirm1: function() {
            var d = new Date();
            var a=d.getDate();
            var b=d.getMonth();
            var c=d.getFullYear();
            var g=d.getHours();
            var e=d.getMinutes();
            var f=d.getSeconds();
            var aa=a+"/"+b+"/"+c+" "+g+":"+e+":"+f;
            document.getElementById("myH2").style.backgroundColor = "green";
            document.querySelector('timeline-chartlogistics').x=aa;
            document.querySelector('ajax-timelinelog').start=aa;
            document.querySelector('ajax-timelinelog').vehiclenumber=this.vehicleno;
            document.querySelector('ajax-timelinelog').updatefunction();
            document.querySelector('#dis1').disabled=true;
            document.querySelector('#dis3').disabled=false;
            document.querySelector('#dis2').disabled=true;
            },

          confirm2: function() {
            var d = new Date();
            var a=d.getDate();
            var b=d.getMonth();
            var c=d.getFullYear();
            var g=d.getHours();
            var e=d.getMinutes();
            var f=d.getSeconds();
            var aa1=a+"/"+b+"/"+c+" "+g+":"+e+":"+f;
            document.getElementById("myH3").style.backgroundColor = "green";
            document.querySelector('timeline-chartlogistics').y=aa1;
            document.querySelector('ajax-timelinelog').end=aa1;
            document.querySelector('ajax-timelinelog').vehiclenumber=this.vehicleno;
            document.querySelector('ajax-timelinelog').updateendfunction();
            document.querySelector('#dis2').disabled=true;
            document.querySelector('#dis4').disabled=false;
            document.querySelector('#dis3').disabled=true;
          },

          confirm3: function() {
            document.getElementById("myH4").style.backgroundColor = "green";
            document.querySelector('#dis3').disabled=true;
            document.querySelector('#dis5').disabled=false;
            document.querySelector('#dis4').disabled=true;
          },

          confirm4: function() {
            document.getElementById("myH5").style.backgroundColor = "green";
            document.querySelector('#dis5').disabled=true;
            alert("LOAD DELIVERED")
          },
          loadstart:function(){
            var d = new Date();
            var a=d.getDate();
            var b=d.getMonth();
            var c=d.getFullYear();
            var g=d.getHours();
            var e=d.getMinutes();
            var f=d.getSeconds();
            document.getElementById("loadstart1").innerHTML = a+"/"+b+"/"+c+" "+g+":"+e+":"+f;
           },
          loadend:function(){
            var d = new Date();
            var a=d.getDate();
            var b=d.getMonth();
            var c=d.getFullYear();
            var g=d.getHours();
            var e=d.getMinutes();
            var f=d.getSeconds();

            document.getElementById("loadstart2").innerHTML = a+"/"+b+"/"+c+" "+g+":"+e+":"+f;
          }



    });
  })();
