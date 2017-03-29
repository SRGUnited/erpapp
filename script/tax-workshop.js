Polymer({
	is:"tax-workshop",

  jsoninfoResponse:function(){
    var labeljsondata=this.jsondata;
      this.panno=labeljsondata[0].pan1;
      this.tanno=labeljsondata[0].tan1;
      this.cinno=labeljsondata[0].cin1;
      this.tinno=labeljsondata[0].tin1;
      this.cstno=labeljsondata[0].cst1;
      },

	Fnsave:function(){
			this.$.ironajaxcontent.saveinfoService(this.pan,this.tann,this.cin,this.tin,this.cst);
			},
});
