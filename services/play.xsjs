var conn = $.db.getConnection("V1.services::access");
var USERNAME  = $.request.parameters.get("USERNAME");
var PASSWORD = $.request.parameters.get("PASSWORD");


//UPDATE books SET price = 42.75 WHERE isbn =:v_isbn;

var select_all_sales_orders_query = "SELECT * from  \"SYSTEM\".\"USERS\" WHERE USERNAME = ? and PASSWORD = ?";

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
function getUser(){ 
	       
	       var content = false;
          var connection = $.db.getConnection();  
          var statement = null;  
          var resultSet = null;   
          try{  
                    statement = connection.prepareStatement(select_all_sales_orders_query);
                    statement.setString(1,USERNAME);
                    statement.setString(2,PASSWORD);
                    resultSet = statement.executeQuery();  
                    var salesOrder;  
                    var User=[];
                    var ReturnValue;
                    while (resultSet.next()) { 
                    	      
                    	salesOrder = {};
                    	salesOrder.ID = resultSet.getString(1);  
                    	salesOrder.USERNAME = resultSet.getString(2); 
                    	salesOrder.PASSWORD = resultSet.getString(3);
                    	salesOrder.EMAILADDRESS = resultSet.getString(4);
                    	salesOrder.PHONE = resultSet.getString(5); 
                    	
                    	User.push(salesOrder);
                        content = true;
                        
                    }
                    if (!content){
                        ReturnValue = false;
                    }
                    else{
                        ReturnValue = {"avgService": User};
                    }
                    return ReturnValue; 
                    
          } finally {  
        	  		
                    close([resultSet, statement, connection]);    
          }  
            
           
} 

 

function doGet() {  
          try{  
                    $.response.contentType = "application/json";  
                    
                    $.response.setBody(JSON.stringify(getUser()));  
          }  
          catch(err){  
                    $.response.contentType = "text/plain";  
                    $.response.setBody("Error while executing query: [" + err.message + "]");  
                    $.response.returnCode = 200;  
          }  
}  
  
doGet();