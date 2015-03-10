var select_all_sales_orders_query =  
                    "SELECT * FROM \"SYSTEM\".\"BMBFRIENDS\" ";  
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
                              salesOrder.company_name = resultSet.getString(2);  
                              salesOrder.net_amount = resultSet.getString(4);  
                              salesOrder.gross_amount = resultSet.getString(5);
                              salesOrder.compValue = resultSet.getString(6); 
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