/*  Onload Functions  */
$(document).ready(function(){
$.extend($.blockUI.defaults.overlayCSS, { cursor:'default' });	
//$('writereview').block();
$('div.write').block('<h1>Please complete Step 1 to continue</h1>', { border: '1px solid #c10435' }); 
});

function ratingComplete() { 
$('div.rating').block(); $('div.rating').block();
//$('#step1').addClass('stepinactive');
$('#rating-guidelines').SlideOutUp(1200, function(){$('#rating-guidelines').hide();$('#review-guidelines').SlideInUp(1200);});
$('#step2').removeClass('stepinactive');
$('#step2').addClass('stepactive');
$('div.write').unblock();
$('#step1').SlideOutLeft(500, function(){$('#overall').SlideInLeft(1500);});
}