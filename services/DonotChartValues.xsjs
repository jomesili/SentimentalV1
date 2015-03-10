//var select_all_sales_orders_query = "select (select count(*) from \"SYSTEM\".\"BMBFRIENDS\") as TotalCount," 
//+"(select count(*) from \"SYSTEM\".\"BMBFRIENDS\" where COLLABORATE <= '2') as group1,"
//+"(select count(*) from \"SYSTEM\".\"BMBFRIENDS\" where COLLABORATE BETWEEN '2' AND '3') as group2,"
//+"(select count(*) from \"SYSTEM\".\"BMBFRIENDS\" where COLLABORATE BETWEEN '3' AND  '4') as group3,"
//+"(select count(*) from \"SYSTEM\".\"BMBFRIENDS\" where COLLABORATE = '5') as group4 "
//+"from \"SYSTEM\".\"BMBFRIENDS\" LIMIT 1";

var select_all_sales_orders_query = "select (select count(*) from \"SYSTEM\".\"BMBFRIENDS\") as TotalCount,"
+"ROUND (((select count(*) from \"SYSTEM\".\"BMBFRIENDS\" where COLLABORATE <= '2') /" 
+"(select count(*) from \"SYSTEM\".\"BMBFRIENDS\")* 100), 1) as group1,"
+"ROUND (((select count(*) from \"SYSTEM\".\"BMBFRIENDS\" where COLLABORATE BETWEEN '2' AND '3') / "
+"(select count(*) from \"SYSTEM\".\"BMBFRIENDS\")* 100), 1) as group2,"
+"ROUND (((select count(*) from \"SYSTEM\".\"BMBFRIENDS\" where COLLABORATE BETWEEN '3' AND  '4') / "
+"(select count(*) from \"SYSTEM\".\"BMBFRIENDS\")* 100), 1) as group3,"
+"ROUND (((select count(*) from \"SYSTEM\".\"BMBFRIENDS\" where COLLABORATE = '5')/ "
+"(select count(*) from \"SYSTEM\".\"BMBFRIENDS\")* 100), 1) as group4 "
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
        var topTen = [];
         var salesOrdersList ={"avgService": topTen};   
          var connection = $.db.getConnection("V1.services::access");  
          var statement = null;  
          var resultSet = null;   
          try{  
                    statement = connection.prepareStatement(select_all_sales_orders_query);  
                    resultSet = statement.executeQuery();  
                    var salesOrder;  
                     
                    while (resultSet.next()) { 
//							combined donut chart                    
//                    		 salesOrder = {};  
//                              salesOrder.low = resultSet.getString(1);
//                              salesOrder.group = "Low";
//                              topTen.push(salesOrder);
//                              salesOrder = {}; 
//                              salesOrder.low = resultSet.getString(2); 
//                              salesOrder.group = "Average";
//                              topTen.push(salesOrder);
//                              salesOrder = {}; 
//                              salesOrder.low = resultSet.getString(3); 
//                              salesOrder.group = "Good";
//                              topTen.push(salesOrder);
//                              salesOrder = {}; 
//                              salesOrder.low = resultSet.getString(4); 
//                              salesOrder.group = "Best";
//                              topTen.push(salesOrder);
                              
                              
/// Seperated dont charts
                    	
                    	 salesOrder = {};  
                         salesOrder.low = resultSet.getString(1);
                         salesOrder.groupL = "Low";
                         topTen.push(salesOrder);
                         salesOrder = {};  
                         salesOrder.low = 100 - resultSet.getString(1);
                         salesOrder.groupL = "Others";
                         topTen.push(salesOrder);
                         
                         
                         salesOrder = {}; 
                         salesOrder.average = resultSet.getString(2); 
                         salesOrder.groupA = "Average";
                         topTen.push(salesOrder);
                         salesOrder = {};  
                         salesOrder.average = 100 - resultSet.getString(2);
                         salesOrder.groupA = "Other";
                         topTen.push(salesOrder);
                         
                         salesOrder = {}; 
                         salesOrder.good = resultSet.getString(3); 
                         salesOrder.groupG = "Good";
                         topTen.push(salesOrder);
                         salesOrder = {};  
                         salesOrder.good = 100 - resultSet.getString(3);
                         salesOrder.groupG = "Other";
                         topTen.push(salesOrder);
                         
                         
                         salesOrder = {}; 
                         salesOrder.best = resultSet.getString(4); 
                         salesOrder.groupB = "Best";
                         topTen.push(salesOrder);
                         salesOrder = {};  
                         salesOrder.best = 100 - resultSet.getString(4);
                         salesOrder.groupB = "Other";
                         topTen.push(salesOrder);
                              
                              
                       
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