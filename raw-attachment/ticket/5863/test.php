<html>
<head>
<script type="text/javascript" src="../../js/jquery/jquery.js"></script>
</head>
<body>
<?php echo strlen(file_get_contents("TEST.TXT"));?>
<p />
<span onclick=
"jQuery(document).ready(function() { jQuery('#imyourdesire').load('TEST.TXT');});"
> click me</span>

<span onclick="alert(document.getElementById('imyourdesire').innerHTML.length);">
then click me</span>
<div id="imyourdesire">
</div>
</body>
</html>





