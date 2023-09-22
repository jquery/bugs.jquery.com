<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>Test</title>
		<script language="javascript" type="text/javascript" src="/CoreScripts/jquery-1.3.2.js?asm=0.8.3631.29977"></script>
<script language="javascript" type="text/javascript">
$.fn.not_working = $.fn.html;

$.fn.html = function(value) {
	if (value === undefined)
		return (this[0] ? this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g, "") : null);
	else {
		this.empty().append( value );
		if ($.browser.msie && parseFloat($.browser.version) < 7) {
			this.each(function() {
				if (this.tagName == 'SELECT') {
					var $this = $(this);
					if ($this.css('width') == 'auto') {
						$this.css('width', 0);
						$this.css('width', 'auto');
					}
				}
			});
		}
		return this;
	}
}
$(function() {
	$('#sel1').not_working('<option value="1">Option 1</option><option value="2">Option 2</option><option value="3">Option 3</option><option value="4">Option 4</option>');
	$('#sel2').html('<option value="1">Option 1</option><option value="2">Option 2</option><option value="3">Option 3</option><option value="4">Option 4</option>');
});
</script>
	</head>
	<body>
		Not working: <select id="sel1"></select>
		<br />
		Working: <select id="sel2"></select>
	</body>
</html>