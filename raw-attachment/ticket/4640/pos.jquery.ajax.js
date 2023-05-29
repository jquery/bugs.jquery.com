 $(document).ready(function(){
 	
	var bindForms = function(){
		$("form").submit(function(){
			$(this).ajaxSubmit({
				success: function(html){
					$("#right").html(html);
				}
			});
			return false;
		});
	}
	var bindLinks = function(){
		//$("a:not([href^='http'])").click(function () { //does not work after rebind in ie8.
		$("a").click(function () {
	    	var url = $(this).attr('href');
		   		$.ajax({
		        	type: "GET",
		        	url: url,
		        	cache:false,
		        	success: function(html){
		        		$("#right").html(html);
		        	}
		   		});
    			return false;
		});
	}
	
	bindForms();
	bindLinks();
	
	$("#btn_home").click(function(){
		$("#right").load("index.php?action=home");		
	});
	$("#btn_order").click(function(){
		$("#right").load("index.php?action=calendar");
	});
	
	$().ajaxSend(function(evt, request, settings){
		$(".loading").show();	
	});
	
	$().ajaxStop(function(evt, request, settings){  
		$(".loading").fadeOut("fast");  
		bindForms();
		bindLinks();
	});
 });