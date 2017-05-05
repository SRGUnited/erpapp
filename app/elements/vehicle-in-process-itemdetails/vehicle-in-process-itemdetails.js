(function() {
  'use strict';
    var item="";
    var item_id="";
    var item_name="";
    var containeridvalue="";
    var unitofmeasureidvalue="";
    var invoicenovalue="";
    var invoicedatevalue="";
    var irnnumber="";
    var vehiclenamevalue="";
    var vehiclenovalue="";
    var drivernamevalue="";
    var drivernovalue="";
    var supplieridvalue="";
    var subval1=[];
    var stores="stores";
  Polymer({
    is: 'vehicle-in-process-itemdetails',

    savebtn:function(){
      document.querySelector("autogen-id").send("irn");
      document.querySelector("vehicle-in-process-itemdetails").autogenbackfunction();

    },
    autogenbackfunction:function(){
      document.querySelector("vehicle-in-process-invoiceno").invoiceprocess();
      document.querySelector("vehicle-in-process-driverdetails").vehicleprocess();
      document.querySelector("vehicle-in-process-suppliername").supplierautocomplete();
    },
    //  from auto generate irn
    saveitemauto:function(irn){
    irnnumber=irn;

    var invoiceobj={};
    invoiceobj.invoicenovalue=invoicenovalue;
    invoiceobj.invoicedatevalue=invoicedatevalue;
    invoiceobj.irnnumber=irnnumber;
    this.invoiceparameter=invoiceobj;
    this.invoiceurl="http://localhost:4000/invoicesaving";
    this.$.invoiceajax.generateRequest();

    var vehicleobj={};
    vehicleobj.vehiclenamevalue=vehiclenamevalue;
    vehicleobj.vehiclenovalue=vehiclenovalue;
    vehicleobj.drivernamevalue=drivernamevalue;
    vehicleobj.drivernovalue=drivernovalue;
    vehicleobj.irnnumber=irnnumber;
    this.vehicleparameter=vehicleobj;
    this.vehicleurl="http://localhost:4000/vehiclesaving";
    this.$.vehicleajax.generateRequest();

    var supplieridobj={};
    supplieridobj.supplieridvalue=supplieridvalue;
    supplieridobj.irnnumber=irnnumber;
    supplieridobj.item_id=item_id;
    supplieridobj.containeridvalue=containeridvalue;
    supplieridobj.containergetvalue=this.containergetvalue;
    supplieridobj.qtygetvalue=this.qtygetvalue
    supplieridobj.unitofmeasureidvalue=unitofmeasureidvalue;
    supplieridobj.remarks=this.remarksvalue;
<<<<<<< HEAD
    supplieridobj.stores=stores;
=======
>>>>>>> 94126fca815cb9bd1bdbb97bcc82f117484cedfc
    this.supplierparameter=supplieridobj;
    alert(JSON.stringify(this.supplierparameter));
    this.supplierurl="http://localhost:4000/supplieridsaving";
    this.$.supplieridajax.generateRequest();
        },


    // function from all elements
    invoiceprocessback:function(invoiceno1,invoicedate)
    {
    invoicenovalue=invoiceno1;
    invoicedatevalue=invoicedate;
    },
    vehicleprocessback:function(vehiclename,vehicleno,drivername,drivernumber)
    {
    vehiclenamevalue=vehiclename;
    vehiclenovalue=vehicleno;
    drivernamevalue=drivername;
    drivernovalue=drivernumber;
    },
    supplierprocessback:function(supplier_id)
    {
    supplieridvalue=supplier_id;
    },
    // all responses starts
    invoiceresponse:function(e)
    {
      var arr=e.detail.response.returnval;
    },
    vehicleresponse:function(e)
    {
      var arr=e.detail.response.returnval;
    },
    supplierresponse:function(e)
    {
      var arr=e.detail.response.returnval;
    },
    itemdetailresponse:function(e)
    {
      var arr=e.detail.response.returnval;
    },

    // item detail auto complete functions
    onclickfun:function()
    {
        var Grn_suppliername = sessionStorage.getItem('suppliername1');
        var Grn_supplierid = sessionStorage.getItem('supplierid1');
        var obj={};
        obj.suppliername=Grn_suppliername;
        obj.supplierid=Grn_supplierid;
        this.itemparameter=obj;
        this.itemrequesturl="http://localhost:4000/itemdescriptionautocomplete";
        this.$.itemajax.generateRequest();
    },
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 94126fca815cb9bd1bdbb97bcc82f117484cedfc
    itemautocomplete:function(e)
    {
     var itemvalues=e.detail.response.returnval;
              for(var i=0;i<=itemvalues.length;i++)
              {
                containeridvalue=itemvalues[i].containerid;
                unitofmeasureidvalue=itemvalues[i].unitofmeasures;
                item=[{"itemname":itemvalues[i].itemname,"itemid":itemvalues[i].itemid}];
                document.querySelector("vehicle-in-process-itemdetails").FnSearchEnquiry(item);
              }
<<<<<<< HEAD
=======
=======
    itemautocomplete:function(e){
      alert(JSON.stringify(e.detail.response.returnval));
       var itemvalues=e.detail.response.returnval;
      for(var i=0;i<=itemvalues.length;i++){
      containeridvalue=itemvalues[i].containerid;
      // alert(JSON.stringify(containeridvalue));
      unitofmeasureidvalue=itemvalues[i].unitofmeasures;
     item=[{"itemname":itemvalues[i].itemname,"itemid":itemvalues[i].itemid}];
       document.querySelector("vehicle-in-process-itemdetails").FnSearchEnquiry(item);
      // alert(JSON.stringify(item));
    }
>>>>>>> 08defefa01ef3184a9449267b75fde9388f3fb47
>>>>>>> 94126fca815cb9bd1bdbb97bcc82f117484cedfc
    },
    containerfunction:function()
    {
        var obj={};
        obj.containeridvalue=containeridvalue;
        this.containerparameter=obj;
        this.containerrequesturl="http://localhost:4000/containeridfetch";
        this.$.containerajax.generateRequest();
    },
    containerresponse:function(e)
    {
       var containervalues1=e.detail.response.returnval;
       var containervalues2=containervalues1[0].containername;
       this.containeridvalue=containervalues2;
    },
    quantityfunction:function()
    {
      var obj={};
      obj.unitofmeasureidvalue=unitofmeasureidvalue;
      this.quantityparameter=obj;
      this.quantityurl="http://localhost:4000/quantityidfetch";
      this.$.quantityajax.generateRequest();
    },
    quantityresponse:function(e)
    {
      var unitofmeasurevalues1=e.detail.response.returnval;
      var unitofmeasurevalues2=unitofmeasurevalues1[0].unit_of_measure_name;
     this.qtyidvalue=unitofmeasurevalues2;
    },

<<<<<<< HEAD
    FnSearchEnquiry:function(e)
    {
=======
<<<<<<< HEAD
    FnSearchEnquiry:function(e)
    {
=======
    FnSearchEnquiry:function(e){


>>>>>>> 08defefa01ef3184a9449267b75fde9388f3fb47
>>>>>>> 94126fca815cb9bd1bdbb97bcc82f117484cedfc
        if(e.keyCode==13|| e.keyCode==40)
        this.querySelector('#transportinput2').focus();

        var arr=[];
        arr.push({"itemdes":"-----Select-----"});
        this.querySelector('#transportinput2').style.visibility='visible';
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 94126fca815cb9bd1bdbb97bcc82f117484cedfc
        if(e.keyCode==8)
        {
        this.itemflag="true";
        this.itemval="";
        var len=(this.value).length;
    if(len<=1){
            this.querySelector('#transportinput2').style.visibility='hidden';
            this.itemArray="";
            this.itemval="";
                  }
            if(len>1)
            {
<<<<<<< HEAD
=======
=======

        if(e.keyCode==8){
          this.itemflag="true";
          this.itemval="";
          var len=(this.value).length;
          if(len<=1){
            this.querySelector('#transportinput2').style.visibility='hidden';
            this.itemArray="";
            this.itemval="";
          }
          if(len>1){
>>>>>>> 08defefa01ef3184a9449267b75fde9388f3fb47
>>>>>>> 94126fca815cb9bd1bdbb97bcc82f117484cedfc
            this.querySelector('#transportinput2').style.visibility='visible';
            var backsubval=(((this.value).substring(0,(len-1))).trim()).toUpperCase();
            for(var i=0;i<item.length;i++)
            {
<<<<<<< HEAD
            var subval=((item[i].itemname).trim()).substring(0,backsubval.length);
            if((item[i].itemname).toUpperCase().indexOf((this.value).toUpperCase())!=-1)
            {
            var obj={"itemdes":""};;
            obj.itemdes=item[i].itemname;
            obj.itemid=item[i].itemid;
                        // var obj1={"itemdes":obj.itemname};
            arr.push(obj);
            }
<<<<<<< HEAD
            }
            this.itemArray=arr;
            }
            }
        //while typing item display
    if(e.keyCode!=8&& e.keyCode!=16&& e.keyCode!=13 && e.keyCode!=38&&e.keyCode!=40&&e.keyCode!=37&&e.keyCode!=39)
          {
          // alert("ok");
          if(this.itemflag=="true")
=======
            }
            this.itemArray=arr;
            }
            }
=======
              var subval=((item[i].itemname).trim()).substring(0,backsubval.length);
              if((item[i].itemname).toUpperCase().indexOf((this.value).toUpperCase())!=-1)
              {
                var obj={"itemdes":""};;

                obj.itemdes=item[i].itemname;
                obj.itemid=item[i].itemid;
                // var obj1={"itemdes":obj.itemname};

                arr.push(obj);
              }
            }
            this.itemArray=arr;
          }
        }

>>>>>>> 08defefa01ef3184a9449267b75fde9388f3fb47
        //while typing item display
    if(e.keyCode!=8&& e.keyCode!=16&& e.keyCode!=13 && e.keyCode!=38&&e.keyCode!=40&&e.keyCode!=37&&e.keyCode!=39)
>>>>>>> 94126fca815cb9bd1bdbb97bcc82f117484cedfc
          {
          // alert("ok");
          if(this.itemflag=="true") {
            this.itemval = (this.value).toUpperCase()+String.fromCharCode((e.keyCode)).toUpperCase();
            this.itemflag="false";
          }
          else{
          this.itemval = this.value +String.fromCharCode((e.keyCode));
          // alert(this.itemval);
}
          if(this.itemval.length>0)
          {
            for(var i=0;i<item.length;i++)
            {
              // alert("ok ok");
<<<<<<< HEAD
           var subval=((item[i].itemname).trim()).substring(0,this.itemval.length);
              // alert(JSON.stringify(item[i].itemname));
              // alert(subval);
           if(this.itemval == subval)
            {
              // alert(this.itemval);
              alert("equal");
              if((item[i].itemname).toUpperCase().indexOf((this.itemval).toUpperCase())!=-1)
              {
              var obj={"itemdes":""};
              obj.itemdes=item[i].itemname;
              obj.itemid=item[i].itemid;
                  // var obj1={"itemdes":obj.itemname};
              arr.push(obj);
                }
              }
              break;
           }
          if(arr.length>0)
          this.itemArray=arr;
          else
          {
          var obj={"itemdes":"No items found"};
          obj.itemdes;
          arr.push(obj);
          this.itemArray=arr;
          }
          }
          }
          },
<<<<<<< HEAD
=======
=======

            var subval=((item[i].itemname).trim()).substring(0,this.itemval.length);
              alert(JSON.stringify(item[i].itemname));
              // alert(this.itemval);
              // alert(JSON.stringify(this.itemval));
              // alert(this.itemval.length);
              alert(subval);
                // subval1.push(subval);
             if(this.itemval == subval)
             {
               alert("equal");
              if((item[i].itemname).toUpperCase().indexOf((this.itemval).toUpperCase())!=-1)
              {
                var obj={"itemdes":""};
                obj.itemdes=item[i].itemname;
                obj.itemid=item[i].itemid;
                // var obj1={"itemdes":obj.itemname};
                arr.push(obj);
              }
            }
            }
            if(arr.length>0)
              this.itemArray=arr;
            else
            {
              var obj={"itemdes":"No items found"};
              obj.itemdes;
              arr.push(obj);
              this.itemArray=arr;
            }
          }
        }
      },

>>>>>>> 08defefa01ef3184a9449267b75fde9388f3fb47
>>>>>>> 94126fca815cb9bd1bdbb97bcc82f117484cedfc
      FnSelectEnquiry1:function(e){
      this.querySelector('#transportinput2').style.visibility='hidden';
      item_name = e.target.selectedItem.textContent.trim();
      item_id = e.target.selectedItem.value.trim();
      this.itemArray=[];
      document.querySelector('#transportinput2').selected=-1;
      this.value=item_name;
        },
    itemlabelinfo:function(e){
      var jsonlabel=this.jsondata;
      this.Itemname=jsonlabel[0].itemname;
      this.container=jsonlabel[0].container;
      this.quantityRecieved=jsonlabel[0].quantityrecieved;
      this.Remarks=jsonlabel[0].remarks;
    }
    });
})();
