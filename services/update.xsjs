var conn = $.db.getConnection("V1.services::access");
var ID  = $.request.parameters.get("ID");
var COMPANY_NAME  = $.request.parameters.get("COMPANY_NAME");
var COMPANY_WEBSITE = $.request.parameters.get("COMPANY_WEBSITE");
var INDUSTRY_SECTOR  = $.request.parameters.get("INDUSTRY_SECTOR");
var FIRSTNAME = $.request.parameters.get("FIRSTNAME");
var LASTNAME = $.request.parameters.get("LASTNAME");
var POSITION = $.request.parameters.get("POSITION");
var EMAIL_ADDRESS = $.request.parameters.get("EMAIL_ADDRESS");
var PHONE_NUMBER = $.request.parameters.get("PHONE_NUMBER");
var FRIEND_LEVEL  = $.request.parameters.get("FRIEND_LEVEL");
var BUSINESS_VALUE = $.request.parameters.get("BUSINESS_VALUE");
var COLLABORATE = $.request.parameters.get("COLLABORATE");

//UPDATE books SET price = 42.75 WHERE isbn =:v_isbn;

var select_all_sales_orders_query = "UPDATE \"SYSTEM\".\"BMBFRIENDS\" SET COMPANY_NAME = ?, "+
	" COMPANY_WEBSITE = ?, "+
	" INDUSTRY_SECTOR = ?, "+
	" FIRSTNAME = ?, "+
	" LASTNAME = ?, "+
	" POSITION = ?, "+
	" EMAIL_ADDRESS = ?, "+
	" PHONE_NUMBER = ?, "+
	" FRIEND_LEVEL = ?, "+
	" BUSINESS_VALUE = ?, "+
	" COLLABORATE = ? "+
	
	" where ID='"+ID+"'";

var pstmt = conn.prepareStatement(select_all_sales_orders_query);
pstmt.setString(1,COMPANY_NAME);
pstmt.setString(2,COMPANY_WEBSITE);
pstmt.setString(3,INDUSTRY_SECTOR);
pstmt.setString(4,FIRSTNAME);
pstmt.setString(5,LASTNAME);
pstmt.setString(6,POSITION);
pstmt.setString(7,EMAIL_ADDRESS);
pstmt.setString(8,PHONE_NUMBER);
pstmt.setString(9,FRIEND_LEVEL);
pstmt.setString(10,BUSINESS_VALUE);
pstmt.setString(11,COLLABORATE);

pstmt.execute();  
conn.commit();

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
