(function() {
  'use strict';
  Polymer({
    is: 'sliderstores-barnew',
    sliderfunction:function(arr)
 {
  var orderquantity=arr[0].orderquantity;
  var itemavailablequantity=arr[0].itemavailablequantity;
    this.max1=orderquantity;
    this.value1=itemavailablequantity;

 },
 confirm: function() {
    alert("confirm"+this.values);
    document.querySelector('slidersto-ironajax').values=this.values;
    document.querySelector('slidersto-ironajax').updatefunction();
   },

  });
})();
