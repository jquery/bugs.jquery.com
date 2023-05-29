$(function(){

	//Open all links with rel="external" in new window
	$('a[rel="external"]').click( function() {
			window.open( $(this).attr('href') );
			return false;
    });
});

//functions to be executed inline
var mylib =
{

	image_hover :
	{
		init : function()
		{
			$('.img-hold').hover(function() {
				$(this).children().css('border-color','#c3c3bf');
			},
			function() {
				$(this).children().css('border-color','#fff');	
			});
		}
	},
	showreel :
	{
		init : function() {
			$('#showreel-content').hide();
			$('#showreel').addClass('loading');
			
			$.ajax({
				type: "GET",
				url: "xml/showreel.xml",
				dataType: "xml",
				success: function(xml) {
					
					var total = $(xml).find('site').length;
					var randnum = Math.floor(Math.random()*total);
	
					$(xml).find('site').each(function(entryIndex, entry) {
						if(entryIndex === randnum){
							var title = $(this).find('title').text();
							var color = $(this).find('color').text();
							var url = $(this).find('url').text();
							var website = $(this).find('website').text();
							var align = $(this).find('align').text();
							var image = $(this).find('image_src').text();
							
							$('#head-contact,#head-contact a').css('color',color);
							$('body.home #nav li#home').css('border-bottom','1px solid' + color);

							$('<div id="info" class="' + align + '"></div>')
							.html('<div class="entry" style="color:' + color + '">' + title + '<a href="'+url+'"><br />'+website+'</a></div>')
							.appendTo('#header-content');
							
							
							//create new image object to preload image
							var img = new Image();
							//once image has loaded execute this code
							$(img).load(function () {
								//$(this).css('display', 'none'); // .hide() doesn't work in Safari when the element isn't on the DOM already
								$(this).hide();
								$('#showreel').removeClass('loading').append(this);
								$(this).fadeIn(3000);
								}).error(function () {
								// notify the user that the image could not be loaded
							}).attr('src', image);
						}
					});
					
				}//end success function
			});//end ajax function
		}
	}
	
	
}