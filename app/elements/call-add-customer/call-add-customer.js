Polymer({
  is:"call-add-customer",

  ready:function(){
    this.colvar=true;
  },
  checkid:function(data){
    alert(data);
  },
  clickFN:function(){
    if(this.colvar=="false"){
    this.$.suppliercollapse.toggle();
  }
  else{
  this.colvar="true";
  }
  },
  searchitemdet:function(){
    if(this.SupNameval!=""){
    document.querySelector("#anchorID").style.display="none";
     document.querySelector('#additemid').disabled=false;
    var obj={supname:this.SupNameval};
    document.querySelector("call-add-customer-ironajax").searchsidFN(obj);
  }
  else {
    alert("please enter valid customername");
  }
  },
  additemFn:function(){
    this.colvar="false";
    this.$.suppliercollapse.toggle();
    this.page="customer-to-additem";
    document.querySelector("customer-to-additem").check();
     document.querySelector("customer-to-additem").getsupId=this.cuid;
  },
  savebuttonFn:function(){
    document.querySelector("autogen-id").send("cus");
  },
  submitFn:function(data){
    document.querySelector('#additemid').disabled=false;
    alert(data);
    var postvalue ={
                    "sidval":data,
                    "snameval":this.SupNameval,
                    "adval1"  :this.Add1val,
                    "adval2"  :this.Add2val,
                    "adval3"  :this.Add3val,
                    "countryVal":this.selection,
                    "stateVal":this.selectionstate,
                    "citynameval"  :this.Citynameval,
                    "pinval"  :this.Pinval,
                    "mobnumval1"  :this.MobNumberval1,
                    "mobnumval2"  :this.MobNumberval2,
                    "emidval"  :this.EmIDval,
                    "statusval":"created"
                  };
                  this.cuid=this.SupIdval;
          document.querySelector("call-add-customer-ironajax").to_ironajax(postvalue);
          },
          datafetchFn:function(data){
            this.SupIdval=data[0].customerid;
            this.SupNameval=data[0].customername;
            this.Add1val=data[0].address1;
            this.Add2val=data[0].address2;
            this.Add3val=data[0].address3;
            this.selection=data[0].country;
            this.selectionstate=data[0].state;
            this.Citynameval=data[0].city;
            this.Pinval=data[0].pincode;
            this.MobNumberval1=data[0].mobile1;
            this.MobNumberval2=data[0].mobile2;
            this.EmIDval=data[0].email;
            this.staval=data[0].status;
            this.cuid=this.SupIdval;
          },
          getironpageFn:function(data){
            this.page="item-display";
            document.querySelector("item-display").getdataFn(data);
          },
  supplierFun:function(){
    this.$.cardact.toggle();
    },

  labelFn:function(d1){
    this.inputfield=d1;
    },
  getJsondata:function(sid,sname,Ad_1,Ad_2,Ad_3,country,ste,city,pin,mob1,mob2,email,status){
    this.Supid=sid;
    this.SupName=sname;
    this.Add1=Ad_1;
    this.Add2=Ad_2;
    this.Add3=Ad_3;
    this.countryname=country;
    this.State=ste;
    this.Cityname=city;
    this.Pin=pin;
    this.MobNumber1=mob1;
    this.MobNumber2=mob2;
    this.EmID=email;
    this.statuslabel=status;
  },
  getcountryjsondata:function(retrvjsondata){
    this.countryitems=retrvjsondata;
  },
  selectCountryFn:function(){
    document.querySelector("call-add-customer-ironajax").countryjsoninfo(this.selection);
  },
  getstatejsondata:function(getData){
    this.stateitems=getData;
  }
});
