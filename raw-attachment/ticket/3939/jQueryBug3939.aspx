<%@ Page Language="C#" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<script runat="server">
	protected override void OnLoad(EventArgs e) {
		base.OnLoad(e);
		System.Threading.Thread.Sleep(int.Parse(string.IsNullOrEmpty(Request["sleep"]) ? "0" : Request["sleep"]));//wait to trigger timeout in AJAX request, must be server side
	}
</script>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>jQuery bug 3939 test case</title>
	<script type="text/javascript" src="jQuery.aspx"></script>
	<script type="text/javascript">var console2 = {};console2.log = function() { $('#Log').append($.map(Array.prototype.slice.call(arguments), function(a) { return a+""; }).join(" ") + "<" + "br/>"); };</script>
	<script type="text/javascript">
	$(function() {
		$.ajax({
			url: 'jQueryBug3939.aspx?sleep=2000',
			type: 'GET',
			cache: false,
			data: "",
			dataType: 'text',
			timeout: 1000,
			success: function(data, textStatus) { console2.log('success', textStatus); },
			error: function (xhr, textStatus, errorThrown) { console2.log('error', textStatus); },
			beforeSend: function(xhr) { console2.log('beforeSend'); },
			complete: function(xhr, textStatus) { console2.log('complete', textStatus); }
		});
	});
	</script>
</head>
<body>
<div id='Log'></div>
</body>
</html>
