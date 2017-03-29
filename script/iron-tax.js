Polymer({
  is:"iron-tax",

  saveinfoService:function(dpanno,dtanno,dcinno,dtinno,dcstno){
    this.taxinfourl="http://localhost:4000"+"/Taxsaveinfo";
      var data={};
		    data.pan_no=this.dpanno;
        data.tann_no=this.dtanno;
        data.cin_no=this.dcinno;
        data.tin_no=this.dtinno;
        data.cst_no=this.dcstno;
        this.taxinfoparam=data;
        this.$.taxinfo.generateRequest();
        },

    taxinfoResponse:function(e){
      alert("saved");
      alert(e.detail.response.returnvalue);
        }
});
