jQuery.sap.require("sap.m.MessageToast");
sap.ui.controller("sap.ui.demo.myFiori.view.AddContactChart", {

	
	
	handleAddObject : function (evt) { 
           
         
		
	},
	
	cancelAddObject : function (evt) {
		var context = evt.getSource().getBindingContext();
		this.nav.back("Master");
             this.nav.to("Detail", context);
	},
        getValue : function(evt){
            var successMsg = evt.mParameters.value;
            sap.m.MessageToast.show(successMsg);
        }
        
});