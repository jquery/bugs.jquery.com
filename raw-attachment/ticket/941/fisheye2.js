/**
 * Interface Elements for jQuery
 * Fisheye2 menu
 * 
 * http://interface.eyecon.ro
 * 
 * Copyright (c) 2006 Stefan Petre
 * Dual licensed under the MIT (MIT-LICENSE.txt) 
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 */

/**
 * Build a Fisheye2 menu from a list of links
 *
 * @name Fisheye2
 * @description Build a Fisheye2 menu from a list of links
 * @param Hash hash A hash of parameters
 * @option String items items selection
 * @option String container container element
 * @option Integer itemWidth the minimum width for each item
 * @option Integer maxWidth the maximum width for each item
 * @option String itemsText selection of element that contains the text for each item
 * @option Integer proximity the distance from element that make item to interact
 * @option String valign vertical alignment
 * @option String halign horizontal alignment
 *
 * @type jQuery
 * @cat Plugins/Interface
 * @author Stefan Petre
 */
jQuery.iFisheye2 = {
	
	build : function(options)
	{
	
		return this.each(
			function()
			{
				var el = this;
				el.fisheyeCfg = {
					container: jQuery(this),
					itemWidth: options.itemWidth,
					itemsText: options.itemsText,
					proximity: options.proximity,
					valign: options.valign,
					halign: options.halign,
					maxWidth : options.maxWidth
				};
				el.fisheyeCfg.items = jQuery(options.items, el.fisheyeCfg.container);

				el.fisheyeCfg.items.css('width', el.fisheyeCfg.itemWidth);
				//el.fisheyeCfg.items.children().css('width', '100%');

				/* Get container position */
				var pos = jQuery.iUtil.getPosition(el.fisheyeCfg.items.get(0));
				var pos1 = jQuery.iUtil.getPosition(
						el.fisheyeCfg.items.get(el.fisheyeCfg.items.size()-1));
				var size = jQuery.iUtil.getSize(
						el.fisheyeCfg.items.get(el.fisheyeCfg.items.size()-1));
				pos.w = pos1.x+size.w - pos.x;
				pos.h = pos1.y+size.h - pos.y;

				el.fisheyeCfg.pos = pos;


				el.fisheyeCfg.items
					.bind(
						'mouseover',
						function()
						{
							jQuery(el.fisheyeCfg.itemsText, this).get(0).style.display = 'block';
						}
					)
					.bind(
						'mouseout',
						function()
						{
							jQuery(el.fisheyeCfg.itemsText, this).get(0).style.display = 'none';
						}
					);
				jQuery(document).bind(
					'mousemove',
					function(e)
					{
						var pointer = jQuery.iUtil.getPointer(e);
						var posy = pointer.y - el.fisheyeCfg.pos.y - pos.h/2;
						posy *= posy;
						var posx = pointer.x - el.fisheyeCfg.pos.x - el.fisheyeCfg.itemWidth/2;

						el.fisheyeCfg.items.each(
								function(nr)
								{
									distance = Math.sqrt(
										Math.pow(posx - nr*el.fisheyeCfg.itemWidth, 2)
										+ posy
									);
									distance -= el.fisheyeCfg.itemWidth/2;
									
									distance = distance < 0 ? 0 : distance;
									distance = distance > el.fisheyeCfg.proximity ? el.fisheyeCfg.proximity : distance;
									distance = el.fisheyeCfg.proximity - distance;
									
									extraWidth = el.fisheyeCfg.maxWidth * distance/el.fisheyeCfg.proximity;
									
									//$(this).children().not('br').css('width', el.fisheyeCfg.itemWidth + extraWidth + 'px');

									this.style.width = el.fisheyeCfg.itemWidth + extraWidth + 'px';
						});
					}
				);
			}
		)
	}
	
};

jQuery.fn.Fisheye2 = jQuery.iFisheye2.build;
