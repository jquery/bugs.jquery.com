// jQuery Animations for Cynthesis
// Revolution9design

jQuery(document).ready(function() {
	var height = jQuery("#border").height();
	var newheight = height - 42;
	jQuery("#glow-right").height(newheight);
	jQuery("#glow-left").height(newheight);
	$(window).load(
    	jQuery("#experience").fadeIn(1000, function() {
			jQuery("#expertise").fadeIn(1000, function() {
				jQuery("#expediency").fadeIn(1000, function() {
					jQuery("#excellence").fadeIn(1000)
				})
			})
		})				
	);			
})