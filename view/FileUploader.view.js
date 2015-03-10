sap.ui.jsview("sap.ui.demo.myFiori.view.FileUploader", {  
      getControllerName : function() {  
         return "sap.ui.demo.myFiori.view.FileUploader";  
      },  
      createContent : function(oController) {  
                          jQuery.sap.require("jquery.sap.resources");  
                  var oPanel = new sap.ui.commons.Panel("Panel",  
                                      {text: "File Upload",  
                                       height: "750px"  
                                      });  
                  var oSplitter = new sap.ui.commons.Splitter("ScreenSplitter",  
                                      {splitterOrientation: "Horizontal"});  
                  var oVertLayout = new sap.ui.commons.layout.VerticalLayout("VertLayout");  
                  oSplitter.addFirstPaneContent(oVertLayout);  
                  oPanel.addContent(oSplitter);  
                  /************************************************************************* 
                   * File Uploader Browse 
                   *************************************************************************/  
                  var oFLTxt = new sap.ui.commons.TextView("FileLoaderText", {text:"Please choose file for upload."});  
                  oVertLayout.addContent(oFLTxt);  
                  var oFileUploader = new sap.ui.commons.FileUploader("FileLoader");  
                  oFileUploader.attachUploadComplete(oController.doFileLoadComplete);       
                  oVertLayout.addContent(oFileUploader);  
                  /************************************************************************* 
                   * Upload button 
                   *************************************************************************/  
//                  var oButton = new sap.ui.commons.Button({  
//                            id : this.createId("UploadButton"),  
//                            text : "Upload"  
//                  });  
//                  oButton.attachPress(oController.doFileUpload);  
//                  oVertLayout.addContent(oButton);  
                  //To address cross-site request forgery security concern  
                  var oButton2 = new sap.ui.commons.Button({  
                            id : this.createId("UploadButton2"),   
                            text : "Upload"  
                  });  
                  oButton2.attachPress(oController.doFileUpload2);  
                  oVertLayout.addContent(oButton2);  
                 /************************************************************************* 
                   * Batch table 
                   *************************************************************************/  
                  var oModel = new sap.ui.model.odata.ODataModel("services/MY_FILE_UPLOAD_TABLE.xsodata",false);  
                  var oControl;  
                  var oTable = new sap.ui.table.Table("BatchTable", {tableId: "BatchTableId",visibleRowCount: 10});  
                  oTable.setTitle("Batch file data");  
                  oControl = new sap.ui.commons.TextField().bindProperty("value","ID"); 
                
                  
                  
                  
                oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: "Batch ID"}),  
                                                                      template: oControl,  
                                                                      sortProperty: "ID",  
                                                                      filterProperty: "ID"  
                                                                                }));  
                 
                oControl1 = new sap.ui.commons.TextField().bindProperty("value","COMPANY_NAME");
                oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: "COMPANY NAME"}), template: oControl1}));
                oControl2 = new sap.ui.commons.TextField().bindProperty("value","COMPANY_WEBSITE"); 
                oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: "COMPANY_WEBSITE"}), template: oControl2}));
                oControl3 = new sap.ui.commons.TextField().bindProperty("value","INDUSTRY_SECTOR"); 
                oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: "INDUSTRY_SECTOR"}), template: oControl3}));
                oControl4 = new sap.ui.commons.TextField().bindProperty("value","FIRSTNAME");
                oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: "FIRSTNAME"}), template: oControl4}));
                oControl5 = new sap.ui.commons.TextField().bindProperty("value","LASTNAME"); 
                oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: "LASTNAME"}), template: oControl5}));
                oControl6 = new sap.ui.commons.TextField().bindProperty("value","POSITION"); 
                oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: "POSITION"}), template: oControl6}));
                oControl7 = new sap.ui.commons.TextField().bindProperty("value","EMAIL_ADDRESS"); 
                oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: "EMAIL_ADDRESS"}), template: oControl7}));
                oControl8 = new sap.ui.commons.TextField().bindProperty("value","PHONE_NUMBER"); 
                oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: "PHONE_NUMBER"}), template: oControl8}));
                oControl9 = new sap.ui.commons.TextField().bindProperty("value","FRIEND_LEVEL");
                oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: "FRIEND_LEVEL"}), template: oControl9}));
                oControl10 = new sap.ui.commons.TextField().bindProperty("value","BUSINESS_VALUE"); 
                oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: "BUSINESS_VALUE"}), template: oControl10}));
                oControl11 = new sap.ui.commons.TextField().bindProperty("value","COLLABORATE"); 
                oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: "COLLABORATE"}), template: oControl11}));
                oControl12 = new sap.ui.commons.TextField().bindProperty("value","DATE");
                oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: "DATE"}), template: oControl12}));
                oControl13 = new sap.ui.commons.TextField().bindProperty("value","USER");
                oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: "USER"}), template: oControl13}));
                   
                
                  oTable.setModel(oModel);  
                  oTable.bindRows("/FILE_UPLOAD_TABLE");  
                  oSplitter.addSecondPaneContent(oTable);  
                  return oPanel;  
        }
      
});  
 