jQuery.sap.require("sap.ui.demo.myFiori.app.config");
jQuery.sap.require("sap.m.MessageToast");
sap.ui.jsview("sap.ui.demo.myFiori.view.App", {

	getControllerName: function () {
		return "sap.ui.demo.myFiori.view.App";
	},
	
	createContent: function (oController) {
		if(jQuery.sap.getUriParameters().get("mode") === "LeftMenuNavi"){
                    sap.ui.demo.myFiori.app.config.LaunchpadMode = false;
                }
		// to avoid scroll bars on desktop the root view must be set to block display
		this.setDisplayBlock(true);
		

                this.app = new sap.m.SplitApp({
                afterDetailNavigate: function() {
                    if (sap.ui.Device.system.phone || sap.ui.demo.myFiori.app.config.LaunchpadMode) {
                        //this.hideMaster();
                        
                        
                    }
                },
                    homeIcon: {
                        'phone': 'img/57_iPhone_Desktop_Launch.png',
                        'phone@2': 'img/114_iPhone-Retina_Web_Clip.png',
                        'tablet': 'img/72_iPad_Desktop_Launch.png',
                        'tablet@2': 'img/144_iPad_Retina_Web_Clip.png',
                        'favicon': 'img/favicon.ico',
                        'precomposed': false
                    },
                     
                }); 

		 
              
                
		// load the master page
		//var master = sap.ui.xmlview("Master", "sap.ui.demo.myFiori.view.Master");
		var Login = sap.ui.xmlview("Play", "sap.ui.demo.myFiori.view.Play");
                //the line below is used allow the master page gain access to some fucntions in side APP.controller.js
                //hence you can call this.nav.back  which is a defined function in App.view controller from a child element 
		Login.getController().nav = this.getController();
		this.app.addPage(Login, true);
		//master.getController().nav = this.getController();
		//this.app.addPage(master, true);
          this.app.setMode(sap.m.SplitAppMode.ShowHideMode); 
                 
		
		// load the empty page
		//var empty = sap.ui.xmlview("Empty", "sap.ui.demo.myFiori.view.Chart");
		var empty = sap.ui.xmlview("Empty", "sap.ui.demo.myFiori.view.Welcome");
		this.app.addPage(empty, false);
		
		return this.app;
	}
});