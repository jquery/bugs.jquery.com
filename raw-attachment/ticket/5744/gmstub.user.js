// ==UserScript==
// @name           GM Test Stub
// @namespace      MrPete Test
// @description    Test a GM function
// @include        http://*
// @include        https://*
// @require		   	http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


function foo(elm) {
console.log('First:'+$('.commentmetadata:first',elm).text());
console.log('All:'+$('.commentmetadata',elm).text());
$('body').append('<div><b>Result:'+getStr+'</b></div>');
}
function bar(i) {
	foo(this);
}

$('ol.commentlist li').each(bar);
$('body').append('<div><b>FINISHED</b></div>');
