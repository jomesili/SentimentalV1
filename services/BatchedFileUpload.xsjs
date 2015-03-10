function escape(v1)  
{  
          var v2 = v1.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');  
          return v2;  
}  
$.response.contentType = "text/html";  
try  
{  
	var conn = $.db.getConnection("V1.services::access");  
          var filename = $.request.parameters.get("file_name");
          var userName = $.request.parameters.get("userName");
          var pstmtTime = conn.prepareStatement( "select UTCTOLOCAL(CURRENT_UTCTIMESTAMP,'EST') from dummy");  
          var rs = pstmtTime.executeQuery();  
          var batchTimestamp;  
          if (rs.next())  
          {  
                    batchTimestamp = rs.getTimestamp(1);  
          }  
          var batchId = filename+"_"+batchTimestamp;  
          var pstmt = conn.prepareStatement( "insert into  \"SYSTEM\".\"TEMPUPLOAD\" (ID,COMPANY_NAME,COMPANY_WEBSITE,INDUSTRY_SECTOR,FIRSTNAME,LASTNAME,POSITION,EMAIL_ADDRESS,PHONE_NUMBER,USER) " +  
          "values(?,?,?,?,?,?,?,?,?,?)" );  
          if($.request.entities.length>0){  
                    var file_body = $.request.entities[0].body.asString();  
                    var allTextLines = file_body.split(/\r\n|\n/);  
                    var lines;  
                    var entries;  
                    var col;  
                    pstmt.setBatchSize(allTextLines.length-1);   
                    for (lines=0; lines<allTextLines.length; lines++)      
                    {  
                              entries = allTextLines[lines].split(',');  
                              col = entries.splice(0,allTextLines.length);  
                              if ( col[0].length > 0 )  
                              {  
                                        col[0] = escape(col[0]);  
                                        pstmt.setString(1,col[0]); 
                                        pstmt.setString(2,col[1]); 
                                        pstmt.setString(3,col[2]); 
                                        pstmt.setString(4,col[3]); 
                                        pstmt.setString(5,col[4]); 
                                        pstmt.setString(6,col[4]); 
                                        pstmt.setString(7,col[4]); 
                                        pstmt.setString(8,col[4]); 
                                        pstmt.setString(9,col[4]); 
                                        pstmt.setString(10,userName);
                                       
                                        pstmt.addBatch();  
                              }  
                    }  
                    pstmt.executeBatch(); 
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
          $.response.setBody(err.message);  
}  