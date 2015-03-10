jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("sap.ui.commons.TextField");

sap.ui.controller("sap.ui.demo.myFiori.view.UpdateContact", {

	 onInit : function () {
	 //this.getView().byId("company").setValue= sap.ui.getCore().SelectedItem.coyName;
	view = this.getView();
    
    // attach handlers for validation errors
    sap.ui.getCore().attachValidationError(function (evt) {
      var control = evt.getParameter("element");
      if (control && control.setValueState) {
        control.setValueState("Error");
      }
    });
    sap.ui.getCore().attachValidationSuccess(function (evt) {
      var control = evt.getParameter("element");
      if (control && control.setValueState) {
        control.setValueState("None");
      }
    });
  },
  handleAddObject : function (evt) { 
        
         
         ///////////////////////////////
         
         // collect input controls
            var view = this.getView();
            var inputs = [
            view.byId("company"),
		    view.byId("companyWebsite"),
		    view.byId("industry"),
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
                        
            if (canContinue) {
             
              ///////////////////////////////////////////////////////////////
                         var oEntry = {};
                		 oEntry.ID=view.byId("choiceID").getValue(),
                		 oEntry.COMPANY_NAME=view.byId("company").getValue().trim();
                		 oEntry.COMPANY_WEBSITE= view.byId("companyWebsite").getValue().trim();
                		 oEntry.INDUSTRY_SECTOR=view.byId("industry").getValue().trim();
                		 oEntry.FIRSTNAME=view.byId("firstname").getValue().trim();
                		 oEntry.LASTNAME=view.byId("surname").getValue().trim();
                		 oEntry.POSITION=view.byId("position").getValue().trim();
                		 oEntry.EMAIL_ADDRESS=view.byId("emailaddress").getValue().trim();
                		 oEntry.PHONE_NUMBER=view.byId("personPhone").getValue().trim();
                		 oEntry.FRIEND_LEVEL=view.byId("friendValue").getValue();
                		 oEntry.BUSINESS_VALUE=view.byId("businessValue").getValue();
                		 oEntry.COLLABORATE=view.byId("collabRating").getValue();
                		 oEntry.DATE="23-12-2014" 
                		 
                		 
                		 	var bundle = this.getView().getModel("i18n").getResourceBundle();
                	        sap.m.MessageBox.confirm(
                			bundle.getText("ApproveDialogMsg"),
                			function (oAction) {
                				if (sap.m.MessageBox.Action.OK === oAction) {
                					// notify user
                					var SaveModel = new sap.ui.model.json.JSONModel(
                        		     "services/update.xsjs?ID="+oEntry.ID
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
                        		     +"&DATE="+oEntry.DATE);
                		     
                		     
                		
                				var successMsg = bundle.getText("ApproveDialogSuccessMsg");
                				
                				var fileLoader =view.byId("FileLoader");//XML View
                			  		 
                			    var fileName = fileLoader.getValue(); 
                	            jQuery.sap.require("sap.ui.commons.MessageBox");  
                	              if (fileName !== "" )  
                	                {  
                	            	  sap.ui.getCore().byId("UpdateContact").getController().handleUploadPress();  
                	            	//sap.ui.commons.MessageBox.show("Please choose File.", sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");  
                	              }  
                				
                			
                				}
                			 
                				var oModel2 = new sap.ui.model.json.JSONModel("services/companyCollectionService.xsjs");
                				sap.ui.getCore().byId("app").setModel(oModel2);
                        		
                        		jQuery.each(inputs, function (i, input) {
                                  if (input.getValue()) {
                                    input.setValue("");
                                  }
                                });
                        		
                			},
                			
                			bundle.getText("ApproveDialogTitle")
                		);
              
              //////////////////////////////////////////////////////////////////// 
              //jQuery.sap.require("sap.m.MessageToast");
              //sap.m.MessageToast.show("The input is correct. You could now continue to the next screen.");
            } else {
              jQuery.sap.require("sap.m.MessageBox");
              sap.m.MessageBox.alert("Complete your input first.");
            }
         
         
         //////////////////////////////////
		
        

	 
		
		 
		  
	},
        
      
	
	updateObject : function (evt) {
		 
		this.nav.back("Detail"); 
	},
	
	deleteObject : function (evt) {
	    var bundle = this.getView().getModel("i18n").getResourceBundle();
	    var view = this.getView(); 
	        sap.m.MessageBox.confirm(
			bundle.getText("DeleteDialogMsg"),
			function (oAction) {
				if (sap.m.MessageBox.Action.OK === oAction) {
					var x = location.hostname;
					//note to thyself get the id value and access it to procced with OData delete simple 
					var oModel = new sap.ui.model.odata.ODataModel("http://"+x+"/V1/services/contacts.xsodata",false);   		
					oModel.remove("/ContactsList('"+view.byId("choiceID").getValue()+"')", null, function(){
					var oModel2 = new sap.ui.model.json.JSONModel("services/companyCollectionService.xsjs");
					sap.ui.getCore().byId("app").setModel(oModel2 );
					console.log("Model Refreshed");
					//this.nav.back("Detail");
					sap.m.MessageToast.show("Contact deleted!");
					},function(){
						alert("The Delete failed");}); 
					}
			},
			
			bundle.getText("DeleteDialogTitle")
		);
        
 
        
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
  

  handleUploadPress : function(oEvent)  
  {  
  	var fileLoader =this.getView().byId("FileLoader");//XML View
  	 var view = this.getView();		 
            var fileName = fileLoader.getValue();  
            jQuery.sap.require("sap.ui.commons.MessageBox");  
              if (fileName == "" )  
                {  
                        sap.ui.commons.MessageBox.show("Please choose File.", sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");  
              }  
              else  
              {  
                        var uploadUrl = "services/PictureFileUpload.xsjs?file_name="+fileName+"&ID="+view.byId("choiceID").getValue();  
                        var formEle = jQuery.sap.domById("UpdateContact--FileLoader"); 
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
                                                      	//sap.ui.commons.MessageBox.show(resptext, sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");  
                                                      	sap.ui.commons.MessageBox.show("Photo updated.", sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");  

                                                      
	                                                     if(data == "Upload successful"){
                                                             sap.ui.commons.MessageBox.show("Photo updated.", sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");  
                                                             this.getView().byId("FileLoader").setValue("");
	                                                     }
	                                                    
	                                                   
                                                      },  
                                                      error: function(data, textStatus, XMLHttpRequest)  
                                                      {  
                                                                sap.ui.commons.MessageBox.show("File could not be uploaded.", sap.ui.commons.MessageBox.Icon.ERROR, "Error");  
                                                      }  
                                            });  
                                  }} ) ;  
              }  
  },
  
 // Handles file upload using Jquery selector ID
  handleUploadPressOLD : function(oEvent)  
  {  
	  		
	var fileItem=oEvent;  
	var uploadField =document.getElementById("UpdateContact--FileLoader-fu"); 
	var file = uploadField.files[0];
	var reader = new FileReader();

	reader.onloadend = function(evt) {
	      if (evt.target.readyState == FileReader.DONE) { // DONE == 2
	    	  var fileObject= {};
	    	  fileObject.fileItem = evt.target.result;
	    	  var SaveModel = new sap.ui.model.json.JSONModel("services/PictureFileUpload.xsjs?file="+escape(file));
	      }
		
		 	
//		oFileUploader = view.byId("FileLoader");
//		oFileUploader.setUploadUrl("services/PictureFileUpload.xsjs?FileName="+escape(file));
//				
//				oFileUploader.upload();
		
	};
	reader.readAsBinaryString(file);
	 
	 
  } ,

   handleTypeMissmatch: function(oEvent) {
	    var aFileTypes = oEvent.getSource().getFileType();
	    $.each(aFileTypes, function(key, value) {aFileTypes[key] = "*." +  value});
	    var sSupportedFileTypes = aFileTypes.join(", ");
	    sap.m.MessageToast.show("The file type *." + oEvent.getParameter("fileType") +
	                " is not supported. Choose one of the following types: " +
	                sSupportedFileTypes);
	  },

	  handleValueChange: function(oEvent) {
		    //var files = oEvent.target.files[0]; // FileList object
		    var uploadField =document.getElementById("UpdateContact--FileLoader-fu");//XML View
		  	var files = uploadField.files[0];

		    // create a sample thumbnail for the user.
		    var reader = new FileReader();

		      reader.onload = (function(theFile) {
		        return function(e) {
		          // Render thumbnail.
		        var edit_save = document.getElementById("UpdateContact--thumbImg");

		            edit_save.src = e.target.result ;                             
		        }
		          
		      })(files);

		      // Read in the image file as a data URL.
		      reader.readAsDataURL(files);
		     
		  }

	
	
});