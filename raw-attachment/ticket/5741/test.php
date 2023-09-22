<?php
if($_GET['bug'] == 1)
{
	?>
	<script type="text/javascript">alert('bug');</script>
	<?php
	exit;
}
?>

<html>
<head>
<script type="text/javascript" src="/Workana/public/scripts/jQuery/jquery-1.4a2.min.js"></script> 
<script type="text/javascript">
function bclick()
{
	$('#response').load('test.php?bug=1');
}
</script>
</head>
<body>
<input type="button" onclick="bclick();" value="test"/>
<div id="response"></div>
</body>
</html>