jQuery.sap.require("sap.ui.demo.myFiori.util.Formatter");
jQuery.sap.require("sap.ui.demo.myFiori.util.Grouper");
jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("sap.ui.demo.myFiori.view.Master", {
    
    onInit: function() {
    var bIsPhone = sap.ui.Device.system.phone;
    this.getView().setModel(new sap.ui.model.json.JSONModel({
      imageWidth: bIsPhone ? "6em" : "10em",
    }), "setRi18n");
    
    //var listNum=  this.getView().byId("list");
    
  //if(sap.ui.getCore().byId("list"))){
  //    sap.m.MessageToast.show(sap.ui.getCore().byId("list").getLength())
  //} 
    
  },
    handleImage3Press: function(evt) {
    this.nav.moveToChartView ("Chart");
    var oModel2 = new sap.ui.model.json.JSONModel("services/companyCollectionService.xsjs");
	sap.ui.getCore().byId("app").setModel(oModel2);
	
 
	var chartsView= sap.ui.getCore().byId("Chart");
	if(chartsView != null) {
	      var oController = chartsView.getController();
	      oController.resetData();
	      
	      
	} 
     else{
         sap.m.MessageToast.show("UnSuccessful");
     }
	
  },
	handleListItemPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		this.nav.to("Detail", context);
		
	},
	
	handleSearch : function (evt) {
		
		// create model filter
		var filters = [];
		var query = evt.getParameter("query");
		if (query && query.length > 0) {
			var filter = new sap.ui.model.Filter("COMPANY_NAME", sap.ui.model.FilterOperator.Contains, query);
			filters.push(filter);
		}
		
		// update list binding
		var list = this.getView().byId("list");
		var binding = list.getBinding("items");
		binding.filter(filters);
	},
	
	handleListSelect : function (evt) {
		var context = evt.getParameter("listItem").getBindingContext();
		//sap.ui.getCore().SelectedItem = new Object();
       // sap.ui.getCore().SelectedItem.coyName = this.getView().byId("list").getSelectedItem().mProperties.title; 
	   // sap.ui.getCore().byId("AddCompanyContact").getView().byId("company").setValue(sap.ui.getCore().SelectedItem.coyName);
		this.nav.to("Detail", context);
	},

	handleGroup : function (evt) {

		// compute sorters
		var sorters = [];
		var item = evt.getParameter("selectedItem");
		var key = (item) ? item.getKey() : null;
		if ("Sector" === key || "LifecycleStatus" === key) {
			sap.ui.demo.myFiori.util.Grouper.bundle = this.getView().getModel("i18n").getResourceBundle();
			var grouper = sap.ui.demo.myFiori.util.Grouper[key];
			sorters.push(new sap.ui.model.Sorter(key, true, grouper));
		}

		// update binding
		var list = this.getView().byId("list");
		var oBinding = list.getBinding("items");
		oBinding.sort(sorters);
	}
	
});