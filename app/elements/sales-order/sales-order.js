(function() {
  'use strict';
  var item;
  var customer_id="";
  var customer_name="";
  Polymer({
    is: 'sales-order',

        autocompletearr:function(e)
          {
             item=e.detail.response.returnval;
             alert("items"+JSON.stringify(item));
          },
          jsoninfoResponse:function(){
        var labeljsondata=this.jsondata;
        document.querySelector("sales-order").getJsondata(labeljsondata[0].salesorderid,labeljsondata[0].customername,labeljsondata[0].itemid,labeljsondata[0].itemname,labeljsondata[0].itemdescription,labeljsondata[0].itemspecification,labeljsondata[0].container,labeljsondata[0].quantity,labeljsondata[0].deliveredquantity,labeljsondata[0].status);
      },

    saveitems1:function(){
      this.requesturl1="http://localhost:4000"+"/insertsales";
      var obj={};
      obj.salesid=this.salesid;
      // obj.ccname=customer_name;
      obj.customerid=customer_id;
      // obj.customerlocation=this.clocation;
      obj.id=this.iid;
      obj.itemname=this.iname;
      obj.description=this.idescription;
      obj.ispecification=this.ispecification;
      obj.rcoilsq=this.rcoils;
      obj.rtonq=this.rtons;
      obj.rdqty=this.dqty;
      obj.status=this.selectedcontainer;
      obj.datetimeq=this.min;
      obj.datetimeq1=this.min1;
      this.writeparam=obj;
      this.$.writeajax.generateRequest();
    },
    salesResponse:function(e){
      alert(e.detail.response.returnval);
    },
    getJsondata:function(salesid,customername,itemid,itemname,itemdescription,itemspecification,container,quantity,dquantity,status){
    this.salesorderid=salesid;
    this.customername=customername;
    // this.customerid=customerid;
    // this.customerlocation=customerlocation;
    this.ItemId=itemid;
    this.Itemname=itemname;
    this.itemdescription=itemdescription;
    this.itemspecification=itemspecification;
    this.container=container;
    this.quantity=quantity;
    this.dquantity=dquantity;
    this.status=status;

  },

//auto complete
        //backspace item display
    FnSearchEnquiry:function(e){
        if(e.keyCode==13|| e.keyCode==40)
        this.querySelector('#transportinput2').focus();

        var arr=[];
        arr.push({"itemdes":"-----Select-----"});
        this.querySelector('#transportinput2').style.visibility='visible';

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
            this.querySelector('#transportinput2').style.visibility='visible';
            var backsubval=(((this.value).substring(0,(len-1))).trim()).toUpperCase();
            for(var i=0;i<item.length;i++)
            {
              var subval=((item[i].customername).trim()).substring(0,backsubval.length);
              if((item[i].customername).toUpperCase().indexOf((this.value).toUpperCase())!=-1)
              {
                var obj={"itemdes":""};;

                obj.itemdes=item[i].customername;
                obj.customerid=item[i].customerid;
                // var obj1={"itemdes":obj.customername};
                // var obj2={"itemdes":obj.customerid};
                arr.push(obj);
                // arr.push(obj2);
              }
            }
            this.itemArray=arr;
          }
        }

        //while typing item display
        if(e.keyCode!=8&& e.keyCode!=16&& e.keyCode!=13 && e.keyCode!=38&&e.keyCode!=40&&e.keyCode!=37&&e.keyCode!=39)
        {
          if(this.itemflag=="true") {
            this.itemval = (this.value).toUpperCase()+String.fromCharCode((e.keyCode)).toUpperCase();
            this.itemflag="false";
          }
          else
          this.itemval = this.value +String.fromCharCode((e.keyCode));

          if(this.itemval.length>0)
          {
            for(var i=0;i<item.length;i++)
            {
              var subval=((item[i].customername).trim()).substring(0,this.itemval.length);
              // alert("subval"+subval);
             if(this.itemval == subval)
             {
              if((item[i].customername).toUpperCase().indexOf((this.itemval).toUpperCase())!=-1)
              {
                var obj={"itemdes":""};
                obj.itemdes=item[i].customername;
                obj.customerid=item[i].customerid;
                // var obj1={"itemdes":obj.customername};
                // var obj2={"itemdes":obj.customerid};
                arr.push(obj);
                // arr.push(obj2);
              }
            }
            }
            if(arr.length>0)
              this.itemArray=arr;
            else
            {
              var obj={"itemdes":"No items found"};
              obj.itemdes="";
              arr.push(obj);
              this.itemArray=arr;
            }
          }
        }
      },
      //customerid

      FnSelectEnquiry1:function(e){
      this.querySelector('#transportinput2').style.visibility='hidden';
      customer_name = e.target.selectedItem.textContent.trim();
      customer_id = e.target.selectedItem.value.trim();
      alert(customer_id+"  "+customer_name);
      // localStorage.setItem("curr_sess_studentname",student_name);
      this.itemArray=[];
      document.querySelector('#transportinput2').selected=-1;
      this.value=customer_name;
    }
  });
})();
