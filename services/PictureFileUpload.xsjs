$.response.contentType = "text/html";  
var ID  = $.request.parameters.get("ID");
try  
 {  
           var conn = $.db.getConnection("V1.services::access");  
           var filename = $.request.parameters.get("file_name");  
           var pstmt = conn.prepareStatement( "UPDATE \"SYSTEM\".\"BMBFRIENDS\" SET IMAGE_CONTENT = ? where ID='"+ID+"'"); 
           if($.request.entities.length>0){  
                     	var file_body = $.request.entities[0].body.asArrayBuffer();  
                     	pstmt.setBlob(1,file_body);
               	  		pstmt.execute();
               	  		$.response.setBody("Upload successful!");  
           }  
           else  
           {  
                     $.response.setBody("No Entries");  
           }  
           pstmt.close();  
           conn.commit();  
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
           
           if (err.code === 274){//Problem with the ID of the File
        	   $.response.setBody("There is a problem with your upload ");   
           }
           else{
        	   $.response.setBody(err.message);
           }
            
 }   
