var select_all_sales_orders_query = 
	"select name, CONTACT_TYPE, "+
	"round(avg(CAST(FRIENDLEVEL as REAL)), 2) as friendvalue , "+
	"round(avg(CAST(value as REAL)) ,2) as BusinessValue , "+
	"round(avg(CAST(COLLABORATE as REAL)),2) as Collabvalue , CASE CONTACT_TYPE WHEN 'OTHER' THEN 'OTHER' "+
	"ELSE 'COMPANY' END as groupType "+
	"from \"SYSTEM\".\"BMBFRIENDS\"  GROUP by CONTACT_TYPE , NAME";
//	"select  CONTACT_TYPE ,"+
//"round(avg(CAST(FRIENDLEVEL as INT)), 0) as friendvalue , "+
//"round(avg(CAST(value as INT)) , 0) as BusinessValue , "+
//"round(avg(CAST(COLLABORATE as REAL)), 0) as Collabvalue "+
//"  from \"SYSTEM\".\"BMBFRIENDS\"  GROUP by CONTACT_TYPE "+
//"UNION all "+
//	"select  NAME ,"+
//"round(avg(CAST(FRIENDLEVEL as INT)), 0) as friendvalue , "+
//"round(avg(CAST(value as INT)) , 0) as BusinessValue , "+
//"round(avg(CAST(COLLABORATE as REAL)), 0) as Collabvalue "+
//"  from \"SYSTEM\".\"BMBFRIENDS\"  GROUP by NAME ";
	



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
	var salesOrderList = {"bubbleService": topTen};   
          var connection =  $.db.getConnection("V1.services::access"); 
          var statement = null;  
          var resultSet = null;   
          try{  
                    statement = connection.prepareStatement(select_all_sales_orders_query);  
                    resultSet = statement.executeQuery();  
                    var salesOrder;  
                    
                    
                  
                    while (resultSet.next()) { 
                    	      
                    	salesOrder = {};
                    	salesOrder.Name = resultSet.getString(1);  
                    	salesOrder.friendValue = resultSet.getString(3); 
                    	salesOrder.BusinessValue = resultSet.getString(4);
                    	salesOrder.CollabValue = resultSet.getString(5);
                    	salesOrder.grouptype = resultSet.getString(6);
                    	
                    	 topTen.push(salesOrder);
          
                    }  
          } finally {  
        	  		
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
  