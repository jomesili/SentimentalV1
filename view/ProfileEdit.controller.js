jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("sap.ui.commons.TextField");
sap.ui.controller("sap.ui.demo.myFiori.view.ProfileEdit", {

	 onInit : function () {
	  
    // attach handlers for validation errors
    
  },
  updateContact : function (evt) {
		var context = evt.getSource().getBindingContext();
		this.nav.to("UpdateContact", context);
	},
	moveToBack: function(evt){
        
        this.nav.back("Detail");
       
     },
     
     openDialog: function (sType) {
    	    if (!this[sType]) {
    	      this[sType] = sap.ui.xmlfragment(
    	        "sap.m.sample.Dialog." + sType + "Dialog",
    	        this // associate controller with the fragment
    	      );
    	      this.getView().addDependent(this[sType]);
    	    }

    	    this[sType].bindElement("/ProductCollection/0");
    	    // toggle compact style
    	    jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this[sType]);
    	    this[sType].open();
    	  },

    onStdDialogPress: function (oEvent) {
    	    this.openDialog('Std');
    	  },

	
	
});