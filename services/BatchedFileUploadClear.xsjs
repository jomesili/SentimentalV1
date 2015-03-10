function escape(v1)  
{  
          var v2 = v1.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');  
          return v2;  
}  
$.response.contentType = "text/html";  
try  
{  
	
	var conn = $.db.getConnection("V1.services::access");  
          var userName = $.request.parameters.get("userName");  
          var deletStatement= "Delete from \"SYSTEM\".\"TEMPUPLOAD\" where USER='"+userName+"'";  
          var pstmt = conn.prepareStatement(deletStatement);  
         
          pstmt.execute(); 
          $.response.setBody("Delete successful!");  
            
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
          $.response.setBody(err.message);  
}  