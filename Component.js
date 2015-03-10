jQuery.sap.declare("sap.ui.demo.myFiori.Component");

sap.ui.core.UIComponent.extend("sap.ui.demo.myFiori.Component", {

	createContent : function() {

		// create root view
		var oView = sap.ui.view({
			id : "app",
			viewName : "sap.ui.demo.myFiori.view.App",
			type : "JS",
			viewData : { component : this }
		});

		// set i18n model
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			//bundleUrl : "i18n/messageBundle.properties"
			bundleUrl : "i18n/messageBundle.hdbtextbundle"
		});
		oView.setModel(i18nModel, "i18n");
		
//		 var oModel = new sap.ui.model.odata.ODataModel("services/MY_FILE_UPLOAD_TABLE.xsodata",false);  
//		oView.setModel(oModel);
		
	    var SectorModel = new sap.ui.model.json.JSONModel("model/sector.json");
	    oView.setModel(SectorModel, "SectorModel");
		
		var oModel2 = new sap.ui.model.json.JSONModel("services/companyCollectionService.xsjs");
		oView.setModel(oModel2 );
//		// Using OData model to connect against a real service
//		var url = "/proxy/http/<server>:<port>/sap/opu/odata/sap/ZGWSAMPLE_SRV/";
//		var oModel = new sap.ui.model.odata.ODataModel(url, true, "<user>", "<password>");
//		oView.setModel(oModel);

		// Using a local model for offline development
		

		// set device model
		var deviceModel = new sap.ui.model.json.JSONModel({
			isPhone : jQuery.device.is.phone,
			isTouch : sap.ui.Device.support.touch,
            isNoTouch : !sap.ui.Device.support.touch,
			listMode : (jQuery.device.is.phone) ? "None" : "SingleSelectMaster",
			listItemType : (jQuery.device.is.phone) ? "Active" : "Inactive"
		});
		deviceModel.setDefaultBindingMode("OneWay");
		oView.setModel(deviceModel, "device");

		// done
		return oView;
	}
});