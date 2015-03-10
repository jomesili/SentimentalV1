jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("sap.ui.demo.myFiori.view.FileUploader", {  
	
/** 
* Called when a controller is instantiated and its View controls (if available) are already created. 
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization. 
*/  
   onInit: function() {  
	  
  },  
/** 
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered 
* (NOT before the first rendering! onInit() is used for that one!). 
*/  
//   onBeforeRendering: function() {  
//  
//   },  
/** 
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here. 
* This hook is the same one that SAPUI5 controls get after being rendered. 
*/  
   onAfterRendering: function() {  
	   
	  oModel = new sap.ui.model.json.JSONModel("services/MY_FILE_UPLOAD_TABLE.xsodata/FILE_UPLOAD_TABLE?$format=json",false); 
	  
	  TheTable = this.byId("BatchTable"); 
	   TheTable.setModel(oModel);
	   $("#FileUploader--uploadVBox").show();
	   $("#FileUploader--uploadHBox").hide();
    },  
/**  
* Called when the Controller is destroyed. Use this one to free resources and finalize activities. 
*/  
//   onExit: function() {  
//  
//   }  
    handleImportObject: function(){
    	sap.ui.commons.MessageBox.show(oModel.length, sap.ui.commons.MessageBox.Icon.INFORMATION, "Information"); 
    },  

    doFileUpload : function(oEvent)  
    {  
              var url = "../Services/BatchFileUpload.xsjs";  
              var fileLoader = sap.ui.getCore().byId("FileLoader");  
                var fileName = fileLoader.getValue();  
                if (fileName == "" )  
                  {  
                          jQuery.sap.require("sap.ui.commons.MessageBox");  
                          sap.ui.commons.MessageBox.show("Please choose File.", sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");  
                }  
                else  
                {  
                    url = url+"?file_name="+fileName;  
                    fileLoader.setUploadUrl(url);  
                    fileLoader.upload();  
                }  
    },  
    doFileLoadComplete : function(oEvent)  
    {  
              jQuery.sap.require("sap.ui.commons.MessageBox");  
              var sResponse = oEvent.getParameter("response");  
              sap.ui.commons.MessageBox.show(sResponse, sap.ui.commons.MessageBox.Icon.INFORMATION, "Information"); 
              this.getView().byId("BatchTable").getModel().refresh();//XML VIEWS
              //sap.ui.getCore().byId("BatchTable").getModel().refresh();  //JS VIEW
    },  
    
    entryCount: function(e){
    	//used to check if entries were made into the database 
    	//and get the count to be retrieved through the data variable in success     
    	var countUrl= "services/MY_FILE_UPLOAD_TABLE.xsodata/FILE_UPLOAD_TABLE/$count";
    	$.ajax({  
                url: countUrl,  
                type: "GET",  
                processData :false ,  
                  contentType: false ,  
                 success: function(newdata, textStatus, XMLHttpRequest)   
                {  
                	   
                	var resptext = XMLHttpRequest.responseText;  
                          
                  if(newdata>0){
                	   
                	  TheTable.setModel(oModel);
                	 
                	  $("#FileUploader--uploadHBox").show();
                	  $("#FileUploader--uploadVBox").hide();
                  }
               	   

                },  
                error: function(data, textStatus, XMLHttpRequest)  
                {  
                          sap.ui.commons.MessageBox.show("There was an error verrifiying your entries, check your csv file and try again.", sap.ui.commons.MessageBox.Icon.ERROR, "Error");  
                }  
      }); 
    },
    
    doFileUpload2 : function(oEvent)  
    {  
    	var fileLoader =this.getView().byId("FileLoader");//XML View
    			 //var fileLoader = sap.ui.getCore().byId("FileLoader");  //JS View
              var fileName = fileLoader.getValue();  
              jQuery.sap.require("sap.ui.commons.MessageBox");  
                if (fileName == "" )  
                  {  
                          sap.ui.commons.MessageBox.show("Please choose File.", sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");  
                }  
                else  
                {  
                          var uploadUrl = "services/BatchedFileUpload.xsjs?file_name="+fileName+"&userName="+sap.ui.getCore().AppContext.UserName;  
                         // var formEle = jQuery.sap.domById("FileLoader"); //JS Views 
                          var formEle = jQuery.sap.domById("FileUploader--FileLoader");  //XML Views
                    var form = $(formEle).find("form")[0] ;  
                          var fd = new FormData(form);     
                          $.ajax({  
                                    url: uploadUrl,  
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
                                                          data:fd,  
                                                        beforeSend: function(xhr)  
                                                        {  
                                                                  xhr.setRequestHeader("X-CSRF-Token", token);  
                                                        },  
                                                        success: function(data, textStatus, XMLHttpRequest)   
                                                        {  
                                                        	   
                                                        	var resptext = XMLHttpRequest.responseText;  
                                                        	jQuery.sap.require("sap.ui.commons.MessageBox");  
                                                        	sap.ui.commons.MessageBox.show(resptext, sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");  
                                                                 // XML VIEWS 
                                                        
                                                       if(data == "Upload successful"){
                                                    	   sap.ui.getCore().byId("FileUploader").getController().entryCount(data);
                                                    	   sap.ui.getCore().byId("BatchTable").getModel().refresh();
                                                    	  
                                                       }
                                                        	
                                                        oModel = new sap.ui.model.json.JSONModel("services/MY_FILE_UPLOAD_TABLE.xsodata/FILE_UPLOAD_TABLE?$format=json",true);  
                                                           
                                                                                                                	   
                                                       	   
                                                              //sap.ui.getCore().byId("BatchTable").getModel().refresh();
                                                                 
                                                                  
                                                                  //sap.ui.getCore().byId("BatchTable").getModel().refresh();//JS VIEWS
                                                        },  
                                                        error: function(data, textStatus, XMLHttpRequest)  
                                                        {  
                                                                  sap.ui.commons.MessageBox.show("File could not be uploaded.", sap.ui.commons.MessageBox.Icon.ERROR, "Error");  
                                                        }  
                                              });  
                                    }} ) ;  
                }  
    },
    
    doDataWipe : function (){
        sap.ui.commons.MessageBox.show("Moving to wipe file .", sap.ui.commons.MessageBox.Icon.ERROR, "Information");
        $("#FileUploader--uploadVBox").show();
  	   $("#FileUploader--uploadHBox").hide();
    },
    doDataUpload : function (){
    	var oEntry = TheTable.getModel().oData.d.results;
    	var i = 0
    	var len = oEntry.length;
    	for(i = 0; i < len; i++){
    		
    		var SaveModel = new sap.ui.model.json.JSONModel(
    			     "services/insert.xsjs?ID="+oEntry[i].ID
    			     +"&COMPANY_NAME="+oEntry[i].COMPANY_NAME
    			     +"&COMPANY_WEBSITE="+oEntry[i].COMPANY_WEBSITE
    			     +"&INDUSTRY_SECTOR="+oEntry[i].INDUSTRY_SECTOR
    			     +"&FIRSTNAME="+oEntry[i].FIRSTNAME
    			     +"&LASTNAME="+oEntry[i].LASTNAME
    			     +"&POSITION="+oEntry[i].POSITION
    			     +"&EMAIL_ADDRESS="+oEntry[i].EMAIL_ADDRESS
    			     +"&PHONE_NUMBER="+oEntry[i].PHONE_NUMBER
    			     +"&FRIEND_LEVEL="+oEntry[i].FRIEND_LEVEL
    			     +"&BUSINESS_VALUE="+oEntry.BUSINESS_VALUE
    			     +"&COLLABORATE="+oEntry[i].COLLABORATE
    			     +"&DATE="+oEntry[i].DATE
    			     +"&USER="+oEntry[i].USER);
    	}
    	
        sap.ui.commons.MessageBox.show("Moving to final upload .", sap.ui.commons.MessageBox.Icon.ERROR, "Information");  

    },
    startNew :function(){
    	$("#FileUploader--uploadVBox").show();
 	   $("#FileUploader--uploadHBox").hide();
    },
    updateObject:  function(evt){
            
            this.nav.back("Chart");

    },

    cancelUpload : function (evt) {
	    var bundle = this.getView().getModel("i18n").getResourceBundle();
	    var view = this.getView(); 
	        sap.m.MessageBox.confirm(
			bundle.getText("DeleteDialogMsg"),
			function (oAction) {
				if (sap.m.MessageBox.Action.OK === oAction) {
					var oModel =new sap.ui.model.json.JSONModel("services/BatchedFileUploadClear.xsjs?userName="+sap.ui.getCore().AppContext.UserName);
					}
				},
			
			bundle.getText("DeleteDialogTitle")
		);
        
 
        
	},
	
    
});  