(function() {
  'use strict';
    var item;
    var item1;
    var itemid;
    var customer_id="";
    var customer_name="";
    var supplier_name="";
    var supplier_id=""
  Polymer({
    is: 'sales-order',
        autocompletearr:function(e)
          {
            item=e.detail.response.returnval;
          },
          salesidfn:function()
          {
            document.querySelector('autogen-id').send('sal');
          },
          functionitem:function(){
            var obj={};
            obj.customerid=customer_id;
            this.writeparam=obj;
            this.urlname="http://localhost:4000/autocompleteitem";
            this.$.writeajax.generateRequest();
          },
          autocompletearr1:function(e)
              {
                 item1=e.detail.response.returnval;
              },
        jsoninfoResponse:function(){
            var labeljsondata=this.jsondata;
            document.querySelector("sales-order").getJsondata(labeljsondata[0].salesorderid,labeljsondata[0].customername,labeljsondata[0].itemid,labeljsondata[0].itemname,labeljsondata[0].itemdescription,labeljsondata[0].itemspecification,labeljsondata[0].container,labeljsondata[0].quantity,labeljsondata[0].deliveredquantity,labeljsondata[0].status);
          },

        saveitemsfn:function(data){
            var obj={};
            obj.salesid=data;
            obj.customerid=customer_id;
            obj.id=supplier_id;
            obj.description=this.idescription;
            obj.ispecification=this.ispecification;
            obj.rcoilsq=this.rcoils;
            obj.rtonq=this.rtons;
            obj.rdqty=this.dqty;
            obj.status=this.selectedcontainer;
            obj.datetimeq=this.min;
            obj.datetimeq1=this.min1;
            this.writeparam=obj;
            this.$.insertajax.generateRequest();
          },
        salesResponse:function(e){
            alert(e.detail.response.returnval);
        },
        getJsondata:function(salesid,customername,itemid,itemname,itemdescription,itemspecification,container,quantity,dquantity,status){
            this.salesorderid=salesid;
            this.customername=customername;
            this.ItemId=itemid;
            this.Itemname=itemname;
            this.itemdescription=itemdescription;
            this.itemspecification=itemspecification;
            this.container=container;
            this.quantity=quantity;
            this.dquantity=dquantity;
            this.status=status;
      },

//autocomplete-input
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
                    arr.push(obj);
                  }
                }
                this.itemArray=arr;
              }
            }

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
                  if(this.itemval == subval)
                 {
                  if((item[i].customername).toUpperCase().indexOf((this.itemval).toUpperCase())!=-1)
                  {
                    var obj={"itemdes":""};
                    obj.itemdes=item[i].customername;
                    obj.customerid=item[i].customerid;
                    arr.push(obj);
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


          FnSelectEnquiry1:function(e){
              this.querySelector('#transportinput2').style.visibility='hidden';
              customer_name = e.target.selectedItem.textContent.trim();
              customer_id = e.target.selectedItem.value.trim();
              this.itemArray=[];
              document.querySelector('#transportinput2').selected=-1;
              this.value=customer_name;
              alert(customer_id);
              sessionStorage.setItem('customerid1',customer_id);
              // document.querySelector('home-page').FnSetPage('sales-order');
      },

      //auto complete itemname
              //backspace item display
          FnSearchEnquiry1:function(e){
              if(e.keyCode==13|| e.keyCode==40)
              this.querySelector('#transportinput3').focus();

              var arr=[];
              arr.push({"itemdes1":"-----Select-----"});
              this.querySelector('#transportinput3').style.visibility='visible';

              if(e.keyCode==8){
                this.itemflag="true";
                this.itemval="";
                var len=(this.value1).length;
                if(len<=1){
                  this.querySelector('#transportinput3').style.visibility='hidden';
                  this.itemArray1="";
                  this.itemval="";
                }
                if(len>1){
                  this.querySelector('#transportinput3').style.visibility='visible';
                  var backsubval=(((this.value1).substring(0,(len-1))).trim()).toUpperCase();
                  for(var i=0;i<item1.length;i++)
                  {
                    var subval=((item1[i].itemname).trim()).substring(0,backsubval.length);
                    if((item1[i].itemname).toUpperCase().indexOf((this.value1).toUpperCase())!=-1)
                    {
                      var obj={"itemdes1":""};;

                      obj.itemdes1=item1[i].itemname;
                      obj.itemid=item1[i].itemid;
                      arr.push(obj);
                    }
                  }
                  this.itemArray1=arr;
                }
              }

              //while typing item display
              if(e.keyCode!=8&& e.keyCode!=16&& e.keyCode!=13 && e.keyCode!=38&&e.keyCode!=40&&e.keyCode!=37&&e.keyCode!=39)
              {
                if(this.itemflag=="true") {
                  this.itemval = (this.value1).toUpperCase()+String.fromCharCode((e.keyCode)).toUpperCase();
                  this.itemflag="false";
                }
                else
                this.itemval = this.value1 +String.fromCharCode((e.keyCode));

                if(this.itemval.length>0)
                {
                  for(var i=0;i<item1.length;i++)
                  {
                    var subval=((item1[i].itemname).trim()).substring(0,this.itemval.length);
                   if(this.itemval == subval)
                   {
                    if((item1[i].itemname).toUpperCase().indexOf((this.itemval).toUpperCase())!=-1)
                    {
                      var obj={"itemdes":""};
                      obj.itemdes1=item1[i].itemname;
                      obj.itemid=item1[i].itemid;
                      arr.push(obj);
                      alert("ashgdf"+JSON.stringify(obj));
                    }
                  }
                  }
                  if(arr.length>0)
                    this.itemArray1=arr;
                  else
                  {
                    var obj={"itemdes":"No items found"};
                    obj.itemdes1="";
                    arr.push(obj);
                    this.itemArray1=arr;
                  }
                }
              }
            },
            //customerid

            FnSelectEnquiry2:function(e){
            this.querySelector('#transportinput3').style.visibility='hidden';
            supplier_name = e.target.selectedItem.textContent.trim();
            supplier_id = e.target.selectedItem.value.trim();
            alert(supplier_name+"  "+supplier_id);
            // localStorage.setItem("curr_sess_studentname",student_name);
            this.itemArray1=[];
            document.querySelector('#transportinput3').selected=-1;
            this.value1=supplier_name;
          }
  });
})();
