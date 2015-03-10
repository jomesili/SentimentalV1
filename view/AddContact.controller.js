jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");
sap.ui.controller("sap.ui.demo.myFiori.view.AddContact", {

	
	onInit: function () {
    // set explored app's demo model on this sample
   
    var SectorModel = new sap.ui.model.json.JSONModel("model/sector.json");
    //this.getView().setModel(SectorModel,"SectorModel");
    this.getView().byId("industry").getModel("SectorModel").oData;
    
  },
 
  cancelAddInputs : function(evt){
      var view = this.getView();
      var inputs = [
            view.byId("company"),
		    view.byId("companyWebsite"),
		    view.byId("firstname"),
		    view.byId("surname"),
		    view.byId("position"),
		    view.byId("emailaddress"),
		    view.byId("personPhone"),
            ];
            
		jQuery.each(inputs, function (i, input) {
                                  if (input.getValue()) {
                                    input.setValue("");
                                  }
                                });
	    sap.m.MessageToast.show("Canceled, add a new contact");
      
  },
	handleAddObject : function (evt) { 
	    
         var view = this.getView();
         
        //sap.m.MessageToast.show(""+view.byId("industry").getSelectedItem().mProperties.text);
         
         var inputs = [
            view.byId("company"),
		    view.byId("companyWebsite"),
		    view.byId("firstname"),
		    view.byId("surname"),
		    view.byId("position"),
		    view.byId("emailaddress"),
		    view.byId("personPhone"),
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
            
             var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
            if (view.byId("emailaddress") == '' || !re.test(view.byId("emailaddress").getValue()))
            {
                sap.m.MessageToast.show("Please enter a valid email address.");
                canContinue = false;
                return false;
            }
            var EMAIL= view.byId("emailaddress").getValue();
            
            function loadXMLDoc()
                {
                var xmlhttp;
                if (window.XMLHttpRequest)
                  {// code for IE7+, Firefox, Chrome, Opera, Safari
                  xmlhttp=new XMLHttpRequest();
                  }
                else
                  {// code for IE6, IE5
                  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
                  }
                xmlhttp.onreadystatechange=function()
                  {
                  if (xmlhttp.responseText==="true"){
                        sap.m.MessageToast.show("A user with this email address exist already!");
                        canContinue = false;
                        return false;                  
                    }
                }
                xmlhttp.open("GET","services/checkMailDuplicate.xsjs?EMAIL_ADDRESS="+EMAIL,true);
                xmlhttp.send();
            }
            loadXMLDoc();  	
            
            if (canContinue) { 
		 var oEntry = {};
		 oEntry.ID="16";
		 oEntry.COMPANY_NAME=view.byId("company").getValue().trim();
		 oEntry.COMPANY_WEBSITE= view.byId("companyWebsite").getValue().trim();
		 oEntry.INDUSTRY_SECTOR=view.byId("industry").getSelectedItem().mProperties.text;
		 oEntry.FIRSTNAME=view.byId("firstname").getValue().trim();
		 oEntry.LASTNAME=view.byId("surname").getValue().trim();
		 oEntry.POSITION=view.byId("position").getValue().trim();
		 oEntry.EMAIL_ADDRESS=view.byId("emailaddress").getValue().trim();
		 oEntry.PHONE_NUMBER=view.byId("personPhone").getValue().trim();
		 oEntry.FRIEND_LEVEL=view.byId("friendValue").getValue();
		 oEntry.BUSINESS_VALUE=view.byId("businessValue").getValue();
		 oEntry.COLLABORATE=view.byId("collabRating").getValue();
		 oEntry.DATE=new Date.getTime();
		 oEntry.USER=sap.ui.getCore().AppContext.UserName 
		 
		 
//		 var SaveModel = new sap.ui.model.json.JSONModel(
//		     "services/insert.xsjs?ID="+oEntry.ID
//		     +"&COMPANY_NAME="+oEntry.COMPANY_NAME
//		     +"&COMPANY_WEBSITE="+oEntry.COMPANY_WEBSITE
//		     +"&INDUSTRY_SECTOR="+oEntry.INDUSTRY_SECTOR
//		     +"&FIRSTNAME="+oEntry.FIRSTNAME
//		     +"&LASTNAME="+oEntry.LASTNAME
//		     +"&POSITION="+oEntry.POSITION
//		     +"&EMAIL_ADDRESS="+oEntry.EMAIL_ADDRESS
//		     +"&PHONE_NUMBER="+oEntry.PHONE_NUMBER
//		     +"&FRIEND_LEVEL="+oEntry.FRIEND_LEVEL
//		     +"&BUSINESS_VALUE="+oEntry.BUSINESS_VALUE
//		     +"&COLLABORATE="+oEntry.COLLABORATE
//		     +"&DATE="+oEntry.DATE
//		     +"&USER="+oEntry.USER);
//////////////////////////////////////////////////////////////////
		 var uploadUrl = "services/insert.xsjs?ID="+oEntry.ID
			     +"&COMPANY_NAME="+oEntry.COMPANY_NAME
			     +"&COMPANY_WEBSITE="+oEntry.COMPANY_WEBSITE
			     +"&INDUSTRY_SECTOR="+oEntry.INDUSTRY_SECTOR
			     +"&FIRSTNAME="+oEntry.FIRSTNAME
			     +"&LASTNAME="+oEntry.LASTNAME
			     +"&POSITION="+oEntry.POSITION
			     +"&EMAIL_ADDRESS="+oEntry.EMAIL_ADDRESS
			     +"&PHONE_NUMBER="+oEntry.PHONE_NUMBER
			     +"&FRIEND_LEVEL="+oEntry.FRIEND_LEVEL
			     +"&BUSINESS_VALUE="+oEntry.BUSINESS_VALUE
			     +"&COLLABORATE="+oEntry.COLLABORATE
			     +"&DATE="+oEntry.DATE
			     +"&USER="+oEntry.USER;
		 var uploadUrlTest = "services/insert.xsjs";
		 $.ajax({  
             url: uploadUrlTest,  
             type: "GET",  
             beforeSend: function(xhr)  
             {  
                       xhr.setRequestHeader("X-CSRF-Token", "Fetch");  
             },  
             success: function(data, textStatus, XMLHttpRequest) {  
                       var token = XMLHttpRequest.getResponseHeader('X-CSRF-Token');  
                       $.ajax({  
                                 url: uploadUrl,  
                                 type: "POST",  
                                 processData :false ,  
                                   contentType: false ,  
                                  
                                 beforeSend: function(xhr)  
                                 {  
                                           xhr.setRequestHeader("X-CSRF-Token", token);  
                                 },  
                                 success: function(data, textStatus, XMLHttpRequest)   
                                 {  
                                 	   
	                                 	var resptext = XMLHttpRequest.responseText;  
	                                 	jQuery.sap.require("sap.ui.commons.MessageBox");  
	                                 	sap.ui.commons.MessageBox.show(resptext, sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");  
                                        
	                                  
                                 },  
                                 error: function(data, textStatus, XMLHttpRequest)  
                                 {  
                                           sap.ui.commons.MessageBox.show(data, sap.ui.commons.MessageBox.Icon.ERROR, "Error");  
                                 }  
                       });  
             }} ) ;
		 
///////////////////////////////////////////////////////////////////		 
		     
		var oModel2 = new sap.ui.model.json.JSONModel("services/companyCollectionService.xsjs");
		sap.ui.getCore().byId("app").setModel(oModel2);
		
			var chartsView= sap.ui.getCore().byId("Chart");
            	if(chartsView != null) {
            	      var oController = chartsView.getController();
            	      oController.resetData();
            	} 
                 
		
		
		var oModel2 = new sap.ui.model.json.JSONModel("services/companyCollectionService.xsjs");
		sap.ui.getCore().byId("app").setModel(oModel2 );
		//var empty="";
		//view.byId("company").setValue(empty);
		
            var inputs = [
            view.byId("company"),
		    view.byId("companyWebsite"),
		   view.byId("firstname"),
		    view.byId("surname"),
		    view.byId("position"),
		    view.byId("emailaddress"),
		    view.byId("personPhone"),
            ];
            
		jQuery.each(inputs, function (i, input) {
                                  if (input.getValue()) {
                                    input.setValue("");
                                  }
                                });
       //view.byId("industry").setSelectedItem().mProperties.text = "Agriculture"
	    //sap.m.MessageToast.show("Successful");
		
		
	} else {
              jQuery.sap.require("sap.m.MessageBox");
              sap.m.MessageBox.alert("Complete your input first.");
            }
		 
		  
	},
    
	onPressApprove:function (e) {
        	
            
            
    },
        
   
	cancelAddObject : function (evt) {
		sap.ui.getCore().byId("app").getController().to("Chart"); 
		
		//this.nav.to("Chart");
	},
	
	typeEMail : sap.ui.model.SimpleType.extend("email", {
	        formatValue: function (oValue) {
	          return oValue;
	        },
	parseValue: function (oValue) {
	            //parsing step takes place before validating step, value can be altered
	            return oValue;
	          },
	validateValue: function (oValue) {
	            var mailregex = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
	            if (!oValue.match(mailregex)) {
	              throw new sap.ui.model.ValidateException("is not a valid email address");
	            }
	          }
	        }),
	        
	getValue : function(evt){
//	            var successMsg = evt.mParameters.value;
//	            
// 	            var view = this.getView();
////	            
// 	            sap.m.MessageToast.show(view.byId("industry").getValue());  
//	              
//	              view.byId("companyWebsite"),
//	              view.byId("firstname"),
//	              view.byId("surname"),
//	              view.byId("position"),
//	              view.byId("emailaddress"),
//	              view.byId("personPhone"),
//	              view.byId("friendValue"),
//	              view.byId("businessValue"),
//	              view.byId("collabRating") 
	},
	
	
//////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	createContact : function(){
		//var OData = new sap.ui.model.odata.ODataModel(); 
		
var oModel = new sap.ui.model.odata.ODataModel("http://54.75.248.103/Sentiments/services/contacts.xsodata",false);
		
//		 oModel.remove("/ContactsList('1')", null, function(){
//		 		alert("The Delete successful");
//		 	},function(){
//				alert("The Delete failed");}); 
		var view = this.getView(); 
		var oEntry = {};
		 oEntry.ID="0";
		 oEntry.COMPANY_NAME=view.byId("companyWebsite");
		 oEntry.COMPANY_WEBSITE= view.byId("companyWebsite");
		 oEntry.INDUSTRY_SECTOR=view.byId("industry").getSelectedItem().text()
		 oEntry.FIRSTNAME=view.byId("firstname");
		 oEntry.LASTNAME=view.byId("surname");
		 oEntry.POSITION=view.byId("position");
		 oEntry.EMAIL_ADDRESS=view.byId("emailaddress");
		 oEntry.PHONE_NUMBER=view.byId("personPhone");
		 oEntry.FRIEND_LEVEL=view.byId("friendValue");
		 oEntry.BUSINESS_VALUE=view.byId("businessValue");
		 oEntry.COLLABORATE=view.byId("collabRating");
		 oEntry.DATE="23-12-2014" 
		//var request = {
		//		    Method: "POST",
				    
		//		};
		// console.log("Passed creation inistantiation")
		//oModel.create(oEntry);
		//	oModel.create('/ContactsList', oEntry,request, function(){
		//	    	 console.log("in Passed Function");
		//	 		alert("Create successful"); 
		//	 	},function(){
		//	 	    console.log("inside fail");
		//			alert("Create failed");});    
		 
		//		
//		
	              		
			   
			 
		oModel.create('/', oEntry, null, function(){
			 		alert("Create successful");
			 	},function(){
			 	    alert("Create failed");});              		
       
		 		 OData.request 
         (
        		 { requestUri: "http://54.75.248.103/Sentiments/services/contacts.xsodata/ContactsList",  
                    method: "GET",  
                    headers:  
                        {       
						  "X-Requested-With": "XMLHttpRequest", 
						   "Content-Type": "application/json;charset=UTF8", 
						   "DataServiceVersion": "2.0",          
					   "X-CSRF-Token":"Fetch"                                 
                        }                    
                 },  
                 function (data, response) 
                 { 
               	 header_xcsrf_token = response.headers['x-csrf-token']; 
               	 OData.request 
               	 ({  
                      requestUri: 
                       "http://54.75.248.103/Sentiments/services/contacts.xsodata/ContactsList",  
                            method: "POST",  
                            headers: {   "X-Requested-With": "XMLHttpRequest",                        
                           	 "Content-Type": "application/json;charset=UTF8", 
                           	 "DataServiceVersion": "2.0",  
                           	 "Accept": "application/atom+xml,application/atomsvc+xml,application/xml", 
                           	 "X-CSRF-Token": header_xcsrf_token    },  
                           	 
                         	},
                         function (data, response) 
                           {  
                         		document.location.reload(true);
                                            $("<div>Returned data " + window.JSON.stringify(data) + "</div>").appendTo($("#MessageDiv")); 
                           },  
                                  function (err)  
                                  { 
                                       $("<div>Returned error " + window.JSON.stringify(err.response) + "</div>").appendTo($("#MessageDiv")); 
                                  } 
               	 ); 
			        },  
			        function (err)  
			                       { 
			                            var request = err.request; // the request that was sent. 
			                            var response = err.response; // the response that was received. 
			                            alert("Error in Get -- Request "+request+" Response "+response); 
			                       } 
			        );                      

},

	
});