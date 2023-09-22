"use strict";
$('document').ready(function() {

	var clone;

	$('#clickme').live('click', function()  {
		clone = $('#tablerow').clone();
		clone.find('#someInput').val('something different');
		alert('cloned input value: '+clone.find('#someInput').val());

		alert('cloned inner html: '+clone.html());
	});

});