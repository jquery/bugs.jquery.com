
Here is the source :
<script>
			
				function shoutBoxMessages()
				{
					 $.ajax({
						   type: "GET",
						    url: "function/LittleMessages/LittleMessages.php",
						    success: function(response) {
						    
							$("#shoutBoxCell").html("");
							eval( "var Dataes = " + response + "; ");
							shoutBoxLength = Dataes.shoutBoxes.length;
							if ( shoutBoxLength == 0 ) { alert("A szerverrel megszakadt a kapcsolat! "); }
													
							for (var  i=0; i <= (shoutBoxLength-1); i++ )  {
								userName = Dataes.shoutBoxes[i].nick;
								userId = Dataes.shoutBoxes[i].userId;
								shoutMessage = Dataes.shoutBoxes[i].shoutMess;
								userPicture = Dataes.shoutBoxes[i].userPict;
								timeIs = Dataes.shoutBoxes[i].timeIs;
								
								timeIs = "";
								
								shoutBoxIs = " <div style=\'background-color: #D1D5D6;\'> " + 
								" <table cellpadding=\'0\' cellspacing=\'0\' width=\'100%\' style=\'background-color: #D1D5D6; margin: 4px; margin-bottom: 0px; background-repeat: no-repeat;\'> " +
								" <tbody style=\'background-color: #fafafa; height: 60px;\'> " +
								" <tr> " +
								" <td align=\'left\' valign=\'top\' width=\'10%\' style=\'padding:2px;\'> " +
								" <div style=\'border: 2px solid #758386; background-color:black; width: 80px;\'> " +
								" <img src=\'"+userPicture+"\' width=\'80\' height=\'60\' border=\'0\'> " +
								" </div> " +
								" </td> " +
								" <td align=\'left\' valign=\'top\' width=\'90%\' style=\'padding:2px;\'> " +
								" <div style=\'border: 2px solid #758386; height: 58px; font-size: 12px;\'> " +
								" <span style=\'margin: 5px;\'>"+shoutMessage+"</span> " +
								" </div> " +
								" </td> " +
								" </tr> " +
								" </tbody> " +
								" </table> " +
								" <table cellpadding=\'0\' cellspacing=\'0\' width=\'100%\' style=\'background-color: #D1D5D6; margin: 4px; margin-top: 0px; background-repeat: no-repeat;\'> " +
								" <tbody style=\'background-color: #fafafa;\'> " +
								" <tr> " +
								" <td align=\'left\' width=\'40%\' style=\'fon-color: white; font-weight: bold;\'> " +
								" <div style=\'margin: 2px; background-color: #a2acae; height: 20px; '.$padding.' padding-left: 5px;\'> " +
								" <a style=\'color: white; font-weight: bold;\' href=\''.$PHP_SELF.'?menu=profile&id="+userId+"\'>"+userName+"</a> " +
								" </div> " +
								" </td> " +
								" <td align=\'left\' width=\'20%\' style=\'fon-color: white; font-weight: bold;\'> " +
								" <div style=\'margin: 2px; background-color: #d0d5d6; height: 20px; padding-top: 3px; padding-left: 5px;\'> " +
								" &nbsp; " +
								" </div> " +
								" </td> " +
								" <td align=\'left\' width=\'40%\' style=\' fon-color: white; font-weight: bold; font-size: 12px;\'> " +
								" <div style=\'margin: 2px; background-color: #a2acae; height: 20px; padding-top: 3px; padding-left: 5px;\'> " +
								" "+timeIs+" " +
								" </div> " +
								" </td> " +
								" </tr> " +
								" </tbody> " +
								" </table> " +
								" </div> ";
								$("#shoutBoxCell").append(shoutBoxIs);
							}
							}});
				}
				
				self.setInterval("shoutBoxMessages()", 7000);
		
			 </script>