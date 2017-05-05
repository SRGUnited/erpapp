(function() {
  'use strict';
  var item="";
  var category_id="";
  var category_name="";
  Polymer({
    is: 'category-details',
        categoryautocompletefunction:function(e)
            {
            item=e.detail.response.returnval;
            // alert(JSON.stringify(item));
            },
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
            var subval=((item[i].category_name).trim()).substring(0,backsubval.length);
            if((item[i].category_name).toUpperCase().indexOf((this.value).toUpperCase())!=-1)
            {
            var obj={"itemdes":""};;
            obj.itemdes=item[i].category_name;
            obj.category_id=item[i].category_id;
            // var obj1={"itemdes":obj.category_name};
            arr.push(obj);
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
            // alert(this.itemval.length);
            if(this.itemval.length>0)
            {
            for(var i=0;i<item.length;i++)
            {
            var subval=((item[i].category_name).trim()).substring(0,this.itemval.length);
            if(this.itemval == subval)
            {
            if((item[i].category_name).toUpperCase().indexOf((this.itemval).toUpperCase())!=-1)
            {
            var obj={"itemdes":""};
            obj.itemdes=item[i].category_name;
            obj.category_id=item[i].category_id;
            // var obj1={"itemdes":obj.category_name};
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
            category_name = e.target.selectedItem.textContent.trim();
            category_id = e.target.selectedItem.value.trim();
            // alert(category_name);
            // alert(category_id);
            sessionStorage.setItem("categoryname",category_name);
            sessionStorage.setItem("categoryid",category_id);
            this.itemArray=[];
            document.querySelector('#transportinput2').selected=-1;
            this.value=category_name;
            document.querySelector("shopping-category").categoryid(category_id);
           },

         categorylabelinfo:function(e){
            var jsonlabel=this.jsondata;
            this.categoryname=jsonlabel[0].categoryname;
          }
    });
})();
