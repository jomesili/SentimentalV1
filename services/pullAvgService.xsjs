var select_all_sales_orders_query = 
	//"select (select count(*) from \"SYSTEM\".\"BMBFRIENDS\") as TotalCount, (select count(*) from \"SYSTEM\".\"BMBFRIENDS\" where COLLABORATE < '2') as QualifiedCount from \"SYSTEM\".\"BMBFRIENDS\" LIMIT 2";
"select (select count(*) from  \"SYSTEM\".\"BMBFRIENDS\") as TotalCount, "+
"(select count(*) from  \"SYSTEM\".\"BMBFRIENDS\" where COLLABORATE < '2') as QualifiedCount,  "+
"round((((select count(*) from  \"SYSTEM\".\"BMBFRIENDS\" where COLLABORATE < '2')/(select count(*) from  \"SYSTEM\".\"BMBFRIENDS\"))*100),2) as mypercent, "+
"( 100 -(round((((select count(*) from \"SYSTEM\".\"BMBFRIENDS\" where COLLABORATE < '2')/(select count(*) from \"SYSTEM\".\"BMBFRIENDS\"))*100),2))) as Others "+

"from  \"SYSTEM\".\"BMBFRIENDS\"LIMIT 2"; 

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
                    var mixt=true;
                    while (resultSet.next()) { 
                    	 if (mixt === true){
                    		 salesOrder = {};  
                              salesOrder.Average = resultSet.getString(1);  
                              salesOrder.Group = "%High Potential" ;                          
                              salesOrder.Best = resultSet.getString(3); 
                              topTen.push(salesOrder); 
                              mixt = false;
                    	 }
                    	 else {
                    		 salesOrder = {};  
                             salesOrder.Average = resultSet.getString(2);  
                             salesOrder.Group = "%Likely Potential" ;                          
                             salesOrder.Best = resultSet.getString(4); 
                             topTen.push(salesOrder); 
                             mixt = true;
                   	 }
                    	
                              
                              

                              
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