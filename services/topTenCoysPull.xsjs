var select_all_sales_orders_query = 
"select ID, "+
"round(avg(CAST(FRIEND_LEVEL as REAL)), 2) as friendvalue , "+
"round(avg(CAST(BUSINESS_VALUE as REAL)) , 2) as BusinessValue , "+
"round(avg(CAST(COLLABORATE as REAL)), 2) as Collabvalue, "+
"COMPANY_NAME,"+
"(round(avg(CAST(FRIEND_LEVEL as REAL)), 2)+ "+
"round(avg(CAST(BUSINESS_VALUE as REAL)) , 2) + "+
"round(avg(CAST(COLLABORATE as REAL)), 2)) as CompanyValue "+
"from \"SYSTEM\".\"BMBFRIENDS\" "+
"GROUP BY ID, COMPANY_NAME ORDER BY CompanyValue DESC Limit 10"; 


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
			var topTen = []; 
          var salesOrderList = {"topTen": topTen};   
          var connection = $.db.getConnection("V1.services::access");  
          var statement = null;  
          var resultSet = null; 
          
          try{  
                    statement = connection.prepareStatement(select_all_sales_orders_query);  
                    resultSet = statement.executeQuery();  
                    
                    var salesOrder;
                    while (resultSet.next()) { 
                    	
//                    			salesOrder = {}; 
//                              salesOrder.friendValue = resultSet.getString(1);  
//                              salesOrder.businessValue = resultSet.getString(2); 
//                              salesOrder.collabValue = resultSet.getString(3);  
//                              salesOrder.contactType = resultSet.getString(4); 
//                              salesOrder.companyValue = resultSet.getString(5); 
//                              topTen.push(salesOrder); 
                    	
                    	salesOrder = {};
                    	salesOrder.time = "Past";
                    	salesOrder.position = resultSet.getString(3); //Past based on Friendship Value
                    	salesOrder.companyName = resultSet.getString(5); // Company Name
                    	topTen.push(salesOrder); // add to List
                    	
                    	salesOrder = {};
                    	salesOrder.time = "Present";
                    	salesOrder.position = resultSet.getString(2); //Future Value based on projection
                    	salesOrder.companyName = resultSet.getString(5); // Company Name
                    	topTen.push(salesOrder); // add to List
                              
                    	// create a new object to be pushed
                    	
                    	salesOrder = {};
                    	salesOrder.time = "Future";
                    	salesOrder.position = resultSet.getString(6); //Past based on Friendship Value
                    	salesOrder.companyName = resultSet.getString(5); // Company Name
                    	topTen.push(salesOrder); // add to List
                    	
                    	 }
                    	
                              
                    }  
           finally {  
        	  		
                    close([resultSet, statement, connection]);   
          }  
          return salesOrderList;  
}  
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
