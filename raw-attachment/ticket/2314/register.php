<?php require_once('Connections/dataKont.php'); ?>
<?php
// Load the tNG classes
require_once('includes/tng/tNG.inc.php');

// Make unified connection variable
$conn_dataKont = new KT_connection($dataKont, $database_dataKont);

// Captcha Image
$captcha_id_obj = new KT_CaptchaImage("captcha_id_id");
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><!-- InstanceBegin template="/Templates/Azazi2.dwt.php" codeOutsideHTMLIsLocked="false" -->
<!-- DW6 -->

<?php include('scripts/t_includes.php'); ?>

<head>

<!-- Copyright 2005 Macromedia, Inc. All rights reserved. -->
<!-- InstanceBeginEditable name="doctitle" -->
<title>Register</title>
<!-- InstanceEndEditable -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" href="styles/mm_health_nutr.css" type="text/css" />
<script language="javascript" src="scripts/main_js.js" type="text/javascript"></script>
<script language="JavaScript" type="text/javascript">
//--------------- LOCALIZEABLE GLOBALS ---------------
var d=new Date();
var monthname=new Array("January","February","March","April","May","June","July","August","September","October","November","December");
//Ensure correct for language. English is "January 1, 2004"
var TODAY = monthname[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
//---------------   END LOCALIZEABLE   ---------------
</script>
<!-- InstanceBeginEditable name="head" -->
<script type="text/javascript" src="scripts/jquery.js"></script>
<script>
function chkAva(lnk,id){
el = document.getElementById(id).value;
if (el == ''){
alert('The user id should have a value before check');
return;
}
av = "Available";
na =  "Not Available, choose another one!"

$(document).ready(function(){
$("#"+lnk).before("<img src='imgs/wait.gif' id='waitImg' /> ");
$.ajax({url: 'chk_user.php',type:'GET', data: 'Id='+ el, cache: false, dataType: "script", success: function(data, textStatus){

    $("#waitImg").remove()
	if (data == 0){
		if (document.getElementById('av') == null){		
		$("#"+lnk).after(" <span id='av' class='hint'> "+av+"</span>");
		}
		else{
			$("#av").empty();
			$("#"+lnk).after(" <span id='av' class='hint'> "+av+"</span>");
		}
	}
	else{
		if (document.getElementById('av') != null){
			$("#av").empty();
		}
		$("#"+lnk).after(" <span id='av' class='hint'> "+na+"</span>");
		}
	
	},
	error: function(x,txt,err){
	$("#waitImg").remove();
	alert('Could not check...'+"\n"+'The server may down or busy. Retry again after a while.');
	}
});
//$.get("chk_user.php",{Id: document.getElementById(id).value},function(data){
//alert(data);
//}
//)
});


}
</script>

<!-- InstanceEditableHeadTag --><!-- InstanceEndEditable -->
<link href="includes/skins/mxkollection3.css" rel="stylesheet" type="text/css" media="all" />
<script src="includes/common/js/base.js" type="text/javascript"></script>
<script src="includes/common/js/utility.js" type="text/javascript"></script>
<script src="includes/skins/style.js" type="text/javascript"></script>
<!-- Vertical Ticker -->

<script type="text/javascript">

/***********************************************
* Cross browser Marquee II- © Dynamic Drive (www.dynamicdrive.com)
* This notice MUST stay intact for legal use
* Visit http://www.dynamicdrive.com/ for this script and 100s more.
***********************************************/

var delayb4scroll=2000 //Specify initial delay before marquee starts to scroll on page (2000=2 seconds)
var marqueespeed=2 //Specify marquee scroll speed (larger is faster 1-10)
var pauseit=1 //Pause marquee onMousever (0=no. 1=yes)?

////NO NEED TO EDIT BELOW THIS LINE////////////

var copyspeed=marqueespeed
var pausespeed=(pauseit==0)? copyspeed: 0
var actualheight=''

function scrollmarquee(){
if (parseInt(cross_marquee.style.top)>(actualheight*(-1)+8))
cross_marquee.style.top=parseInt(cross_marquee.style.top)-copyspeed+"px"
else
cross_marquee.style.top=parseInt(marqueeheight)+8+"px"
}

function initializemarquee(){
cross_marquee=document.getElementById("vmarquee")
cross_marquee.style.top=0
marqueeheight=document.getElementById("marqueecontainer").offsetHeight
actualheight=cross_marquee.offsetHeight
if (window.opera || navigator.userAgent.indexOf("Netscape/7")!=-1){ //if Opera or Netscape 7x, add scrollbars to scroll and exit
cross_marquee.style.height=marqueeheight+"px"
cross_marquee.style.overflow="scroll"
return
}
setTimeout('lefttime=setInterval("scrollmarquee()",30)', delayb4scroll)
}

if (window.addEventListener)
window.addEventListener("load", initializemarquee, false)
else if (window.attachEvent)
window.attachEvent("onload", initializemarquee)
else if (document.getElementById)
window.onload=initializemarquee


</script>
<!-- End Vertical Ticker -->
</head>
<body bgcolor="#F4FFE4">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr bgcolor="#D5EDB3">
    <td width="382" colspan="3" rowspan="2"><img src="styles/mm_health_photo.jpg" alt="Header image" width="382" height="101" border="0" /></td>
    <td width="378" height="50" colspan="3" id="logo" valign="bottom" align="center" nowrap="nowrap">Azzazi Anesthesia</td>
    <td width="100%" align="right" valign="top"> <?php
//Show If User Is Logged In (logout)
$isLoggedIn = new tNG_UserLoggedIn($conn_dataKont);
//Grand Levels: Any
if ($isLoggedIn->Execute()) {
?>
          <?php
	
?><a href="logout.php">Logout</a>
        <?php 
// else Show If User Is Logged In (logout)
} else { ?>
<a href="login.php">Login</a>
<?php
}
//End Show If User Is Logged In (logout)
?>
        </td>
  </tr>

  <tr bgcolor="#D5EDB3">
    <td height="51" colspan="3" id="tagline" valign="top" align="center">Anesthesia Website</td>
	<td width="100%">&nbsp;</td>
  </tr>

  <tr>
    <td colspan="7" bgcolor="#5C743D"><img src="styles/mm_spacer.gif" alt="" width="1" height="2" border="0" /></td>
  </tr>

  <tr>
    <td colspan="7" bgcolor="#99CC66" background="styles/mm_dashed_line.gif"><img src="styles/mm_dashed_line.gif" alt="line decor" width="4" height="3" border="0" /></td>
  </tr>

  <tr bgcolor="#99CC66">
  	<td height="20" colspan="7" bgcolor="#99CC66" id="dateformat">&nbsp;&nbsp;<script language="JavaScript" type="text/javascript">
      document.write(TODAY);	</script> 
  	| Welcome <?php echo $_SESSION['kt_name']; ?> | <a href="uc.php">Your Controls</a></td>
  </tr>
  <tr>
    <td colspan="7" bgcolor="#99CC66" background="styles/mm_dashed_line.gif"><img src="styles/mm_dashed_line.gif" alt="line decor" width="4" height="3" border="0" /></td>
  </tr>

  <tr>
    <td colspan="7" bgcolor="#5C743D"><img src="styles/mm_spacer.gif" alt="" width="1" height="2" border="0" /></td>
  </tr>

 <tr>
    <td width="165" valign="top" bgcolor="#5C743D">
	<table border="0" cellspacing="0" cellpadding="0" width="165" id="navigation">
        <tr>
          <td width="165" align="center" valign="top"><form id="form1" name="form1" method="post" action="" style="display:inline">
            <input type="text" name="sq" id="sq" style="border: 0px;" />
                    <input type="submit" name="button" id="button" value="Search" style="border: 0px; background-color:#99CC66;" /></form>
          </td>
        </tr>
        <tr>
          <td width="165"><a href="index.php" class="navText">Home</a></td>
        </tr>
        <tr>
          <td width="165"><a href="blog.php" class="navText">Blog</a></td>
        </tr>
        <tr>
          <td width="165"><a href="news.php" class="navText">News Wall</a></td>
        </tr>
        <tr>
          <td width="165"><a href="books.php" class="navText">Books</a></td>
        </tr>
        <tr>
          <td width="165"><a href="biography.php" class="navText">Biography</a></td>
        </tr>
        <tr>
          <td width="165"><a href="contacts.php" class="navText">Contacts</a></td>
        </tr>
        <tr>
          <td width="165"><a href="register.php" class="navText">Register</a></td>
        </tr>
        <?php 
// Show IF Conditional region2 
if (@$_SESSION['kt_login_level'] == "A" || $_SESSION['kt_login_level'] == "B" ) {
?>
          <tr>
            <td width="165"><a href="admin/index.php" class="navText">Administration</a></td>
          </tr>
          <?php } 
// endif Conditional region2
?>
        <tr>
          <td>&nbsp;
          <script language="javascript">
		  page = document.URL		  
		  dimLink(page);
		  </script>
          </td>
        </tr>
      </table>
 	 <br />
  	&nbsp;<br />
  	&nbsp;<br />
  	&nbsp;<br /> 	</td>
    <td width="50" style="background:url(imgs/gra_v2m.gif) repeat-y"><img src="styles/mm_spacer.gif" alt="" width="50" height="1" border="0" /></td>
    <td width="305" colspan="2" valign="top"><img src="styles/mm_spacer.gif" alt="" width="305" height="1" border="0" /><br />
	&nbsp;<br />
    <?php do { ?>
  <?php echo $row_staticCont0['content']; ?>

  
  <?php } while ($row_staticCont0 = mysql_fetch_assoc($staticCont0)); ?>
	&nbsp;<br />
	<!-- InstanceBeginEditable name="ContTents" -->
	<table border="0" cellspacing="0" cellpadding="0" width="305">
      <tr>
        <td class="pageName">Register...</td>
      </tr>
      <tr>
        <td valign="top" class="bodyText"><p>Using the following form you will gain the registered user priviledges. Fields signed with * is required fields and should be filled.
            
          <form method="post" id="form2">
            <table cellpadding="2" cellspacing="0" class="KT_tngtable">
              <tr>
                <td class="KT_th"><label for="userId">User ID</label></td>
                <td><input type="text" name="userId" id="userId" size="32" /> 
                  <a id="chk1" href="javascript:chkAva('chk1','userId')">check</a> </td>
              </tr>
              <tr>
                <td class="KT_th"><label for="name">Name:</label></td>
                <td><input type="text" name="name" id="name" size="32" /></td>
              </tr>
              <tr>
                <td class="KT_th"><label for="email">Email:</label></td>
                <td><input type="text" name="email" id="email" size="32" /></td>
              </tr>
              <tr>
                <td class="KT_th"><label for="password">Password:</label></td>
                <td><input type="password" name="password" id="password" value="" size="32" /></td>
              </tr>
              <tr>
                <td class="KT_th"><label for="re_password">Re-type Password:</label></td>
                <td><input type="password" name="re_password" id="re_password" value="" size="32" />                </td>
              </tr>
              <tr>
                <td class="KT_th"><label for="location">Location:</label></td>
                <td><input type="text" name="location" id="location" size="32" /></td>
              </tr>
              <tr>
                <td class="KT_th"><label for="address">Address:</label></td>
                <td><textarea name="address" id="address" cols="50" rows="5"></textarea></td>
              </tr>
              <tr>
                <td class="KT_th"><label for="mobile">Mobile:</label></td>
                <td><input type="text" name="mobile" id="mobile" size="32" /></td>
              </tr>
              <tr>
                <td class="KT_th"><label for="birth_date">Birth_date:</label></td>
                <td><input name="birth_date" type="text" id="birth_date" size="32" /></td>
              </tr>
              <tr>
                <td class="KT_th"><label for="gender">Gender:</label></td>
                <td><select name="gender" id="gender">
                    <option value="N">No Tell</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select></td>
              </tr>
              <tr class="KT_buttons">
                <td colspan="2"><input type="submit" name="KT_Insert1" id="KT_Insert1" value="Register" />                </td>
              </tr>
            </table>
          </form>
          <p>&nbsp;</p>
          </p>
<p>&nbsp;</p></td>
      </tr>
    </table>
	<!-- InstanceEndEditable --> <br />
	&nbsp;<br />	</td>
    <td width="50"><img src="styles/mm_spacer.gif" alt="" width="50" height="1" border="0" /></td>
        <td width="190" valign="top"><br />
		&nbsp;<br />
		<table border="0" cellspacing="0" cellpadding="0" width="190" id="leftcol">

	   <tr>
       <td width="10"><img src="styles/mm_spacer.gif" alt="" width="10" height="1" border="0" /></td>
		<td width="170" class="smallText"><br />
        <div id="marqueecontainer" onMouseover="copyspeed=pausespeed" onMouseout="copyspeed=marqueespeed">
        <div id="vmarquee" style=" position:absolute; width: 98%;">
            <!--YOUR SCROLL CONTENT HERE-->
			<p><span class="subHeader">TITLE HERE</span><br />
			Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam. </p>

			<p><span class="subHeader">TITLE HERE</span><br />
			Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam. </p>

			<p><span class="subHeader">TITLE HERE</span><br />
			Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam. </p>
            </div>
            </div>

			 <br />
			&nbsp;<br />          </td>
         <td width="10">&nbsp;</td>
        </tr>
      </table>	</td>
	<td width="100%">&nbsp;</td>
  </tr>
  <tr>
    <td width="165" height="0"></td>
    <td width="50" height="0"></td>
    <td width="167" height="0"></td>
    <td width="138" height="0"></td>
    <td width="50" height="0"></td>
    <td width="190" height="0"></td>
	<td width="100%" height="0"></td>
  </tr>
  <tr bgcolor="#99CC66">
  	<td height="20" colspan="7" align="center" bgcolor="#99CC66" id="dateformat">&nbsp;&nbsp;
  	  Azzazi Anesthesia<br />
  	  Developed By <a href="http://saidbakr.atspace.com" target="_blank">Said Bakr OnLine</a></td>
  </tr>
</table>
</body>
<!-- InstanceEnd --></html>
