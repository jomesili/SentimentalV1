jQuery.sap.require("sap.m.MessageToast");
sap.ui.controller("sap.ui.demo.myFiori.view.Chart", {

  onInit : function(oEvent) {
    
    // for Bubble Chart
    var oVizFrameBar = this.getView().byId("idVizFrameBar");
   var oModelBar = new sap.ui.model.json.JSONModel("services/bubbleCoyService.xsjs");
    var oPopOverBar = this.getView().byId("idPopOverBar");
    
    var fnDrawSomething = function () {
    	var vLine = null;
    	 var hLine= null;
            // get the relevant plot area, see also dom structure
            var aPlot = d3.selectAll("#Chart--idVizFrameBar .v-m-plot");
            var aRect = aPlot.selectAll("rect");
            var width = aRect.attr("width");
            var height = aRect.attr("height");

            vLine = aPlot.insert("line")
                .attr("x1", width / 2)
                .attr("y1", 0)
                .attr("x2", width / 2)
                .attr("y2", height)
                .attr("stroke", "#CCCFCE")
                .attr("stroke-width", 1);
            hLine = aPlot.insert("line") 
                .attr("x1", 0)
                .attr("y1", height / 2)
                .attr("x2", width)
                .attr("y2", height / 2)
                .attr("stroke", "#CCCFCE")
                .attr("stroke-width", 1);


        };
     
    
    
   var oDatasetBar =  sap.viz.ui5.data.FlattenedDataset({  
                        
                         dimensions : [ {  
                                   axis : 1, // must be one for the x-axis, 2 for y-axis  
                                   name : 'Company',  
                                   value : "{Name}"  
                         }],  
                        
                         measures : [   
                                     
                                     {  
                                         group:1,  
                                 		name : 'Business Value to BMB', // 'name' is used as label in the Legend  
                                           value : '{BusinessValue}' // 'value' defines the binding for the  
                                 },
                                     {  
                                     		group:2, 
                                     		name : 'Friendship Level', // 'name' is used as label in the Legend  
                                               value : '{friendValue}' // 'value' defines the binding for the  
                                     }, 
                                     {  
                                   		group:3,  
                                   		name : 'Partnership', // 'name' is used as label in the Legend  
                                             value : '{CollabValue}' // 'value' defines the binding for the  
                                   }
                                   
                                   
                                     ],  
                         
                         // 'data' is used to bind the whole data collection that is to be  
                         // displayed in the chart  
                         data : {  
                                   path : "/bubbleCoyService"   
                         }
     });
             var Charttitle= new sap.viz.ui5.types.Title({
			visible : true,
			text : 'Business Potential in BMB ecosystem'
		});
	 var ChartlegendPosition = new sap.viz.ui5.types.Legend({layout: {
   			 position: "bottom",
   			 label:"*Stacked bubble - partnership likelyhood indicator"
   		 }});
   		 
   	    var xAxis = new  sap.viz.ui5.types.Axis({  
                                  title: {visible: true, text : "Business index" },
                                  isIndependentMode : false,
                                    gridline : {
                                        showFirstLine : true,
                                        showLastLine : true,
                                        type : sap.viz.ui5.types.Axis_gridline_type.dotted
                                    },
                                     scale : {
                                         fixedRange : true,
                                         minValue : 0.0,
                                        // maxValue : 5.0
                                         
                                         },
                                  //scale: new sap.viz.ui5.types.Axis_scale({fixedRange:true, minValue: 0, maxValue: 12})
                         		 });
                         		 
    var yAxis= new  sap.viz.ui5.types.Axis({  
                                    title: { visible: true, text : "Friendship index" },
                                    isIndependentMode : false,
                                    gridline : {
                                        showFirstLine : true,
                                        showLastLine : true,
                                        type : sap.viz.ui5.types.Axis_gridline_type.dotted
                                    },
                                     scale : {
                                         fixedRange : true,
                                         minValue : 0,
                                         //maxValue : 5.0
                                         
                                         }
                                   
                                    //scale: new sap.viz.ui5.types.Axis_scale({fixedRange:true, minValue: 0, maxValue: 12})
                           		 });
    var dataSelect =  function(oEvent) {
 		// get the event data as provided by the native sap.viz library
 		var oSelectData = oEvent.getParameter("data");
 		
 		// let the dataset convert the event coordinates back to a UI5 model context
 		var oContext = this.getDataset().findContext(oSelectData[0].data[0].ctx.path);
 		var ID = context.getObject();
 		console.log("selectData fired with data of length " + oSelectData.length);
 		console.log("context path for first data point: " + (oContext ? oContext.getPath() : "undefined"));
 	};
    
                           		 
   	 oVizFrameBar.setDataset(oDatasetBar);
   	oVizFrameBar.setModel(oModelBar);
    oVizFrameBar.setLegendGroup(ChartlegendPosition);
    oVizFrameBar.setYAxis(yAxis); 
    oVizFrameBar.setXAxis(xAxis); 
    oVizFrameBar.attachInitialized(fnDrawSomething);
    oVizFrameBar.attachSelectData(dataSelect);
   
     
    /// Top Ten Chart 
    var yAxisIndex;
    var coyName;
    var selectedData = function(oEvent ) {
    	yAxisIndex= (oEvent.getParameter("data")[0]).data[0].ctx.path.dii_a1;
    	coyName= amModel.getProperty("/topTen/"+yAxisIndex+"/contactType")
    	var oSelctModel = new sap.ui.model.json.JSONModel("services/DonotChartValuesConditional.xsjs?COMPANY_NAME="+coyName);
    	
    	//sap.m.MessageToast.show(oEvent.mParameters.data[0].data[0].val +" " + amModel.getProperty("/topTen/"+yAxisIndex+"/contactType") );                                                        
    };
 
    var dataPSelect =  function(oEvent) {
 		var oSelectData = oEvent.getParameter("data");
 		var oContext = this.getDataset().findContext(oSelectData[0].data[0].ctx.path);
 		var coyName = oContext.getObject().companyName.trim();
 		var oSelectModel = new sap.ui.model.json.JSONModel("services/DonotChartValuesConditional.xsjs?COMPANY_NAME="+coyName);
 		var oListModel = new sap.ui.model.json.JSONModel("services/getContactListConditional.xsjs?COMPANY_NAME="+coyName);
 		oVizFrameDonot1.setModel(oSelectModel);
 		oVizFrameDonot2.setModel(oSelectModel);
 		oVizFrameDonot3.setModel(oSelectModel);
 		oVizFrameDonot4.setModel(oSelectModel);
 		oListModel.setSizeLimit(2);
 		coyContactsList.setModel(oListModel);

 	};
 	
 	var dataDSelect =  function(oEvent) {
 		var oSelectData = oEvent.getParameter("data");
 		var oContext = this.getDataset().findContext(oSelectData[0].data[0].ctx.path);
 		var coyName = oContext.getObject().companyName;
 		var oSelectModel = new sap.ui.model.json.JSONModel("services/DonotChartValues.xsjs");
 		oVizFrameDonot1.setModel(oSelectModel);
 		oVizFrameDonot2.setModel(oSelectModel);
 		oVizFrameDonot3.setModel(oSelectModel);
 		oVizFrameDonot4.setModel(oSelectModel);


 	};
    var oVizFrame = this.getView().byId("idVizFrameColumn");
   
    
    var amModel = new sap.ui.model.json.JSONModel("services/topTenCoysPull.xsjs");
   
    var oDataset  = new sap.viz.ui5.data.FlattenedDataset({  
                                        // a Bar Chart requires exactly one dimension (x-axis)  
                                        dimensions : [ {  
                                                  axis : 1, // must be one for the x-axis, 2 for y-axis  
                                                  name : 'Time',  
                                                  value : "{time}"
                                        }, {
                                                  axis : 2, // must be one for the x-axis, 2 for y-axis  
                                                  name : 'Company Name',  
                                                  value : "{companyName}" 
                                        }],  
                                        // it can show multiple measures, each results in a new set of bars  
                                        // in a new color  
                                        measures : [   
                                        {  			group: 1,
                                                  	name : 'Value', // 'name' is used as label in the Legend  
                                                  	value : '{position}' // 'value' defines the binding for the  
                                        } 
                                         
                                        ],  
                                        // 'data' is used to bind the whole data collection that is to be  
                                        // displayed in the chart  
                                        data : {  
                                                  path : "/topTen"  
                                        }  
                              });
    var interaction= new sap.viz.ui5.types.controller.Interaction(  
        {  
            selectability: new sap.viz.ui5.types.controller.Interaction_selectability(  
             { mode: sap.viz.ui5.types.controller.Interaction_selectability_mode.double  
              })  
    }); 
     
	 var legendPosition = new sap.viz.ui5.types.Legend({layout: {
   			 position: "right"
   		 }});
   		 
   	
    var xAxis = new  sap.viz.ui5.types.Axis({  
                                  title: {visible: true, text : "Company valuation:past & future" },
                                  //scale: new sap.viz.ui5.types.Axis_scale({fixedRange:true, minValue: 0, maxValue: 10})
                         		 });
                         		 
    var yAxis= new  sap.viz.ui5.types.Axis({  
                                    title: { visible: true, text : "Opportunities:Past & Future" },
                                    //scale: new sap.viz.ui5.types.Axis_scale({fixedRange:true, minValue: 0, maxValue: 12})
                           		 });

    oVizFrame.setDataset(oDataset);
    oVizFrame.setModel(amModel);
    oVizFrame.setInteraction(interaction);
    oVizFrame.setLegendGroup(legendPosition);
    oVizFrame.setXAxis(xAxis);
    oVizFrame.attachSelectData(dataPSelect);
    oVizFrame.attachDeselectData(dataDSelect);
    
    

    //List below Donut Charts
    var coyContactsList = this.getView().byId("coyContacts")

    
     /// Donot Chart
    
    var oVizFrameDonot1 = this.getView().byId("idVizFrameDonot1"); 
    var oPopOverDonot = this.getView().byId("idPopOverDonot");
    
    var DonoutModel1 = new sap.ui.model.json.JSONModel("services/DonotChartValues.xsjs");
     
    var oDatasetDonout1 = new sap.viz.ui5.data.FlattenedDataset({  
        // a Bar Chart requires exactly one dimension (x-axis)  
        dimensions : [ {  
                  axis : 1, // must be one for the x-axis, 2 for y-axis  
                  name : 'Group',  
                  value : "{groupL}"  
        }],  
        // it can show multiple measures, each results in a new set of bars  
        // in a new color  
        measures : [   
        {  
                group:1,  
        		name : 'Low', // 'name' is used as label in the Legend   
        		value : '{low}' // 'value' defines the binding for the  
        }
         
        ],  
        // 'data' is used to bind the whole data collection that is to be  
        // displayed in the chart  
        data : {  
                  path : "/avgService"  
        }
        
                                       
     });
     
    var pieType1 = new sap.viz.ui5.types.Pie();
    pieType1.setColorPalette(['#e8514f','#b4ccc8']);  // LTR Red, Orange, Blue to Green 
      
     var legendPositionD1 = new sap.viz.ui5.types.Legend({layout: {
   			 position: "bottom"
   		 }});
   
    oVizFrameDonot1.setDataset(oDatasetDonout1);
    oVizFrameDonot1.setModel(DonoutModel1);
    //oVizFrameDonot1.setLegendGroup(legendPositionD1);
    oVizFrameDonot1.setPlotArea(pieType1);   
    
    
    
    var oVizFrameDonot2 = this.getView().byId("idVizFrameDonot2"); 
    var oDatasetDonout2 = new sap.viz.ui5.data.FlattenedDataset({  
        // a Bar Chart requires exactly one dimension (x-axis)  
        dimensions : [ {  
                  axis : 1, // must be one for the x-axis, 2 for y-axis  
                  name : 'Group',  
                  value : "{groupA}"  
        }],  
        // it can show multiple measures, each results in a new set of bars  
        // in a new color  
        measures : [   
        {  
                group:1,  
        		name : 'Avg', // 'name' is used as label in the Legend   
                  value : '{average}' // 'value' defines the binding for the  
        }
         
        ],  
        // 'data' is used to bind the whole data collection that is to be  
        // displayed in the chart  
        data : {  
                  path : "/avgService"  
        }
        
                                       
     });
     
    var pieType2 = new sap.viz.ui5.types.Pie();
    pieType2.setColorPalette(['#b4ccc8','#ffa55c' ]);  // LTR Red, Orange, Blue to Green 
      
     var legendPositionD2 = new sap.viz.ui5.types.Legend({layout: {
   			 position: "bottom"
   		 }});
   
    oVizFrameDonot2.setDataset(oDatasetDonout2);
    oVizFrameDonot2.setModel(DonoutModel1);
    //oVizFrameDonot2.setLegendGroup(legendPositionD2);
    oVizFrameDonot2.setPlotArea(pieType2);   
    
    /// Donut chart Three
    var oVizFrameDonot3 = this.getView().byId("idVizFrameDonot3"); 
    var oDatasetDonout3 = new sap.viz.ui5.data.FlattenedDataset({  
        // a Bar Chart requires exactly one dimension (x-axis)  
        dimensions : [ {  
                  axis : 1, // must be one for the x-axis, 2 for y-axis  
                  name : 'Group',  
                  value : "{groupG}"  
        }],  
        // it can show multiple measures, each results in a new set of bars  
        // in a new color  
        measures : [   
        {  
                group:1,  
        		name : 'Good', // 'name' is used as label in the Legend   
                  value : '{good}' // 'value' defines the binding for the  
        }
         
        ],  
        // 'data' is used to bind the whole data collection that is to be  
        // displayed in the chart  
        data : {  
                  path : "/avgService"  
        }
        
                                       
     });
     
    var pieType3 = new sap.viz.ui5.types.Pie();
    pieType3.setColorPalette([ '#b4ccc8','#66b0ff']);  // LTR Red, Orange, Blue to Green 
      
     var legendPositionD3 = new sap.viz.ui5.types.Legend({layout: {
   			 position: "bottom"
   		 }});
   
    oVizFrameDonot3.setDataset(oDatasetDonout3);
    oVizFrameDonot3.setModel(DonoutModel1);
   // oVizFrameDonot3.setLegendGroup(legendPositionD3);
    oVizFrameDonot3.setPlotArea(pieType3);  
    
  /// Donut chart FOur
    var oVizFrameDonot4 = this.getView().byId("idVizFrameDonot4"); 
    var oDatasetDonout4 = new sap.viz.ui5.data.FlattenedDataset({  
        // a Bar Chart requires exactly one dimension (x-axis)  
        dimensions : [ {  
                  axis : 1, // must be one for the x-axis, 2 for y-axis  
                  name : 'Group',  
                  value : "{groupB}"  
        }],  
        // it can show multiple measures, each results in a new set of bars  
        // in a new color  
        measures : [   
        {  
                group:1,  
        		name : 'Best', // 'name' is used as label in the Legend   
                 value : '{best}' // 'value' defines the binding for the  
        }
         
        ],  
        // 'data' is used to bind the whole data collection that is to be  
        // displayed in the chart  
        data : {  
                  path : "/avgService"  
        }
        
                                       
     });
     
    var pieType4 = new sap.viz.ui5.types.Pie();
    pieType4.setColorPalette(['#b4ccc8', '#5fb8ac']);  // LTR Red, Orange, Blue to Green 
      
     var legendPositionD4 = new sap.viz.ui5.types.Legend({layout: {
   			 position: "bottom"
   		 }});
   
    oVizFrameDonot4.setDataset(oDatasetDonout4);
    oVizFrameDonot4.setModel(DonoutModel1);
    //oVizFrameDonot4.setLegendGroup(legendPositionD4);
    oVizFrameDonot4.setPlotArea(pieType4);  
    
    
    
    

  },
  
  
  
  
  
   resetData : function() {
    
    
    var oVizFrameBar = this.getView().byId("idVizFrameBar");
     var oModelBar = new sap.ui.model.json.JSONModel("services/bubbleCoyService.xsjs");
     oVizFrameBar.setModel(oModelBar);
     
    
    //REFRESH COLUMN CHART
    var oVizFrame = this.getView().byId("idVizFrameColumn");
    var oModelBar = new sap.ui.model.json.JSONModel("services/topTenCoysPull.xsjs");
    oVizFrame.setModel(oModelBar);
    
    //REFRESH DONUT CHART
    var oVizFrameDonot1 = this.getView().byId("idVizFrameDonot1");
    var DonoutModel1 = new sap.ui.model.json.JSONModel("services/DonotChartValues.xsjs");
    oVizFrameDonot1.setModel(DonoutModel1);
    
    var oVizFrameDonot2 = this.getView().byId("idVizFrameDonot2");
    oVizFrameDonot1.setModel(DonoutModel1);
    
    var oVizFrameDonot1 = this.getView().byId("idVizFrameDonot3");
    oVizFrameDonot1.setModel(DonoutModel1);
    
    var oVizFrameDonot1 = this.getView().byId("idVizFrameDonot4");
    oVizFrameDonot1.setModel(DonoutModel1);
    
   },
   
  handleGroup : function (evt) {

		// compute sorters
		var sorters = [];
		var item = evt.getParameter("selectedItem");
		var key = (item) ? item.getKey() : null;
		if ("INDUSTRY_SECTOR" === key ) {
			sap.ui.demo.myFiori.util.Grouper.bundle = this.getView().getModel("i18n").getResourceBundle();
			var grouper = sap.ui.demo.myFiori.util.Grouper[key];
			sorters.push(new sap.ui.model.Sorter(key, true, grouper));
		}

		// update binding
		var list = this.getView().byId("list");
		var oBinding = list.getBinding("items");
		oBinding.sort(sorters);
	},
	
	handleAddObject : function (evt) { 
           
        // var context = evt.getSource().getBindingContext();
		//this.nav.to("AddContact", context);
		sap.ui.getCore().byId("app").getController().to("AddContact");
	
                
        //sap.ui.getCore().getControl("Master--addBtnMaster").setEnabled(false);
               
                //evt.getSource().getId().setEnabled(false);
                
		
	},
	handlelogoff : function (evt) { 
	     sap.ui.getCore().byId("app").getController().back("Play");
		 sap.ui.getCore().byId("app").getController().to("Welcome");
		 
		 var view =   sap.ui.getCore().byId("Play");
	        
	        var userName=this.getCookie("username");
	        var passWord=this.getCookie("password");
             
                view.byId("username").setValue(userName);
                view.byId("password").setValue(passWord);
                //view.byId("keepLogged").setSelected(true) 
                //alert("Welcome again " + user);
             
	    
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
    


onAfterRender :function(){
     sap.ui.getCore().byId("oChart").attachBrowserEvent("click",chartClickHandler);  
     var vis = d3.select("v-m-root"); 
     var arc = d3.svg.arc() .innerRadius(10) .outerRadius(20) .startAngle(0) .endAngle(1.5*Math.PI); 
},

selectData:function(oEvent) { 
    
      if(!$(oEvent.target).closest('.viz-axis-body').length) return;
      var xAxisLabel=$($(oEvent.target).next('.viz-axis-label').children('text')).text();
      new sap.ui.commons.Dialog({ title: xAxisLabel+" clicked" }).open();  
  },
  
  handleBulkObject : function (evt) { 
      
      sap.ui.getCore().byId("app").getController().to("FileUploader");
	},
  
  
});