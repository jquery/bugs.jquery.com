// JavaScript Document

$(function () {

			//Connect to the Ajax File to retrieve thumbnails
			$.ajax({
				   type: "get",
				   url: "image_info.xml",
				   dataType: "xml",
				   success: function(xml) {
					  

					   //Locate every image reference in the XML
					   
					   $(xml).find('image').each(function () {
														   
														  var image_id = $(this).attr('id')
														  var fileName = $(this).find('file').text()
														  var title = $(this).find('title').text()
														  var caption = $(this).find('caption').text()
														  //Use append to put thumbnails in html.
														  
														if (image_id==1) {
															$('<img />').attr('src', 'images/lg/' + fileName).attr('name', image_id).appendTo('#photo-display');
															$('<h2></h2>').html(title).appendTo('#photo-info');
															$('<p></p>').html(caption).appendTo('#photo-info');
															
														 }
														 
														  
														  $('<img />')
														  .attr('src', 'images/sm/' + fileName)
														  .attr('name', image_id)
														  .appendTo('#thumbnails')
														  .click(function () {
																		var thumb_clicked = $(this).attr('name')
																		var displayed_image = $('#photo-display img').attr('name')
																		
																		if (thumb_clicked==displayed_image) {
																				return false;	
																		}
																		
																		$('#photo-display img').attr('src', 'images/lg/' + fileName).attr('name', image_id);
																		$('#photo-info h2').text(title);
																		$('#photo-info p').text(caption);
																		
																		   });//close click
														  
														   
														  
														  }); //close each
					   
					   									$("<div class='clear'><!-- --></div").appendTo('#thumbnails');
																								  
														
				   }//close function(xml)
				   });//close $.ajax
			
			
			
			});//close $

