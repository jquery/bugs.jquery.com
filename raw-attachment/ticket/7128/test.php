<script language='javascript' type='text/javascript' src='/scripts/jquery-1.4.2.min.js'></script>


<body>
<input type='text' value='a' id='c'>
<br><br>
<textarea id='debug' rows="15" cols="100"/></textarea>
</body>
<script type='text/javascript'>
			d=document.getElementById("debug");
			d.value="\nValue is: "+			$('#c').attr('value');
			d.value+="\nTesting for 'a'";
			d.value+="\n[value=a]: found "+$("[value=a]").length+" values, &[value=a]: found "+$("&[value=a]").length+" values\n";
			d.value+="\nSetting to 'b'\n";
			$('#c').attr('value','b');
			d.value+="\nValue is: "+			$('#c').attr('value');
			d.value+="\n[value=a]: found "+$("[value=a]").length+" values, &[value=a]: found "+$("&[value=a]").length+" values\n";
			d.value+="\n[value=b]: found "+$("[value=b]").length+" values, &[value=b]: found "+$("&[value=b]").length+" values\n";
</script>