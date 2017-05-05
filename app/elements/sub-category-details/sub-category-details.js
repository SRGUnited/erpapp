(function() {
  'use strict';
  var item="";
  var subcategoryid="";
  var subcategoryname="";
Polymer({
  is: 'sub-category-details',
  ready:function(){
    // alert("hi");
  },
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
                  var subval=((item[i].subcategory_name).trim()).substring(0,backsubval.length);
                  if((item[i].subcategory_name).toUpperCase().indexOf((this.value).toUpperCase())!=-1)
                  {
                  var obj={"itemdes":""};;
                  obj.itemdes=item[i].subcategory_name;
                  obj.subcategory_id=item[i].subcategory_id;
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
                var subval=((item[i].subcategory_name).trim()).substring(0,this.itemval.length);
                if(this.itemval == subval)
                {
                if((item[i].subcategory_name).toUpperCase().indexOf((this.itemval).toUpperCase())!=-1)
                {
                  var obj={"itemdes":""};
                  obj.itemdes=item[i].subcategory_name;
                  obj.subcategory_id=item[i].subcategory_id;
                  // var obj1={"itemdes":obj.subcategory_name};
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
    subcategoryname = e.target.selectedItem.textContent.trim();
    subcategoryid = e.target.selectedItem.value.trim();
    // alert(subcategoryname);
    // alert(subcategoryid);
    sessionStorage.setItem("itemname1",subcategoryname);
    sessionStorage.setItem("itemid1",subcategoryid);
    this.itemArray=[];
    document.querySelector('#transportinput2').selected=-1;
    this.value=subcategoryname;
    document.querySelector("shopping-category").subcategoryid(subcategoryid);

  },

  subcategorylabelinfo:function(e){
    var jsonlabel=this.jsondata;
    this.select=jsonlabel[0].select;
  },
  subcategoryresponse:function(e){
    item=e.detail.response.returnval;
    // alert(JSON.stringify(item));
  },
  recievefun:function(){
    var Grn_categoryname = sessionStorage.getItem('categoryname');
    var Grn_categoryid = sessionStorage.getItem('categoryid');
    // alert(Grn_categoryname);
    // alert(Grn_categoryid);
    var obj={};
    obj.categoryname=Grn_categoryname;
    obj.categoryid=Grn_categoryid;
    this.categoryparameter=obj;
    // alert(categoryparameter);
    this.categoryequesturl="http://localhost:4000/subcategoryautocomplete";
    this.$.categoryajax.generateRequest();
  }

  });
})();
