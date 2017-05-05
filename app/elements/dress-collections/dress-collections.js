(function() {
  'use strict';
  var item="";
  var item_name="";
  var item_id="";
Polymer({
  is: 'dress-collections',
  FnSearchEnquiry:function(e){
      if(e.keyCode==13|| e.keyCode==40)
      this.querySelector('#transportinput2').focus();
      var arr=[];
      arr.push({"itemdes":"-----Select-----"});
      this.querySelector('#transportinput2').style.visibility='visible';
      if(e.keyCode==8)
            {
                  this.itemflag="true";
                  this.itemval="";
                  var len=(this.value).length;
                  if(len<=1)
                  {
                  this.querySelector('#transportinput2').style.visibility='hidden';
                  this.itemArray="";
                  this.itemval="";
                  }
                  if(len>1)
                  {
                  this.querySelector('#transportinput2').style.visibility='visible';
                  var backsubval=(((this.value).substring(0,(len-1))).trim()).toUpperCase();
                  for(var i=0;i<item.length;i++)
                  {
                  var subval=((item[i].itemname).trim()).substring(0,backsubval.length);
                  if((item[i].itemname).toUpperCase().indexOf((this.value).toUpperCase())!=-1)
                  {
                  var obj={"itemdes":""};;
                  obj.itemdes=item[i].itemname;
                  obj.itemid=item[i].itemid;
                  arr.push(obj);
                  }
                  }
                  this.itemArray=arr;
                  }
              }

      //while typing item display
      if(e.keyCode!=8&& e.keyCode!=16&& e.keyCode!=13 && e.keyCode!=38&&e.keyCode!=40&&e.keyCode!=37&&e.keyCode!=39)
          {
                if(this.itemflag=="true")
                {
                this.itemval = (this.value).toUpperCase()+String.fromCharCode((e.keyCode)).toUpperCase();
                this.itemflag="false";
                }
                else
                this.itemval = this.value +String.fromCharCode((e.keyCode));
                // alert(this.itemval.length);
                if(this.itemval.length>0)
                {
                for(var i=0;i<item.length;i++)
                {
                var subval=((item[i].itemname).trim()).substring(0,this.itemval.length);
                if(this.itemval == subval)
                {
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

    FnSelectEnquiry1:function(e){
    this.querySelector('#transportinput2').style.visibility='hidden';
    item_name = e.target.selectedItem.textContent.trim();
    item_id = e.target.selectedItem.value.trim();

    this.itemArray=[];
    document.querySelector('#transportinput2').selected=-1;
    this.value=item_name;
    document.querySelector("shopping-category").dressid(item_id);

  },

  dresslabelinfo:function(e){
    var jsonlabel=this.jsondata;
    this.dresslabel=jsonlabel[0].dresslabel;
  },
  dressresponse:function(e){
    item=e.detail.response.returnval;
    // alert(JSON.stringify(item));
  },
  dressrecievefun:function(){
    // alert("working");
    var Grn_itemname = sessionStorage.getItem('itemname1');
    var Grn_itemid = sessionStorage.getItem('itemid1');
    // alert(Grn_categoryname);
    // alert(Grn_categoryid);
    var obj={};
    obj.itemnameparam=Grn_itemname;
    obj.itemidparam=Grn_itemid;
    this.dressparameter=obj;
    // alert(categoryparameter);
    this.dressurl="http://localhost:4000/dresscollectionautocomplete";
    this.$.dressajax.generateRequest();
  }



  });
})();
