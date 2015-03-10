var select_all_sales_orders_query = "select (select count(*) from \"SYSTEM\".\"BMBFRIENDS\") as TotalCount," 
+"(select count(*) from \"SYSTEM\".\"BMBFRIENDS\" where COLLABORATE <= '2') as group1,"
+"(select count(*) from \"SYSTEM\".\"BMBFRIENDS\" where COLLABORATE BETWEEN '2' AND '3') as group2,"
+"(select count(*) from \"SYSTEM\".\"BMBFRIENDS\" where COLLABORATE BETWEEN '3' AND  '4') as group3,"
+"(select count(*) from \"SYSTEM\".\"BMBFRIENDS\" where COLLABORATE = '5') as group4 "
+"from \"SYSTEM\".\"BMBFRIENDS\" LIMIT 1";
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
          var salesOrdersList = [];  
          var connection = $.db.getConnection("V1.services::access");  
          var statement = null;  
          var resultSet = null;   
          try{  
                    statement = connection.prepareStatement(select_all_sales_orders_query);  
                    resultSet = statement.executeQuery();  
                    var salesOrder;  
                     
                    while (resultSet.next()) { 
                    
                    		 salesOrder = {};  
                              salesOrder.low = resultSet.getString(1);  
                              salesOrder.avergae = resultSet.getString(2); 
                              salesOrder.good = resultSet.getString(3); 
                              salesOrder.best = resultSet.getString(4); 
                              salesOrdersList.push(salesOrder); 
                       
                    	 }
                      
          } finally {  
        	  		
                    close([resultSet, statement, connection]);   
          }  
          return salesOrdersList;  
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