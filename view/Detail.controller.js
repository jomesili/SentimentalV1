jQuery.sap.require("sap.ui.demo.myFiori.util.Formatter");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("sap.ui.demo.myFiori.view.Detail", {
	 stdDialog: null,
	onInit: function(oEvent){
		
	},
	
	handleNavButtonPress : function (evt) {
		this.nav.back("Master");
	},
	
	handleAddObject : function (evt) { 
         var context = evt.getSource().getBindingContext();
		this.nav.to("AddCompanyContact", context);  
    	
		
		
	},

	onBeforeRendering:function(oEvent){
		this.byId("SupplierForm").bindElement("COMPANY_CONTACTS");
		this.byId("detailRater").setEnabled(false);
		this.byId("SupplierForm").bindElement("/bubbleCoyService");
		 
	
	},
	onAfterRendering:function(oEvent){
  
	},
	
	handleApprove : function (evt) {

		// show confirmation dialog
		var bundle = this.getView().getModel("i18n").getResourceBundle();
		sap.m.MessageBox.confirm(
			bundle.getText("ApproveDialogMsg"),
			function (oAction) {
				if (sap.m.MessageBox.Action.OK === oAction) {
					// notify user
					var successMsg = bundle.getText("ApproveDialogSuccessMsg");
					sap.m.MessageToast.show(successMsg);
					// TODO call proper service method and update model (not part of this session)
				}
			},
			
			bundle.getText("ApproveDialogTitle")
		);
	},
	
	handleLineItemPress : function (evt) {

		
		var context = evt.getSource().getBindingContext();
		var ID = context.getObject().ID;
//		if (!document.getElementsByTagName || !document.createTextNode) return;
//	    var rows = document.getElementById('Detail--sysTable-listUl').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
//	   for (i = 0; i < rows.length; i++) {
//	 	    	var getRow = rows[i].getAttribute("tabindex");
//	 	    	
//	 	    	if(getRow ==="0"){
//	 	    		 
//	 	    		ID = rows[i].rowIndex;
//	 	    		var Cells = rows[i].getElementsByTagName("td");
//	 	    		 
//	 	    		sap.m.MessageToast.show(Cells[4].getBindingContext());
//	 	    		
//	 	    	}
//	  
//	    }
//	    
	    
 
		
		var xmlHTTP = new XMLHttpRequest();
		
        xmlHTTP.open('GET', 'services/GetImage.xsjs?id=' +ID, true);
        xmlHTTP.responseType = 'arraybuffer';

        xmlHTTP.onload = function(e) {
			
        	if (this.status == 200) {
        		var arr = new Uint8Array(this.response);
 	            var raw = String.fromCharCode.apply(null, arr);
 	            var b64 = btoa(raw);
 	            var dataURL = "data:image/jpeg;base64," + b64;
 	            document.getElementById("ProfileEdit--profileImg").src = dataURL;
 	            
 	           //document.getElementById('errorMessage').innerHTML = '';
			}
        	else if (this.status == 404) {
        		//document.getElementById('errorMessage').innerHTML = 'Image not found';
        		document.getElementById("ProfileEdit--profileImg").src = 'img/no_user.png';
			}
        	else{
        		document.getElementById("ProfileEdit--profileImg").src = 'img/no_user.png';
        	}
           
        };

        xmlHTTP.send();
		
		//after image is set 
        this.nav.to("ProfileEdit", context);
	},
        moveToChartView: function(){
             
            //this.nav.moveToChartView("AddContactChart");
              
             this.nav.moveToChartView ("Chart");
          
        }
        ,
        moveToBack: function(evt){
             
           this.nav.back("Chart");
          
        },
        
        openDialog: function (evt, sType) {
            if (!this[sType]) {
              this[sType] = sap.ui.xmlfragment(sType + "Dialog",
                this // associate controller with the fragment
              );
              this.getView().addDependent(this[sType]); 
            }
        },
            
        onMsgDialogPress: function (oEvent) {
        	 
        	this.openDialog('Msg');
        },

          onDialogCloseButton: function (oEvent) {
            var sType = oEvent.getSource().data("dialogType");
            this[sType].close();
          },
          
          onStdDialogPress: function (oEvent) {
        	    this.openDialog('Std');
        },
        	 
});