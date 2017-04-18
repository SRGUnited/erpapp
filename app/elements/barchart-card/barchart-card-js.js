(function() {
  'use strict';
Polymer({
  is: "barchart-card",
  barchartloading:function(e){
      document.getElementById("chartContainer").innerHTML = "barchart is loaded.";
      var dataPoints = [];
      for(var key in e[0]){
        dataPoints.push({label: key, y: parseInt(e[0][key])});
    }
      var chart = new CanvasJS.Chart("chartContainer",{
          data: [{
          type: "column",
          dataPoints: dataPoints
        }]
      });
      chart.render();
    }
});
})();
