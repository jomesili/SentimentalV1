var select_all_sales_orders_query = 
	"select ID, COMPANY_NAME, "+
	"round(avg(CAST(FRIEND_LEVEL as Real)), 2) as friendvalue , "+
	"round(avg(CAST(BUSINESS_VALUE as Real)) , 2) as BusinessValue , "+
	"round(avg(CAST(COLLABORATE as REAL)), 2) as Collabvalue , CASE COMPANY_NAME WHEN 'OTHER' THEN 'OTHER' "+
	"ELSE 'COMPANY' END as groupType, "+
	"count(COMPANY_NAME) as Contacts from \"SYSTEM\".\"BMBFRIENDS\"  GROUP by ID,COMPANY_NAME";



//select  count(CONTACT_TYPE), CONTACT_TYPE as contactName,
//round(avg(CAST(FRIENDLEVEL as Real)), 2) as friendvalue , 
//round(avg(CAST(value as Real)) , 2) as BusinessValue , 
//round(avg(CAST(COLLABORATE as REAL)), 2) as Collabvalue ,
//
//CASE CONTACT_TYPE WHEN 'OTHER' THEN 'OTHER' 
//ELSE 'COMPANY' END as groupType from "SYSTEM"."BMBFRIENDS"  GROUP by CONTACT_TYPE;


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
		    var salesOrdersList ={"bubbleCoyService": topTen};   
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
                    	salesOrder.Name = resultSet.getString(2); 
                    	salesOrder.friendValue = resultSet.getString(3); 
                    	salesOrder.BusinessValue = resultSet.getString(4);
                    	salesOrder.CollabValue = resultSet.getString(5);
                    	salesOrder.grouptype = resultSet.getString(6);
                    	salesOrder.contactCount = resultSet.getString(7);
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
  