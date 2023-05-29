<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Jquery Toggle Class Bug</title>

<script type="text/javascript" src="jquery-1.3.1.js"></script>

<script type="text/javascript">
<!--


$(document).ready(function(){


	$("div#oy div").hover(function () {

var ad= $(this).attr("id").replace("sa","");

$(this).toggleClass('s2');
$(this).animate({opacity: "0.5"});
		
		
    },function(){
	  
var ad= $(this).attr("id").replace("sa","");
$(this).toggleClass('s2');
$(this).animate({opacity: "1"});

	
    }).click(function(){
       
 
 var ad= $(this).attr("id").replace("sa","");
 
$(this).attr("class", "s1");
$(this).toggleClass('s3');

    }); 

	
	
	

  
});






//-->
</script>

<style type="text/css">
<!--
body,td,th {
	font-family: Arial, Helvetica, sans-serif;
	font-size: 9px;
	color: #333333;
}

.s1
{
width:50px;
margin:2px;
height:50px;
float:left;
cursor:pointer;
background-repeat:no-repeat;
background-color:#999999;
}

.s2
{
width:50px;
margin:2px;
height:50px;
float:left;
cursor:pointer;
background-repeat:no-repeat;
background-color:#3399CC;
}


.s3
{
width:50px;
margin:2px;
height:50px;
float:left;
cursor:pointer;
background-repeat:no-repeat;
background-color:#FFCC00;
}



#oy
{
width:155px;
margin:2px;
height:55px;
float:left;
}

#sonuc
{
width:155px;
margin:2px;
height:55px;
float:left;
}
.style2 {font-size: 24px}


-->
</style>


</head>

<body>


<div id="oy">
<div class="s1" id="sa1"></div>
<div class="s3" id="sa2"></div>
<div class="s1" id="sa3"></div>
    
</div>
</body>
</html>
