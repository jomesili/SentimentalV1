$.response.contentType = "text/html";
var body;
var idResult;           	
var  ID;
var output = "Access Users records !";
var conn = $.db.getConnection("V1.services::access");

conn.prepareStatement("SET SCHEMA \"SYSTEM\"").execute(); 
//get ID
var pstmt = conn.prepareStatement(
		//"select * from \"SYSTEM\".\"BMBFRIENDS\""
		"select (max(TO_NUMBER(ID)) + 1) from \"BMBFRIENDS\"" 
);

var rs = pstmt.executeQuery();
if(!rs.next()) 
	{
	
	body = "Failed Reteiving  attribute view";
	$.response.addBody(body);  
	}
else{
	 
	 var IDResult = rs.getInteger(1);
		if (IDResult=== null ){ID = 0;}
		else {ID = rs.getInteger(1); }
}

 
 
var COMPANY_NAME = $.request.parameters.get("COMPANY_NAME");  
if (COMPANY_NAME === null) {  
    $.response.setContentType("text/plain");  
    output ="COMPANY_NAME is null!" + "</br>"; 
   
}  
var  COMPANY_WEBSITE = $.request.parameters.get("COMPANY_WEBSITE");  
if (COMPANY_WEBSITE === null) {  
    $.response.setContentType("text/plain");  
    output ="COMPANY_WEBSITE is null!" + "</br>"; 
}  
var  INDUSTRY_SECTOR = $.request.parameters.get("INDUSTRY_SECTOR");  
if (INDUSTRY_SECTOR === null) {  
    $.response.setContentType("text/plain");  
    output = "INDUSTRY_SECTOR  is null!" + "</br>";  
} 
var FIRSTNAME = $.request.parameters.get("FIRSTNAME");  
if (FIRSTNAME === null) {  
    $.response.setContentType("text/plain");  
    output ="FIRSTNAME is null!" + "</br>";  
}  
var LASTNAME = $.request.parameters.get("LASTNAME");  
if (LASTNAME === null) {  
    $.response.setContentType("text/plain");  
    output ="LASTNAME is null!" + "</br>";  
} 
var POSITION = $.request.parameters.get("POSITION");  
if (POSITION === null) {  
    $.response.setContentType("text/plain");  
    output ="POSITION is null!" + "</br>";  
}  
var EMAIL_ADDRESS = $.request.parameters.get("EMAIL_ADDRESS");  
if (EMAIL_ADDRESS === null) {  
    $.response.setContentType("text/plain");  
    output ="EMAIL_ADDRESS is null!" + "</br>";    
}
var PHONE_NUMBER = $.request.parameters.get("PHONE_NUMBER");  
if (PHONE_NUMBER === null) {  
    $.response.setContentType("text/plain");  
    output ="PHONE_NUMBER is null!" + "</br>";   
}
 
 var FRIEND_LEVEL = $.request.parameters.get("FRIEND_LEVEL");  
if (FRIEND_LEVEL === null) {  
    $.response.setContentType("text/plain");  
    output ="FRIEND_LEVEL is null!" + "</br>";   
}
var BUSINESS_VALUE = $.request.parameters.get("BUSINESS_VALUE");  
if (BUSINESS_VALUE  === null) {  
    $.response.setContentType("text/plain");  
    output ="BUSINESS_VALUE is null!" + "</br>";   
}
var COLLABORATE = $.request.parameters.get("COLLABORATE");  
if (COLLABORATE === null) {  
    $.response.setContentType("text/plain");  
    output ="COLLABORATE is null!" + "</br>";   
}
var DATE = $.request.parameters.get("DATE");  
if (DATE === null) {  
    $.response.setContentType("text/plain");  
    output ="DATE is null!" + "</br>";   
}

var USER = $.request.parameters.get("USER");  
if (USER === null) {  
    $.response.setContentType("text/plain");  
    output ="USER is null!" + "</br>";   
}
    
		  

var output = {};   
output.data = [];  
try  
{  
conn.prepareStatement("SET SCHEMA \"SYSTEM\"").execute();
var st = "INSERT INTO \"BMBFRIENDS\" values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"; 
pstmt = conn.prepareStatement(st);
pstmt.setInteger(1,ID);  
pstmt.setString(2,COMPANY_NAME);
pstmt.setString(3,COMPANY_WEBSITE);  
pstmt.setString(4,INDUSTRY_SECTOR);
pstmt.setString(5,FIRSTNAME);  
pstmt.setString(6,LASTNAME);// used to save value of bubble chart
pstmt.setString(7,POSITION);
pstmt.setString(8,EMAIL_ADDRESS); // used to save company name
pstmt.setString(9,PHONE_NUMBER); // used to save company name
pstmt.setString(10,FRIEND_LEVEL);// used to save value of bubble chart
pstmt.setString(11,BUSINESS_VALUE);
pstmt.setString(12,COLLABORATE); // used to save company name
pstmt.setString(13,DATE); // used to save company name
pstmt.setString(14,USER); // used to save company name
pstmt.setString(15,""); // used to save company name
pstmt.setString(16,""); // used to save company name
pstmt.execute();  
conn.commit();

	var record = [];   
	record.push(ID);  
	record.push(COMPANY_NAME);
	record.push(COMPANY_WEBSITE);
	record.push(INDUSTRY_SECTOR);  
	record.push(FIRSTNAME);
	record.push(LASTNAME);
	record.push(POSITION);
	record.push(EMAIL_ADDRESS);
	record.push(PHONE_NUMBER);
	record.push(FRIEND_LEVEL);  
	record.push(BUSINESS_VALUE);
	record.push(COLLABORATE);  
	record.push(DATE);
	record.push(USER);
	output.data.push(record);  
	
$.response.contentType = "text/html";
$.response.setBody("Insert successful!");  
 
//$.response.setBody(output);
rs.close();
pstmt.close();
conn.close();

}  
catch(err)  
{  
          if (pstmt !== null)  
          {  
                    pstmt.close();  
          }  
          if (conn !== null)  
          {  
                    conn.close();  
          }  
          $.response.setBody(err.message);  
} 