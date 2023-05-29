// this works in 1.2.6, but in 1.3.1, the mouseover event only gets applied to the first div created

$("<div class=\"overlay\"></div>").mouseover(function() {
	$("#primary-nav div.overlay:hidden").show();
	$(this).hide();
}).appendTo($("#primary-nav > ul > li"));

// I had to convert the code to:

$("#primary-nav > ul > li").each(function() {
	$("<div class=\"overlay\"></div>").mouseover(function() {
		$("#primary-nav div.overlay:hidden").show();
		$(this).hide();
	}).appendTo(this);
});