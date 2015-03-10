//used to get list of company contacts based on company Name form Chart Select Data
var COMPANY_NAME = $.request.parameters.get('COMPANY_NAME');

var select_all_sales_orders_query = "select * from \"SYSTEM\".\"BMBFRIENDS\" Where  COMPANY_NAME = '"+COMPANY_NAME+"'";


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
var salesOrdersList ={"DonutCoyService": topTen};
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
		salesOrder.COMPANY_WEBSITE = resultSet.getString(3);
		salesOrder.INDUSTRY_SECTOR = resultSet.getString(4);
		salesOrder.FIRSTNAME = resultSet.getString(5);
		salesOrder.LASTNAME = resultSet.getString(6);
		salesOrder.POSITION = resultSet.getString(7);  
		salesOrder.EMAIL_ADDRESS = resultSet.getString(8); 
		salesOrder.PHONE_NUMBER = resultSet.getString(9);
		salesOrder.FRIEND_LEVEL = resultSet.getFloat(10);
		salesOrder.BUISNESS_LEVEL = resultSet.getFloat(11);
		salesOrder.COLLABORATE = resultSet.getFloat(12);
		salesOrder.IMAGE_CONTENT= resultSet.getBlob(16);
		            	
		topTen.push(salesOrder);
	  
	}
                    
                    //////////////////////////////////////////////////////////
                
                    ///////////////////////////////////////////////////////////
                    
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
  