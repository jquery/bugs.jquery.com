<?
$HEADER=implode("",file("/data/cricket/web/html/templates/web4/newHeader.html"));
$NAVIGATION=implode("",file("/data/cricket/web/html/templates/web4/newNaigation.html"));
$FOOTER=implode("",file("/data/cricket/web/html/templates/web4/footer.html"));
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Cricketnext | Questionair</title>
<link rel="stylesheet" type="text/css" href="/css/web4/newHome.css" />
<style type="text/css">
<!-- 
 input.border {
   border:#fff 1px solid;

}
#fpc label { width: 250px;}
#fpc label.error{ margin: 2px; color:#FF0000; font-size:9px;}  
#alert label { width: 250px;}
#alert label.error{ margin: 2px; color:#FF0000; font-size:9px;} 
-->
</style>
<script language="javascript" type="text/javascript" src="/js/web3/newbnnr/homepage.js"></script>
<script language="javascript" type="text/javascript" src="tooltip.js"></script>
<script language="javascript" type='text/javascript' src='/js/jquery/jquery-1.3.1.min.js'></script>
<script type='text/javascript' src='/js/jquery/form.jquery.js'></script>
<script type='text/javascript' src='/js/jquery/echeckjs.js'></script>

<script>
function setCookie(c_name,value,expiredays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate()+expiredays);
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}


function formSubmit(formName)
{
var fd=$("#"+formName).serialize();
 $.post("questionair.php",fd,function(data){
			
			alert(data);
	
			});

}



$(document).ready(function(){
$("input#submit-part1").click(function() {
     var inp1=Array("sex",'age','qualification','profession','email');
	var msg1=Array("Please select your gender","Please select your age","Please select your qualification","Please select your profession","Please fill your email");
    var l1=validCheck(inp1,msg1);
    if(l1)
	{
	 setCookie("questioniar",email);
     formSubmit("form-part1");
     $(".part1").hide();
	 $(".part2").show();
	 var email=$("#email").val();
     
	}	 
	return false;		
    });
	$("input#submit-part2").click(function() {
     var inp1=Array("Internet",'Time-weekdays','Time-weekends','Frequency','portals-weekdays','portals-weekends');
	var msg1=Array("Please tell us your place Internet of access","Please tell us average Time spent on the internet Daily","Please tell us average Time spent on the internet on weekends","Please tell us your Frequency of visiting the sports portals","Please tell us average Time spent on the sports portals Daily","Please tell us average Time spent on the sports portals on weekends");
    var l1=validCheck(inp1,msg1);
    if(l1)
	{
	  formSubmit("form-part2");
    // $(".part1").hide();
	 $(".part2").hide();
	 $(".part3").show();
	}	 
	return false;		
    });
	$("input:[name^='own-']").click(function (){
	switch($(this).val())
	{
		case "none":
		//for(i=4; i<=12; i++)
		//{
		//$(".part"+i).hide();
		//}
		break;
		case "block":
		for(i=4; i<=12; i++)
		{
		$(".part"+i).hide();
		}
		var g=this.name.split("-");
		$("."+g[2]).show();
		break;
	}
	  
	});
$("#form-part4,#form-part5,#form-part6,#form-part7,#form-part8,#form-part9,#form-part10,#form-part11,#form-part12").submit(function(){
alert(this.id)
formSubmit(this.id);
return false;
});
	
});
</script>

<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}
.style1 {
	font-family: Verdana, Arial, Helvetica, sans-serif;
	font-size: 12px;
	color: #666666;
}
.style2 {font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 12px; color: #666666; font-weight: bold; }
.style4 {font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 12px; color: #1271CD; font-weight: bold; }
.style6 {font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 11px; color: #1271CD; font-weight: bold; }
-->
</style>
<script type="text/JavaScript">

</script>
</head>

<body>
<?=$HEADER?>
<?=$NAVIGATION?>
<table width="970" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" valign="top" bgcolor="#FFFFFF">&nbsp;</td>
  </tr>
  <tr>
    <td align="center" valign="top" bgcolor="#FFFFFF"><table width="970" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td><img src="images/top_bar1.jpg" width="970" height="14" /></td>
      </tr>
      <tr>
        <td align="center" valign="middle" background="images/mid_bar2.jpg"><table width="900" border="0" cellspacing="2" cellpadding="2">
          <tr>
            <td align="left" valign="top"><img src="images/welcome_img.gif" width="316" height="24" /></td>
          </tr>
          <tr>
            <td height="130" align="center" valign="middle"><div align="justify"><span class="style1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla sem vulputate sem ullamcorper a accumsan elit viverra. In hac habitasse platea dictumst. In ac erat lectus, et mollis sapien. Morbi auctor nibh blandit massa aliquet tincidunt. Donec pretium, lectus ut sodales commodo, tellus augue pharetra nisl, luctus tempus sem elit sed ipsum. Mauris placerat pellentesque placerat. Quisque convallis commodo lectus et porttitor. Quisque aliquet venenatis magna non accumsan. Phasellus fringilla tristique arcu, non tincidunt ipsum adipiscing ut. Nam feugiat aliquet dui ac ultrices. Cras interdum sem et lacus fermentum gravida. Sed tincidunt suscipit quam vel sodales. Phasellus adipiscing sapien non ante laoreet at vehicula sem varius. In rhoncus vulputate neque id iaculis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.</span></div></td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td><img src="images/bottom_bar3.jpg" width="970" height="14" /></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td align="center" valign="top" bgcolor="#FFFFFF">&nbsp;</td>
  </tr>
  <tr style="display:block;" class="part1">
    <td align="center" valign="top" bgcolor="#FFFFFF"><img src="images/divider_img.gif" width="970" height="14" /></td>
  </tr>
  <tr style="display:block;" class="part1">
    <td align="center" valign="top" bgcolor="#FFFFFF">&nbsp;</td>
  </tr>
  <tr style="display:block;" class="part1">
    <td align="center" valign="top" bgcolor="#FFFFFF"><table width="970" border="0" align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td width="11" align="left" valign="top" bgcolor="#F0F0F0"><img src="images/longbar_left.gif" width="7" height="38" /></td>
        <td width="956" align="left" valign="middle" bgcolor="#F0F0F0"><img src="images/tell_img1.gif" width="259" height="24" /></td>
        <td width="7" align="left" valign="top" bgcolor="#F0F0F0"><img src="images/longbar_right.gif" width="7" height="38" /></td>
      </tr>
    </table></td>
  </tr>
  <tr style="display:block;" class="part1">
    <td align="center" valign="top" bgcolor="#FFFFFF"><form onsubmit="" name="form-part1" id="form-part1"><table width="930"  border="0" align="center" cellpadding="2" cellspacing="2">
      <tr>
        <td align="center" valign="top"><table width="890" border="0" align="center" cellpadding="3" cellspacing="3">
          <tr>
            <td width="394" align="left" valign="top" class="style1">Gender </td>
            <td width="42" align="left" valign="top" class="style1">Male</td>
            <td width="21" align="left" valign="top" class="style1"><input type="radio" name="sex" value="radio" /></td>
            <td width="52" align="left" valign="top"><span class="style1">Female</span></td>
            <td width="333" align="left" valign="top"><input type="radio" name="sex" value="radio"  validate="required:true"/></td>
          </tr>
          <tr>
            <td align="left" valign="top" class="style1">Age </td>
            <td colspan="4" align="left" valign="top" class="style1"><select name="age">
                <option value="">- - - - - Select - - - - - </option>
                <option value="< 21">&lt; 21 yrs</option>
                <option value="21 - 28">21 - 28 yrs</option>
                <option value="29 - 35">29 - 35 yrs</option>
                <option value="36 - 45">36 - 45 yrs</option>
                <option value="45 +">45 + yrs </option>
            </select></td>
          </tr>
          <tr>
            <td align="left" valign="top" class="style1">Education</td>
            <td colspan="4" align="left" valign="top" class="style1"><select name="qualification" >
                <option value="">- - - - - Select - - - - - </option>
                <option value="SSC - HSC">SSC &ndash; HSC</option>
                <option value="Graduate">Graduate</option>
                <option value="Post Graduate">Post Graduate</option>
                <option value="Diploma">Diploma</option>
                <option value="PHD">PHD</option>
            </select></td>
          </tr>
          <tr>
            <td align="left" valign="top" class="style1">Profession</td>
            <td colspan="4" align="left" valign="top" class="style1"><select name="profession" >
                <option value="">- - - - - Select - - - - - </option>
                <option value="Salaried">Salaried </option>
                <option value="Self employed">Self employed</option>
                <option value="Student">Student</option>
                <option value="Housewife">Housewife</option>
                <option value="Unemployed">Unemployed</option>
            </select></td>
          </tr>
          <tr>
            <td align="left" valign="top" class="style1">Industry</td>
            <td colspan="4" align="left" valign="top" class="style1"><select name="industry" >
                <option value="">- - - - - Select - - - - - </option>
                <option value="Manufacturing and Engineering">Manufacturing and Engineering </option>
                <option value="IT/ ITES">IT/ ITES</option>
                <option value="Telecom">Telecom</option>
                <option value="Finance">Finance, Banking, Insurance &amp; Securities</option>
                <option value="FMCG">FMCG</option>
                <option value="Retail">Retail</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Healthcare">Healthcare/ Pharma</option>
                <option value="Construction">Construction/ Infrastructure</option>
                <option value="Automotive">Automotive</option>
            </select></td>
          </tr>
          <tr>
            <td align="left" valign="top" class="style1">Others (Specify)</td>
            <td colspan="4" align="left" valign="top" class="style1"><input type="text" name="other-industry" /></td>
          </tr>
          <tr>
            <td align="left" valign="top" class="style1">City/ Location </td>
            <td colspan="4" align="left" valign="top" class="style1"><input type="text" name="city" /></td>
          </tr>
          <tr>
            <td align="left" valign="top" class="style1">Email</td>
            <td colspan="4" align="left" valign="top" class="style1"><input type="text" name="email" id="email" /></td>
          </tr>
          <tr>
          <td colspan="2" align="center">
          <input type="submit" value="submit" id="submit-part1"/>
          </td>
          </tr>
        </table></form></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td align="center" valign="top" bgcolor="#FFFFFF">&nbsp;</td>
  </tr>
  <tr style="display:none;" class="part2">
    <td align="center" valign="top" bgcolor="#FFFFFF"><img src="images/divider_img.gif" width="970" height="14" /></td>
  </tr>
  <tr style="display:none;" class="part2">
    <td align="center" valign="top" bgcolor="#FFFFFF">&nbsp;</td>
  </tr>
  <tr style="display:none;" class="part2">
    <td align="center" valign="top" bgcolor="#FFFFFF"><table width="970" border="0" align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td width="11" align="left" valign="top" bgcolor="#F0F0F0"><img src="images/longbar_left.gif" width="7" height="38" /></td>
        <td width="956" align="left" valign="middle" bgcolor="#F0F0F0"><img src="images/tell_img.gif" width="406" height="24" /></td>
        <td width="7" align="left" valign="top" bgcolor="#F0F0F0"><img src="images/longbar_right.gif" width="7" height="38" /></td>
      </tr>
    </table></td>
  </tr>
  <tr style="display:none;" class="part2">
    <td align="center" valign="top" bgcolor="#FFFFFF"><table width="930" border="0" align="center" cellpadding="2" cellspacing="2">
      <tr>
        <td align="center" valign="top"><form id="form-part2" name="form-part2"><table width="890" border="0" align="center" cellpadding="3" cellspacing="3">
          <tr>
            <td width="395" align="left" valign="top" class="style1">Place  of access of Internet</td>
            <td colspan="4" align="left" valign="top" class="style1"><select name="Internet" >
                <option value="">- - - - - Select - - - - - </option>
                <option value="Home">Home</option>
                <option value="Office">Office</option>
                <option value="Cyber Cafe">Cyber Caf&eacute;</option>
            </select></td>
          </tr>
          <tr>
            <td align="left" valign="top" class="style1">Others (Specify)</td>
            <td colspan="4" align="left" valign="top" class="style1"><input type="text" name="Others-Internet" /></td>
          </tr>
          <tr>
            <td align="left" valign="top" class="style1">Time spent on the internet Daily </td>
            <td colspan="3" align="left" valign="top" class="style1"><select name="Time-weekdays" >
              <option value="">Week days</option>
              <option value="< 1">&lt; 1 hour </option>
                  <option value="1-3">1-3 hrs </option>
                  <option value="3-5">3-5 hrs </option>
                  <option value="5+">5+ hours </option>
                                    </select></td>
            <td width="363" align="left" valign="top" class="style1"><select name="Time-weekends" >
              <option value="">Week Ends</option>
              <option value="< 1">&lt; 1 hour </option>
              <option value="1-3">1-3 hrs</option>
              <option value="3-5">3-5 hrs</option>
              <option value="5+">5+ hours</option>
            </select></td>
          </tr>
          <tr>
            <td align="left" valign="top" class="style1">Frequency  of visiting the sports portals</td>
            <td colspan="4" align="left" valign="top" class="style1"><select name="Frequency" >
                <option value="">- - - - - Select - - - - - </option>
                <option value="Daily">Daily</option>
                <option value="5 days">5 days a week</option>
                <option value="3-4">3-4 days a week</option>
                <option value="1-2">1-2 days a week</option>
            </select></td>
          </tr>
          <tr>
            <td align="left" valign="top" class="style1">Time  spent on sport portals daily</td>
            <td colspan="3" align="left" valign="top" class="style1"><select name="portals-weekdays" >
              <option value="">Week days</option>
              <option value="< 1">&lt; 1 hour </option>
              <option value="1-3">1-3 hrs </option>
              <option value="3-5">3-5 hrs </option>
              <option value="5+">5+ hours </option>
            </select></td>
            <td align="left" valign="top" class="style1"><select name="portals-weekends" >
              <option value="">Week Ends</option>
              <option value="< 1">&lt; 1 hour </option>
              <option value="1-3">1-3 hrs</option>
              <option value="3-5">3-5 hrs</option>
              <option value="5+">5+ hours</option>
            </select></td>
          </tr>
          <tr>
            <td align="left" valign="top" class="style1">Have you researched any products/services online to help you make the buying decision in the last 3 months?</td>
            <td width="33" align="left" valign="top" class="style1">Yes</td>
            <td width="28" align="left" valign="top" class="style1"><input type="radio" name="buying-decision" value="radio" /></td>
            <td width="23" align="left" valign="top" class="style1">No</td>
            <td align="left" valign="top" class="style1"><input type="radio" name="buying-decision" value="radio" /></td>
          </tr>
          <tr>
            <td align="left" valign="top" class="style1">If Yes please specify </td>
            <td colspan="4" align="left" valign="top" class="style1"><input type="text" name="decision" /></td>
          </tr>
          <tr>
            <td align="left" valign="top" class="style1">Have you purchased any products online in the last 3 months?</td>
            <td align="left" valign="top" class="style1">Yes</td>
            <td align="left" valign="top" class="style1"><input type="radio" name="products-online" value="radio" /></td>
            <td align="left" valign="top" class="style1">No</td>
            <td align="left" valign="top" class="style1"><input type="radio" name="products-online" value="radio" /></td>
          </tr>
          <tr>
            <td align="left" valign="top" class="style1">If Yes please specify</td>
            <td colspan="4" align="left" valign="top" class="style1"><input type="text" name="online" /></td>
          </tr>
          <tr>
            <td colspan="4" align="center" valign="top" class="style1"><input type="submit" name="submit-part2" id="submit-part2" value="Submit"/></td>
          </tr>
        </table></form></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td align="center" valign="top" bgcolor="#FFFFFF">&nbsp;</td>
  </tr>
  <tr style="display:none;" class="part3">
    <td align="center" valign="top" bgcolor="#FFFFFF"><img src="images/divider_img.gif" width="970" height="14" /></td>
  </tr>
  <tr style="display:none;" class="part3">
    <td align="center" valign="top" bgcolor="#FFFFFF">&nbsp;</td>
  </tr>
  <tr style="display:none;" class="part3">
    <td align="center" valign="top" bgcolor="#FFFFFF"><table width="970" border="0" align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td width="11" align="left" valign="top" bgcolor="#F0F0F0"><img src="images/longbar_left.gif" width="7" height="38" /></td>
        <td width="956" align="left" valign="middle" bgcolor="#F0F0F0"><img src="images/tell_img2.gif" width="444" height="24" /></td>
        <td width="7" align="left" valign="top" bgcolor="#F0F0F0"><img src="images/longbar_right.gif" width="7" height="38" /></td>
      </tr>
    </table></td>
  </tr>
  <tr style="display:none;" class="part3">
    <td align="center" valign="top" bgcolor="#FFFFFF"><table width="930" border="0" align="center" cellpadding="2" cellspacing="2">
      <tr>
        <td width="450" align="left" valign="top"><form id="form-part3" name="form-part3"><table width="450" border="0" align="left" cellpadding="3" cellspacing="3">
          <tr>
            <td colspan="5" align="left" valign="top" bgcolor="#F7F7F7" class="style2">Product you own </td>
          </tr>
          <tr>
            <td width="208" align="left" valign="top" bgcolor="#FFFFFF" class="style1">Home</td>
            <td width="49" align="left" valign="top" bgcolor="#FFFFFF" class="style1">Yes</td>
            <td width="50" align="left" valign="top" bgcolor="#FFFFFF" class="style1"><input type="radio" name="own-home-part4" value="block" /></td>
            <td width="50" align="left" valign="top" bgcolor="#FFFFFF" class="style1">No</td>
            <td width="50" align="left" valign="top" bgcolor="#FFFFFF" class="style1"><input type="radio" name="own-home-part4" value="none" /></td>
          </tr>
          <tr>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1">TV sets</td>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1">Yes</td>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1"><input type="radio" name="own-TV-part5" value="block" /></td>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1">No</td>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1"><input type="radio" name="own-TV-part5" value="none" /></td>
          </tr>
          <tr>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1">Cable transmission </td>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1">Yes</td>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1"><input type="radio" name="own-Cable-part6" value="block" /></td>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1">No</td>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1"><input type="radio" name="own-Cable-part6" value="none" /></td>
          </tr>
          <tr>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1">Refrigerator</td>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1">Yes</td>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1"><input type="radio" name="own-Refrigerator-part7" value="block" /></td>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1">No</td>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1"><input type="radio" name="own-Refrigerator-part7" value="none" /></td>
          </tr>
          <tr>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1">Air Conditioner</td>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1">Yes</td>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1"><input type="radio" name="own-Ac-part8" value="block" /></td>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1">No</td>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1"><input type="radio" name="own-Ac-part8" value="none" /></td>
          </tr>
          <tr>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1">Camera</td>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1">Yes</td>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1"><input type="radio" name="own-Camera-part9" value="block" /></td>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1">No</td>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1"><input type="radio" name="own-Camera-part9" value="none" /></td>
          </tr>
          <tr>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1">Portable Music System</td>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1">Yes</td>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1"><input type="radio" name="own-pms-part10" value="block" /></td>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1">No</td>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1"><input type="radio" name="own-pms-part10" value="none" /></td>
          </tr>
          <tr>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1">Mobile phone</td>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1">Yes</td>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1"><input type="radio" name="own-moblie-part11" value="block" /></td>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1">No</td>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1"><input type="radio" name="own-moblie-part11" value="none" /></td>
          </tr>
          <tr>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1">automobile / 4 wheeler</td>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1">Yes</td>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1"><input type="radio" name="own-automobile-part12" value="block" /></td>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1">No</td>
            <td align="left" valign="top" bgcolor="#FFFFFF" class="style1"><input type="radio" name="own-automobile-part12" value="none" /></td>
          </tr>
        </table></form></td>
        <td width="466" align="center" valign="top"><table width="451" border="0" cellspacing="0" cellpadding="0">
          <tr style="display:none;" class="part4">
            <td align="center" valign="top"><img src="images/smallbox_top1.gif" width="451" height="16" /></td>
          </tr>
          <tr style="display:none;" class="part4">
            <td align="center" valign="top" background="images/smallbox_mid2.gif"><form name="form-part4" id="form-part4" onsubmit="return false"><table width="420" border="0" align="center" cellpadding="2" cellspacing="2">
                <tr>
                  <td align="left" valign="top"><span class="style4">Product you own </span></td>
                  <td align="right" valign="top" class="style2">&nbsp;</td>
                </tr>
                <tr>
                  <td align="left" valign="top" class="style2">Home</td>
                  <td align="right" valign="top" class="style2">&nbsp;</td>
                </tr>
                <tr>
                  <td align="left" valign="top">&nbsp;</td>
                  <td align="left" valign="top">&nbsp;</td>
                </tr>
                <tr>
                  <td width="223" align="left" valign="top"><span class="style1">What type of home do you live in? </span></td>
                  <td width="183" align="left" valign="top"><span class="style1">
                    <select name="home-type" >
                      <option value="">- - - - - Select - - - - - </option>
                      <option value="Owned">Owned Apartment</option>
                      <option value="Rented">Rented Apartment</option>
                      <option value="Cottage">Cottage</option>
                      <option value="Bungalow">Bungalow </option>
                      <option value="Others-home">Bungalow </option>
                    </select>
                  </span></td>
                </tr>
                <tr>
                  <td align="left" valign="top"><span class="style1">Others (Specify)</span></td>
                  <td align="left" valign="top"><span class="style1">
                    <input type="text" name="home-Others" />
                  </span></td>
                </tr>
                <tr>
                  <td width="223" align="left" valign="top"><span class="style1">Do you intend to purchase a/another  home in the next one year? </span></td>
                  <td width="183" align="left" valign="top"><span class="style1">
                    <input type="radio" name="home-upgrade" value="yes"/> Yes
                  </span>&nbsp;<span class="style1">
                    <input type="radio" name="home-upgrade" value="no"/> No
                  </span></td>
                  </tr>
                  <tr>
                  <td align="left" valign="top">&nbsp;</td>
                  <td align="left" valign="top"><span class="style6"><input type="submit" name="submit-part4" value="Submit"/></span></td>
                </tr>
            </table></form></td>
          </tr>
          <tr style="display:none;" class="part4">
            <td align="center" valign="top"><img src="images/smallbox_bottom3.gif" width="451" height="16" /></td>
          </tr>
          
          <tr style="display:none;" class="part5">
            <td align="center" valign="top"><img src="images/smallbox_top1.gif" width="451" height="16" /></td>
          </tr>
          <tr style="display:none;" class="part5">
            <td align="center" valign="top" background="images/smallbox_mid2.gif"><form name="form-part5" id="form-part5" onsubmit="return false"><table width="420" border="0" align="center" cellpadding="2" cellspacing="2">
                <tr>
                  <td align="left" valign="top"><span class="style4">Product you own </span></td>
                  <td align="right" valign="top" class="style2">&nbsp;</td>
                </tr>
                <tr>
                  <td align="left" valign="top" class="style2">Tv</td>
                  <td align="right" valign="top" class="style2">&nbsp;</td>
                </tr>
                <tr>
                  <td align="left" valign="top">&nbsp;</td>
                  <td align="left" valign="top">&nbsp;</td>
                </tr>
                <tr>
                  <td width="223" align="left" valign="top"><span class="style1">How many TV sets do you own? </span></td>
                  <td width="183" align="left" valign="top"><span class="style1">
                    <select name="tv-count" >
                      <option value="">- - - - - Select - - - - - </option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="3+">More than 3 </option>
                    </select>
                  </span></td>
                </tr>
                <tr>
                  <td align="left" valign="top"><span class="style1">What kind of TV set do you own</span></td>
                  <td align="left" valign="top"><span class="style1">
                    <select name="tv-type" >
                      <option value="">- - - - - Select - - - - - </option>
                      <option value="Color TV">Color TV</option>
                      <option value="Flat Screen">Flat Screen</option>
                      <option value="LCD">LCD</option>
                      <option value="LED">LED </option>
                      <option value="Plasma">Plasma </option>
                      <option value="Home Theatre System">Home Theatre System </option>
                      <option value="Projection TV">Projection TV </option>
                      <option value="LED">LED </option>Plasma
                    </select>
                  </span></td>
                </tr>
                <tr>
                  <td width="223" align="left" valign="top"><span class="style1">Do you intend to upgrade your TV in the next one year? </span></td>
                  <td width="183" align="left" valign="top"><span class="style1">
                    <input type="radio" name="tv-upgrade" value="yes"/> Yes
                  </span>&nbsp;<span class="style1">
                    <input type="radio" name="tv-upgrade" value="no"/> No
                  </span></td>
                  </tr>
                <tr>
                  <td align="left" valign="top">&nbsp;</td>
                  <td align="left" valign="top"><span class="style6"><input type="submit" name="submit-part5" value="Submit"/></span></td>
                </tr>
            </table></form></td>
          </tr>
          <tr style="display:none;" class="part5">
            <td align="center" valign="top"><img src="images/smallbox_bottom3.gif" width="451" height="16" /></td>
          </tr>
          
          <tr style="display:none;" class="part6">
            <td align="center" valign="top"><img src="images/smallbox_top1.gif" width="451" height="16" /></td>
          </tr>
          <tr style="display:none;" class="part6">
            <td align="center" valign="top" background="images/smallbox_mid2.gif"><form name="form-part6" id="form-part6" onsubmit="return false"><table width="420" border="0" align="center" cellpadding="2" cellspacing="2">
                <tr>
                  <td align="left" valign="top"><span class="style4">Product you own </span></td>
                  <td align="right" valign="top" class="style2">&nbsp;</td>
                </tr>
                <tr>
                  <td align="left" valign="top" class="style2">Cable </td>
                  <td align="right" valign="top" class="style2">&nbsp;</td>
                </tr>
                <tr>
                  <td align="left" valign="top">&nbsp;</td>
                  <td align="left" valign="top">&nbsp;</td>
                </tr>
                <tr>
                  <td align="left" valign="top"><span class="style1">What type of Cable transmission do you have at home?</span></td>
                  <td align="left" valign="top"><span class="style1">
                    <select name="Cable-type" >
                      <option value="">- - - - - Select - - - - - </option>
                      <option value="Cable">Cable</option>
                      <option value="Set Top Box">Set Top Box</option>
                      <option value="DTH transmission">DTH transmission</option>
                    </select>
                  </span></td>
                </tr>
                <tr>
                  <td width="223" align="left" valign="top"><span class="style1">Do you intend to upgrade the same in the next one year? </span></td>
                  <td width="183" align="left" valign="top"><span class="style1">
                    <input type="radio" name="Cable-upgrade" value="yes"/> Yes
                  </span>&nbsp;<span class="style1">
                    <input type="radio" name="Cable-upgrade" value="no"/> No
                  </span></td>
                  </tr>
                <tr>
                  <td align="left" valign="top">&nbsp;</td>
                  <td align="left" valign="top"><span class="style6"><input type="submit" name="submit-part6" value="Submit"/></span></td>
                </tr>
            </table></form></td>
          </tr>
          <tr style="display:none;" class="part6">
            <td align="center" valign="top"><img src="images/smallbox_bottom3.gif" width="451" height="16" /></td>
          </tr>
          
          <tr style="display:none;" class="part7">
            <td align="center" valign="top"><img src="images/smallbox_top1.gif" width="451" height="16" /></td>
          </tr>
          <tr style="display:none;" class="part7">
            <td align="center" valign="top" background="images/smallbox_mid2.gif"><form name="form-part7" id="form-part7" onsubmit="return false"><table width="420" border="0" align="center" cellpadding="2" cellspacing="2">
                <tr>
                  <td align="left" valign="top"><span class="style4">Product you own </span></td>
                  <td align="right" valign="top" class="style2">&nbsp;</td>
                </tr>
                <tr>
                  <td align="left" valign="top" class="style2">Refrigerator</td>
                  <td align="right" valign="top" class="style2">&nbsp;</td>
                </tr>
                <tr>
                  <td align="left" valign="top">&nbsp;</td>
                  <td align="left" valign="top">&nbsp;</td>
                </tr>
                <tr>
                  <td width="223" align="left" valign="top"><span class="style1">What kind of Refrigerator do you own?</span></td>
                  <td width="183" align="left" valign="top"><span class="style1">
                    <select name="Refrigerator-type" >
                      <option value="">- - - - - Select - - - - - </option>
                      <option value="Single door">Single door</option>
                      <option value="Double door">Double door</option>
                      <option value="Frost Free">Frost Free</option>
                      <option value="Side by side">Side by side </option>
                      <option value="Bottom Freezer">Bottom Freezer </option>
                    </select>
                  </span></td>
                </tr>
                <tr>
                  <td align="left" valign="top"><span class="style1">Others (Specify)</span></td>
                  <td align="left" valign="top"><span class="style1">
                    <input type="text" name="Refrigerator-Others" />
                  </span></td>
                </tr>
                <tr>
                  <td width="223" align="left" valign="top"><span class="style1">Do you intend to upgrade the same in the next one year? </span></td>
                  <td width="183" align="left" valign="top"><span class="style1">
                    <input type="radio" name="Refrigerator-upgrade" value="yes"/> Yes
                  </span>&nbsp;<span class="style1">
                    <input type="radio" name="Refrigerator-upgrade" value="no"/> No
                  </span></td>
                  </tr>
                <tr>
                  <td align="left" valign="top">&nbsp;</td>
                  <td align="left" valign="top"><span class="style6"><input type="submit" name="submit-part7" value="Submit"/></span></td>
                </tr>
            </table></form></td>
          </tr>
          <tr style="display:none;" class="part7">
            <td align="center" valign="top"><img src="images/smallbox_bottom3.gif" width="451" height="16" /></td>
          </tr>
          
          <tr style="display:none;" class="part8">
            <td align="center" valign="top"><img src="images/smallbox_top1.gif" width="451" height="16" /></td>
          </tr>
          <tr style="display:none;" class="part8">
            <td align="center" valign="top" background="images/smallbox_mid2.gif"><form name="form-part8" id="form-part8" onsubmit="return false"><table width="420" border="0" align="center" cellpadding="2" cellspacing="2">
                <tr>
                  <td align="left" valign="top"><span class="style4">Product you own </span></td>
                  <td align="right" valign="top" class="style2">&nbsp;</td>
                </tr>
                <tr>
                  <td align="left" valign="top" class="style2">Air Conditioner</td>
                  <td align="right" valign="top" class="style2">&nbsp;</td>
                </tr>
                <tr>
                  <td align="left" valign="top">&nbsp;</td>
                  <td align="left" valign="top">&nbsp;</td>
                </tr>
                <tr>
                  <td width="223" align="left" valign="top"><span class="style1">what kind of AC do you own? </span></td>
                  <td width="183" align="left" valign="top"><span class="style1">
                    <select name="ac-type" >
                      <option value="">- - - - - Select - - - - - </option>
                      <option value="Window AC">Window AC</option>
                      <option value="Split AC">Split AC</option>
                      <option value="Central AC">Central AC</option>
                    </select>
                  </span></td>
                </tr>
                <tr>
                  <td align="left" valign="top"><span class="style1">Others (Specify)</span></td>
                  <td align="left" valign="top"><span class="style1">
                    <input type="text" name="ac-Others" />
                  </span></td>
                </tr>
                <tr>
                  <td width="223" align="left" valign="top"><span class="style1">Do you intend to upgrade the same in the next one year? </span></td>
                  <td width="183" align="left" valign="top"><span class="style1">
                    <input type="radio" name="ac-upgrade" value="yes"/> Yes
                  </span>&nbsp;<span class="style1">
                    <input type="radio" name="ac-upgrade" value="no"/> No
                  </span></td>
                  </tr>
                <tr>
                  <td align="left" valign="top">&nbsp;</td>
                  <td align="left" valign="top"><span class="style6"><input type="submit" name="submit-part8" value="Submit"/></span></td>
                </tr>
            </table></form></td>
          </tr>
          <tr style="display:none;" class="part8">
            <td align="center" valign="top"><img src="images/smallbox_bottom3.gif" width="451" height="16" /></td>
          </tr>
          
          <tr style="display:none;" class="part9">
            <td align="center" valign="top"><img src="images/smallbox_top1.gif" width="451" height="16" /></td>
          </tr>
          <tr style="display:none;" class="part9">
            <td align="center" valign="top" background="images/smallbox_mid2.gif"><form name="form-part9" id="form-part9" onsubmit="return false"><table width="420" border="0" align="center" cellpadding="2" cellspacing="2">
                <tr>
                  <td align="left" valign="top"><span class="style4">Product you own </span></td>
                  <td align="right" valign="top" class="style2">&nbsp;</td>
                </tr>
                <tr>
                  <td align="left" valign="top" class="style2">Camera</td>
                  <td align="right" valign="top" class="style2">&nbsp;</td>
                </tr>
                <tr>
                  <td align="left" valign="top">&nbsp;</td>
                  <td align="left" valign="top">&nbsp;</td>
                </tr>
                <tr>
                  <td width="223" align="left" valign="top"><span class="style1">what kind of Camera do you own?</span></td>
                  <td width="183" align="left" valign="top"><span class="style1">
                    <select name="Camera-type" >
                      <option value="">- - - - - Select - - - - - </option>
                      <option value="Digital Camera">Digital Camera </option>
                      <option value="Digital SLR">Digital SLR</option>
                      <option value="HandyCam">HandyCam</option>
                    </select>
                  </span></td>
                </tr>
                <tr>
                  <td align="left" valign="top"><span class="style1">Others (Specify)</span></td>
                  <td align="left" valign="top"><span class="style1">
                    <input type="text" name="Camera-Others" />
                  </span></td>
                </tr>
                 <tr>
                  <td width="223" align="left" valign="top"><span class="style1">Do you intend to upgrade the same in the next one year? </span></td>
                  <td width="183" align="left" valign="top"><span class="style1">
                    <input type="radio" name="Camera-upgrade" value="yes"/> Yes
                  </span>&nbsp;<span class="style1">
                    <input type="radio" name="Camera-upgrade" value="no"/> No
                  </span></td>
                  </tr>
                <tr>
                  <td align="left" valign="top">&nbsp;</td>
                  <td align="left" valign="top"><span class="style6"><input type="submit" name="submit-part9" value="Submit"/></span></td>
                </tr>
            </table></form></td>
          </tr>
          <tr style="display:none;" class="part9">
            <td align="center" valign="top"><img src="images/smallbox_bottom3.gif" width="451" height="16" /></td>
          </tr>
          
          <tr style="display:none;" class="part10">
            <td align="center" valign="top"><img src="images/smallbox_top1.gif" width="451" height="16" /></td>
          </tr>
          <tr style="display:none;" class="part10">
            <td align="center" valign="top" background="images/smallbox_mid2.gif"><form name="form-part10" id="form-part10" onsubmit="return false"><table width="420" border="0" align="center" cellpadding="2" cellspacing="2">
                <tr>
                  <td align="left" valign="top"><span class="style4">Product you own </span></td>
                  <td align="right" valign="top" class="style2">&nbsp;</td>
                </tr>
                <tr>
                  <td align="left" valign="top" class="style2">Portable Music System</td>
                  <td align="right" valign="top" class="style2">&nbsp;</td>
                </tr>
                <tr>
                  <td align="left" valign="top">&nbsp;</td>
                  <td align="left" valign="top">&nbsp;</td>
                </tr>
                <tr>
                  <td width="223" align="left" valign="top"><span class="style1">what kind of Portable Music System  do you own? </span></td>
                  <td width="183" align="left" valign="top"><span class="style1">
                    <select name="pms-type" >
                      <option value="">- - - - - Select - - - - - </option>
                      <option value="MP3 player">MP3 player </option>
                      <option value="iPod">iPod</option>
                    </select>
                  </span></td>
                </tr>
                <tr>
                  <td align="left" valign="top"><span class="style1">Others (Specify)</span></td>
                  <td align="left" valign="top"><span class="style1">
                    <input type="text" name="pms-Others" />
                  </span></td>
                </tr>
                <tr>
                  <td width="223" align="left" valign="top"><span class="style1">Do you intend to upgrade the same in the next one year? </span></td>
                  <td width="183" align="left" valign="top"><span class="style1">
                    <input type="radio" name="pms-upgrade" value="yes"/> Yes
                  </span>&nbsp;<span class="style1">
                    <input type="radio" name="pms-upgrade" value="no"/> No
                  </span></td>
                  </tr>
                <tr>
                  <td align="left" valign="top">&nbsp;</td>
                  <td align="left" valign="top"><span class="style6"><input type="submit" name="submit-part10" value="Submit"/></span></td>
                </tr>
            </table></td>
          </tr>
          <tr style="display:none;" class="part10">
            <td align="center" valign="top"><img src="images/smallbox_bottom3.gif" width="451" height="16" /></td>
          </tr>
          
          <tr style="display:none;" class="part11">
            <td align="center" valign="top"><img src="images/smallbox_top1.gif" width="451" height="16" /></td>
          </tr>
          <tr style="display:none;" class="part11">
            <td align="center" valign="top" background="images/smallbox_mid2.gif"><form name="form-part11" id="form-part11"><table width="420" border="0" align="center" cellpadding="2" cellspacing="2">
                <tr>
                  <td align="left" valign="top"><span class="style4">Product you own </span></td>
                  <td align="right" valign="top" class="style2">&nbsp;</td>
                </tr>
                <tr>
                  <td align="left" valign="top" class="style2">Mobile</td>
                  <td align="right" valign="top" class="style2">&nbsp;</td>
                </tr>
                <tr>
                  <td align="left" valign="top">&nbsp;</td>
                  <td align="left" valign="top">&nbsp;</td>
                </tr>
                <tr>
                  <td width="223" align="left" valign="top"><span class="style1">what kind of Mobile phone  do you own? </span></td>
                  <td width="183" align="left" valign="top"><span class="style1">
                    <select name="Mobile-type" >
                      <option value="">- - - - - Select - - - - - </option>
                      <option value="Color Mobile">Color Mobile</option>
                      <option value="Mobile with camera">Mobile with camera</option>
                      <option value="Touch Screen phone">Touch Screen phone</option>
                      <option value="Mobile with GRPs">Mobile with GRPs </option>
                      <option value="Smart Phone / PDA">Smart Phone / PDA </option>
                      <option value="Mobile with GRPs">Mobile with GRPs </option>
                    </select>
                  </span></td>
                </tr>
                <tr>
                  <td align="left" valign="top"><span class="style1">Others (Specify)</span></td>
                  <td align="left" valign="top"><span class="style1">
                    <input type="text" name="Mobile-Others" />
                  </span></td>
                </tr>
                <tr>
                  <td width="223" align="left" valign="top"><span class="style1">Do you intend to upgrade the same in the next one year? </span></td>
                  <td width="183" align="left" valign="top"><span class="style1">
                    <input type="radio" name="Mobile-upgrade" value="yes"/> Yes
                  </span>&nbsp;<span class="style1">
                    <input type="radio" name="Mobile-upgrade" value="no"/> No
                  </span></td>
                  </tr>
                <tr>
                  <td align="left" valign="top">&nbsp;</td>
                  <td align="left" valign="top"><span class="style6"><input type="submit" name="submit-part11" value="Submit"/></span></td>
                </tr>
            </table></td>
          </tr>
          <tr style="display:none;" class="part11">
            <td align="center" valign="top"><img src="images/smallbox_bottom3.gif" width="451" height="16" /></td>
          </tr>
          
          <tr style="display:none;" class="part12">
            <td align="center" valign="top"><img src="images/smallbox_top1.gif" width="451" height="16" /></td>
          </tr>
          <tr style="display:none;" class="part12">
            <td align="center" valign="top" background="images/smallbox_mid2.gif">
            <form name="form-part12" id="form-part12"><table width="420" border="0" align="center" cellpadding="2" cellspacing="2">
                <tr>
                  <td align="left" valign="top"><span class="style4">Product you own </span></td>
                  <td align="right" valign="top" class="style2">&nbsp;</td>
                </tr>
                <tr>
                  <td align="left" valign="top" class="style2">Automobile</td>
                  <td align="right" valign="top" class="style2">&nbsp;</td>
                </tr>
                <tr>
                  <td align="left" valign="top">&nbsp;</td>
                  <td align="left" valign="top">&nbsp;</td>
                </tr>
                <tr>
                  <td width="223" align="left" valign="top"><span class="style1">What kind of automobile do you own? </span></td>
                  <td width="183" align="left" valign="top"><span class="style1">
                    <select name="select10" >
                      <option value="automobile-type">- - - - - Select - - - - - </option>
                      <option value="Hatchback">Hatchback</option>
                      <option value="Sedan">Sedan</option>
                      <option value="Luxury Sedan">Luxury Sedan</option>
                      <option value="SUV">SUV </option>
                    </select>
                  </span></td>
                </tr>
                <tr>
                  <td align="left" valign="top"><span class="style1">Others (Specify)</span></td>
                  <td align="left" valign="top"><span class="style1">
                    <input type="text" name="automobile-Others" />
                  </span></td>
                </tr>
                <tr>
                  <td width="223" align="left" valign="top"><span class="style1">Do you intend to upgrade the same in the next one year? </span></td>
                  <td width="183" align="left" valign="top"><span class="style1">
                    <input type="radio" name="automobile-upgrade" value="yes"/> Yes
                  </span>&nbsp;<span class="style1">
                    <input type="radio" name="automobile-upgrade" value="no"/> No
                  </span></td>
                  </tr>
                <tr>
                  <td align="left" valign="top">&nbsp;</td>
                  <td align="left" valign="top"><span class="style6"><input type="submit" name="submit-part12" value="Submit"/></span></td>
                </tr>
            </table></form>
            </td>
          </tr>
          <tr style="display:none;" class="part12">
            <td align="center" valign="top"><img src="images/smallbox_bottom3.gif" width="451" height="16" /></td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td align="center" valign="top" bgcolor="#FFFFFF">&nbsp;</td>
  </tr>
  <tr>
    <td align="center" valign="top" bgcolor="#FFFFFF"><img src="images/divider_img.gif" width="970" height="14" /></td>
  </tr>
  <tr>
    <td align="center" valign="top" bgcolor="#FFFFFF">&nbsp;</td>
  </tr>
</table>
<?=$FOOTER?>
</body>
</html>
