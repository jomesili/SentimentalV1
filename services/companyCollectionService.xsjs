var select_all_sales_orders_query = "select * from \"SYSTEM\".\"BMBFRIENDS\" ORDER BY ID DESC ";


function close(closables) {  
          var closable;  
          var i;  
          for (i = 0; i < closables.length; i++) {  
                    closable = closables[i];  
                    if(closable) {  
                              closable.close();  
                    }  
          }  
}  
function getSalesOrders(){ 
	
	var result = [];
	var groups = {};
			var topTen = [];
			var salesOrdersList ={"bubbleCoyService": result};
		   // var salesOrdersList ={"bubbleCoyService": topTen};  works 
          var connection = $.db.getConnection("V1.services::access");  
          var statement = null;  
          var resultSet = null;   
          try{  
                    statement = connection.prepareStatement(select_all_sales_orders_query);  
                    resultSet = statement.executeQuery();  
                    var salesOrder;  
                    
                    
                  
                    while (resultSet.next()) { 
                    	      
                    	salesOrder = {};
                    	salesOrder.ID = resultSet.getString(1);  
                    	salesOrder.COMPANY_NAME = resultSet.getString(2); 
                    	salesOrder.COMPANY_WEBSITE = resultSet.getString(3).toLowerCase();
                    	salesOrder.INDUSTRY_SECTOR = resultSet.getString(4);
                    	salesOrder.FIRSTNAME = resultSet.getString(5).toLowerCase();
                    	salesOrder.LASTNAME = resultSet.getString(6);
                    	salesOrder.POSITION = resultSet.getString(7);  
                    	salesOrder.EMAIL_ADDRESS = resultSet.getString(8).toLowerCase(); 
                    	salesOrder.PHONE_NUMBER = resultSet.getString(9);
                    	salesOrder.FRIEND_LEVEL = resultSet.getFloat(10);
                    	salesOrder.BUISNESS_LEVEL = resultSet.getFloat(11);
                    	salesOrder.COLLABORATE = resultSet.getFloat(12);
                    	
                    	topTen.push(salesOrder);
          
                    }
                    
                    //////////////////////////////////////////////////////////
                    var i;
                    var item;

                    for(i = 0; i < topTen.length; i++) {
                       item = topTen[i];

                        if(!groups[item.COMPANY_NAME]) {
                            groups[item.COMPANY_NAME] = [ ];
                        }

                        groups[item.COMPANY_NAME].push({
                            
                            ID: item.ID,  
                            COMPANY_NAME : item.COMPANY_NAME,
                    		COMPANY_WEBSITE : item.COMPANY_WEBSITE,
                    		INDUSTRY_SECTOR : item.INDUSTRY_SECTOR,
                    		FIRSTNAME : item.FIRSTNAME,
                    		LASTNAME : item.LASTNAME,
                    		POSITION : item.POSITION,
                    		EMAIL_ADDRESS : item.EMAIL_ADDRESS, 
                    		PHONE_NUMBER : item.PHONE_NUMBER,
                    		FRIEND_LEVEL : item.FRIEND_LEVEL,
                    		BUISNESS_LEVEL : item.BUISNESS_LEVEL,
                    		COLLABORATE : item.COLLABORATE,
                    		
                    	    });
                    }

                    var x;
                    var obj ;
                    var sector;
                    var website;

                    for( x in groups) {
                        if(groups.hasOwnProperty(x)) {
                            
                            
                                sector = groups[x][0].INDUSTRY_SECTOR;
                                website= groups[x][0].COMPANY_WEBSITE;
                           
                        
                        	obj = {COMPANY_NAME:x,INDUSTRY_SECTOR:sector, COMPANY_WEBSITE:website, COMPANY_CONTACTS:groups[x] };
                        	 
                            result.push(obj);
                        }
                    }
                    ///////////////////////////////////////////////////////////
                    
          } finally {  
        	  		
                    close([resultSet, statement, connection]);    
          }  
            
          return salesOrdersList;  
} 

  //////////////////////////////////////////////



//////////////////////////////////////////////////

function doGet() {  
          try{  
                    $.response.contentType = "application/json";  
                    
                    $.response.setBody(JSON.stringify(getSalesOrders()));  
          }  
          catch(err){  
                    $.response.contentType = "text/plain";  
                    $.response.setBody("Error while executing query: [" + err.message + "]");  
                    $.response.returnCode = 200;  
          }  
}  
  
doGet();
  