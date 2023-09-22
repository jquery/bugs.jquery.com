$.post( "/admin/lib/write/write_image_to_media.php", { filename: $._filename, fileid: $._fileid }, function( data, msg ) {
	$.post( '/admin/lib/upload/thumb.php', { src: $._filename, dest: $._filename, x: 140, y: 140 }, function( data, msg ) {
		$.post( '/admin/lib/read/read_image_exists.php', { filename: $._filename }, function( data, msg ) {
			$("#thumbs-list").append( data );
			$(".thumb").each( function() {
				if ( $(this).attr('title') == $._filename ) {
					var top 	= Math.abs(75 - ( $(this).find('img').attr('height') / 2 ));
					$(this).find("p").css({ 'top' : top + 'px', 'text-align': 'center', '-moz-box-shadow': '0px 0px 3px #000', '-webkit-box-shadow': '0px 0px 2px #000', 'box-shadow': '0px 0px 2px #000', 'border' : '2px solid #ccc', 'width' : $(this).find('img').attr('width') + 'px', 'height' : $(this).find('img').attr('height') + 'px', 'margin' : '0 auto' })
					$(this).animate({ opacity: '1' }, 600);
				}
			})
		});
	})
});