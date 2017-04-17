  Polymer({
    is: 'call-ceo-card',

    handleResponse:function(e){
      this.newitems=e.detail.response.returnval;
      this.newitemsfg=e.detail.response.returnfg;
    }
  });
