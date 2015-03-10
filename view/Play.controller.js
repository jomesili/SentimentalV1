jQuery.sap.require("sap.m.MessageToast");
sap.ui.controller("sap.ui.demo.myFiori.view.Play", {

	    onInit  :function (oEvent){
	        
	        
	        var view = this.getView();
	        
	        var theState=view.byId("keepLogged").getSelected()  
	       
	       // sap.m.MessageToast.show(""+theState);
	         
	        var userName=this.getCookie("username");
	        var passWord=this.getCookie("password");
            if (userName != "") {
                view.byId("username").setValue(userName);
                view.byId("password").setValue(passWord);
                view.byId("keepLogged").setSelected(true) 
                this.handleAddObject();
                //alert("Welcome again " + user);
            } 
        
	    },
	    
	    checkState: function(oEvent){
	        var view = this.getView();
	        var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
	        var theState=view.byId("keepLogged").getSelected()  
	        if(theState===true){
	            if(view.byId("username").getValue()==="" || view.byId("password").getValue()===""){
	                 jQuery.sap.require("sap.m.MessageBox");
              sap.m.MessageBox.alert("Ensure to complete both Username and password fields.",
            		  function(oAction) {
          				if (sap.m.MessageBox.Action.OK === oAction) {
        					
          					 view.byId("keepLogged").setSelected(false) 
        					}
        			}, "");
	                  
                     
	            }
	            else{
	                 this.setCookie("username",view.byId("username").getValue(),3);
	                 this.setCookie("password",view.byId("password").getValue(),3);
	            }
	        }
	        
	        if(theState===false){
	            document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
	            document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
	            // sap.m.MessageToast.show("destroyed");
	        }
	        
	    },
	
		handleAddObject : function (evt) { 
         var view = this.getView();
            var inputs = [
            view.byId("username"),
		    view.byId("password"),
		   ];
            
             // check that inputs are not empty
            // this does not happen during data binding as this is only triggered by changes
            jQuery.each(inputs, function (i, input) {
              if (!input.getValue()) {
                input.setValueState("Error");
              }
            });
            
            // check states of inputs
            var canContinue = true;
            jQuery.each(inputs, function (i, input) {
                //recheck and set error status
                 if (input.getValue()) {
                input.setValueState("None");
              }
              if ("Error" === input.getValueState()) {
                canContinue = false;
                return false;
              }
            });
            
           
            
            if (canContinue) { 
		 var oEntry = {};
		 
		 oEntry.USERNAME=view.byId("username").getValue().toLowerCase().trim();
		 oEntry.PASSWORD= view.byId("password").getValue().trim();
		  
        
		 //var SaveModel = new sap.ui.model.json.JSONModel(
		  //   "services/play.xsjs?USERNAME="+oEntry.USERNAME
		  //   +"&PASSWORD="+oEntry.PASSWORD);
		     
		     
		///////////////////////////////////
		//used to check if ther are values returned for the query 
		 
		 var connMsg = false;
		  
			 sap.ui.core.BusyIndicator.show();
			 jQuery.ajax({
				 url:  "services/play.xsjs?USERNAME="+oEntry.USERNAME+"&PASSWORD="+oEntry.PASSWORD,
				 dataType: "json",
				 success: function(data, textStatus, jqXHR) { 
					 if (data===false){ 
						 connMsg = true;
						 sap.ui.core.BusyIndicator.show();
						 sap.ui.core.BusyIndicator.hide();
						 sap.m.MessageToast.show("Wrong Login details");}
					 else{
						 connMsg = true;
						 sap.ui.core.BusyIndicator.hide();
						 sap.ui.getCore().AppContext = new Object();
						 sap.ui.getCore().AppContext.UserName = oEntry.USERNAME;  
						 sap.m.MessageToast.show("Logging you in "+sap.ui.getCore().AppContext.UserName);
						 sap.ui.getCore().byId("app").getController().to("Master");
						 //sap.ui.getCore().byId("app").getController().to("UpdateContact");
						 sap.ui.getCore().byId("app").getController().to("Chart");//Working
					 }
				 },
				 error: function(jqXHR, textStatus, errorThrown) {
					 alert("Oh no, an error occurred");
				 }
			 });
			
		
		 
		
		
		
		
		
		////////////////////////////////////////////////
		
            var inputs = [
            view.byId("username"),
		    view.byId("password")
            ];
            
		jQuery.each(inputs, function (i, input) {
                                  if (input.getValue()) {
                                    input.setValue("");
                                  }
                                });
	    
		
		
	} else {
              jQuery.sap.require("sap.m.MessageBox");
              sap.m.MessageBox.alert("Complete your input first.");
            }
		 
		  
	},
	
	cancelAddObject : function (evt) {
	//	var context = evt.getSource().getBindingContext();
		//this.nav.back("Master");
        //     this.nav.to("Detail", context);
	},
   getValue : function(evt){
            var successMsg = evt.mParameters.value;
            sap.m.MessageToast.show(successMsg);
   },
   
    setCookie : function (cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
    },
    
    getCookie: function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }, 

    handleUrlPress: function (evt) {
    	    sap.m.URLHelper.redirect("mailto:william.grosjean@bmb-services.com?Subject=Password request", true);
    	
    },
    
    
            
});