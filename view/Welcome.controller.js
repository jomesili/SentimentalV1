jQuery.sap.require("sap.ui.demo.myFiori.util.Formatter");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("sap.ui.demo.myFiori.view.Welcome", {

	onInit: function(){
		
        
                 if (sap.ui.Device.system.phone=== true ||sap.ui.Device.system.tablet=== true) {
                     
                 	if(sap.ui.Device.orientation.portrait === true){
                 		this.getView().byId("swipper").setText("Swipe to Login");
                 		 
              		    setInterval(function () {
              		        $('#Empty--swipper').fadeIn(1000).delay(1000).fadeOut(500).delay(1000).fadeIn(1000);
              		    }, 2000);;
                 		
                 	}
                 }
                 else{
                 this.getView().byId("swipper").setText("");
                	 
                	 
              		 
                 }
                 

          
                
	},
	
	handleAddObject : function (evt) {
           
          
           
           this.app = new sap.m.SplitApp({
                afterDetailNavigate: function() {
                    if (sap.ui.Device.system.phone === "true" || sap.ui.demo.myFiori.app.config.LaunchpadMode) {
                        //this.hideMaster();
                    	this.getView().byId("swipper").visibility(true)
                    }
                    else{
                    	this.getView().byId("swipper").visibility(false)
                    }
                },
                    homeIcon: {
                        'phone': 'img/57_iPhone_Desktop_Launch.png',
                        'phone@2': 'img/114_iPhone-Retina_Web_Clip.png',
                        'tablet': 'img/72_iPad_Desktop_Launch.png',
                        'tablet@2': 'img/144_iPad_Retina_Web_Clip.png',
                        'favicon': 'img/favicon.ico',
                        'precomposed': false
                    }
                }); 
                           
                
		// load the master page
		var master = sap.ui.xmlview("Master1", "sap.ui.demo.myFiori.view.Master");
		//master.getController().nav = this.getController();
		this.app.addPage(master, true);
                
		
		// load the empty page
		var empty = sap.ui.xmlview("Empty1", "sap.ui.demo.myFiori.view.Empty");
		this.app.addPage(empty, false);
		
		return this.app;
		
	},
	
	handleLineItemPresso : function (evt) {
		
	}
});