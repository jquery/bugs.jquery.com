/**
* Interface Elements for jQuery
* Selectables
*
* http://interface.eyecon.ro
*
* Copyright (c) 2006 Stefan Petre
* Dual licensed under the MIT (MIT-LICENSE.txt)
* and GPL (GPL-LICENSE.txt) licenses.
*
*
*/

jQuery.selectHelper = null;
jQuery.selectKeyHelper = false;
jQuery.selectdrug = null;
jQuery.selectCurrent = [];	// For current selection
jQuery.selectKeyDown = function(e) {
	var pressedKey = e.charCode || e.keyCode || -1;
	if (jQuery.keycontrolSelect && (pressedKey == 17 || pressedKey == 16)) {
		jQuery.selectKeyHelper = true;
	}
};
jQuery.selectKeyUp = function(e) {
	jQuery.selectKeyHelper = false;
};
jQuery.selectstart = function(e) {
  jQuery.firstselected = false;
  jQuery.lastselected = false;
  
	this.f.pointer = jQuery.iUtil.getPointer(e);
	this.f.pos = jQuery.extend(
		jQuery.iUtil.getPosition(this), 
		jQuery.iUtil.getSize(this)
    );
	
	this.f.scr = jQuery.iUtil.getScroll(this);
	this.f.pointer.x -= this.f.pos.x;
	this.f.pointer.y -= this.f.pos.y;
	jQuery(this).append(jQuery.selectHelper.get(0));
	if (this.f.hc)
		jQuery.selectHelper.addClass(this.f.hc).css('display','block');
    jQuery.selectHelper.css(
      {
        display: 'block',
        width: '0px',
        height: '0px'
      }
      );
    if (this.f.o) {
      jQuery.selectHelper.css('opacity', this.f.o);
    }
    
    jQuery.selectdrug = this;
    jQuery.selectedone = false;
    jQuery.selectCurrent = [];	// For current selection state
    this.f.el.each(
      function ()
      {
        this.pos = {
          x: this.offsetLeft + (this.currentStyle && !jQuery.browser.opera ?parseInt(this.currentStyle.borderLeftWidth)||0:0) + (jQuery.selectdrug.scrollLeft||0), 
          y: this.offsetTop + (this.currentStyle && !jQuery.browser.opera ?parseInt(this.currentStyle.borderTopWidth)||0:0) + (jQuery.selectdrug.scrollTop||0),
          wb: this.offsetWidth,
          hb: this.offsetHeight
        };
        if (this.s == true) {
          if (jQuery.selectKeyHelper == false) {
            this.s = false;
            jQuery(this).removeClass(jQuery.selectdrug.f.sc);
          } else {
            jQuery.selectedone = true;         
            // Save current state
            jQuery.selectCurrent[jQuery.selectCurrent.length] = jQuery.attr(this,'id');
          }
        }
      }
      );
    jQuery.selectcheck.apply(this, [e]);
    jQuery(document)
		.bind('mousemove', jQuery.selectcheck)
		.bind('mouseup', jQuery.selectstop);
    return false;
};
jQuery.selectcheck = function(e)
{
	if(!jQuery.selectdrug)
		return;
	jQuery.selectcheckApply.apply(jQuery.selectdrug, [e]);
};
jQuery.selectcheckApply = function(e)
{
	if(!jQuery.selectdrug)
		return;
	var pointer = jQuery.iUtil.getPointer(e);
	
	var scr = jQuery.iUtil.getScroll(jQuery.selectdrug);
	pointer.x += scr.l - this.f.scr.l - this.f.pos.x;
	pointer.y += scr.t - this.f.scr.t - this.f.pos.y;
	
	var sx = Math.min(pointer.x, this.f.pointer.x);
	var sw = Math.min(Math.abs(pointer.x - this.f.pointer.x), Math.abs(this.f.scr.w - sx));
	var sy = Math.min(pointer.y, this.f.pointer.y);
	var sh = Math.min(Math.abs(pointer.y - this.f.pointer.y), Math.abs(this.f.scr.h - sy));
	if (this.scrollTop > 0 && pointer.y - 20 < this.scrollTop) {
		var diff = Math.min(scr.t, 10);
		sy -= diff;
		sh += diff;
		this.scrollTop -= diff;
	} else if (this.scrollTop+ this.f.pos.h < this.f.scr.h && pointer.y + 20 > this.scrollTop + this.f.pos.h) {
		var diff = Math.min(this.f.scr.h - this.scrollTop, 10);
		this.scrollTop += diff;
		if (this.scrollTop != scr.t)
			sh += diff;
	}
	if (this.scrollLeft > 0 && pointer.x - 20 < this.scrollLeft) {
		var diff = Math.min(scr.l, 10);
		sx -= diff;
		sw += diff;
		this.scrollLeft -= diff;
	} else if (this.scrollLeft+ this.f.pos.w < this.f.scr.w && pointer.x + 20 > this.scrollLeft + this.f.pos.w) {
		var diff = Math.min(this.f.scr.w - this.scrollLeft, 10);
		this.scrollLeft += diff;
		if (this.scrollLeft != scr.l)
			sw += diff;
	}
	jQuery.selectHelper.css(
		{
			left:	sx + 'px',
			top:	sy + 'px',
			width:	sw + 'px',
			height:	sh + 'px'
		}
    );
	jQuery.selectHelper.l = sx + this.f.scr.l;
	jQuery.selectHelper.t = sy + this.f.scr.t;
	jQuery.selectHelper.r = jQuery.selectHelper.l + sw;
	jQuery.selectHelper.b = jQuery.selectHelper.t + sh;
	jQuery.selectedone = false;
  jQuery.elements = this.f.el;
  
  // For ordered selection (e.g. on tables)
  if (this.f.os == true) {
    // Activate first and last selected element by region and save them for later use
    this.f.el.each(function() {
        this.l = this.pos.x;
        this.r = this.pos.x + this.pos.wb;
        this.t = this.pos.y;
        this.b = this.pos.y + this.pos.hb;
        
        // Single cell selection
        if (this.l < jQuery.selectHelper.l && this.t < jQuery.selectHelper.t && this.r > jQuery.selectHelper.r && this.b > jQuery.selectHelper.b) {
          this.s = true;
          jQuery(this).addClass(jQuery.selectdrug.f.sc);
          jQuery.firstselected = this;
          jQuery.lastselected = this;
        }
        
        // Set last selection only if first selection is different form the current element
        else if (jQuery.firstselected && this != jQuery.firstselected) {
          
          // Top right and bottom left region selection
          if (pointer.x > jQuery.selectHelper.l && pointer.y < jQuery.selectHelper.b || pointer.x < jQuery.selectHelper.r && pointer.y > jQuery.selectHelper.t) {
            if ((this.t < jQuery.selectHelper.b && this.b > jQuery.selectHelper.b  && this.r > jQuery.selectHelper.l && this.l < jQuery.selectHelper.l) || (this.t < jQuery.selectHelper.t  && this.b > jQuery.selectHelper.t  && this.l < jQuery.selectHelper.r && this.r > jQuery.selectHelper.r)) {
              this.s = true;
              jQuery(this).addClass(jQuery.selectdrug.f.sc);
              jQuery.lastselected = this;
            }
            // De-selection
            else if (this.s == true) {
              this.s = false;
              jQuery(this).removeClass(jQuery.selectdrug.f.sc);
            }
          }
          
          // Top left and bottom right region selection
          else if (pointer.x < jQuery.selectHelper.r && pointer.y < jQuery.selectHelper.b || pointer.x > jQuery.selectHelper.l && pointer.y > jQuery.selectHelper.t) {
            if ((this.t < jQuery.selectHelper.t && this.b > jQuery.selectHelper.t && this.l < jQuery.selectHelper.l && this.r > jQuery.selectHelper.l) || (jQuery.firstselected && this.t < jQuery.selectHelper.b && this.b > jQuery.selectHelper.b && this.l < jQuery.selectHelper.r && this.r > jQuery.selectHelper.r)) {
              this.s = true;
              jQuery(this).addClass(jQuery.selectdrug.f.sc);
              jQuery.lastselected = this;
            }
            // De-selection
            else if (this.s == true) {
              this.s = false;
              jQuery(this).removeClass(jQuery.selectdrug.f.sc);
            }
          }
        }
    });
    
    // Store human readable positions for first and last selected element
    if (jQuery.firstselected) {
      jQuery.firstselected.l = jQuery.firstselected.pos.x;
      jQuery.firstselected.r = jQuery.firstselected.pos.x + jQuery.firstselected.pos.wb;
      jQuery.firstselected.t = jQuery.firstselected.pos.y;
      jQuery.firstselected.b = jQuery.firstselected.pos.y + jQuery.firstselected.pos.hb;
      
      jQuery.lastselected.l = jQuery.lastselected.pos.x;
      jQuery.lastselected.r = jQuery.lastselected.pos.x + jQuery.lastselected.pos.wb;
      jQuery.lastselected.t = jQuery.lastselected.pos.y;
      jQuery.lastselected.b = jQuery.lastselected.pos.y + jQuery.lastselected.pos.hb;
      
      // At least one element has been selected, so set this to true
      jQuery.selectedone = true;
    }
    
    // Activate element between first and last selected
    this.f.el.each(function() {
        if (jQuery.firstselected) {
          
          // Selection goes from top to bottom and also inbetween elements are being selected
          if ((this.r < jQuery.lastselected.r && this.t == jQuery.lastselected.t && this.t > jQuery.firstselected.t) || (this.r > jQuery.firstselected.r && this.t == jQuery.firstselected.t && this.t < jQuery.lastselected.t) || (this.t > jQuery.firstselected.t && this.t < jQuery.lastselected.t)) {
            this.s = true;
            jQuery(this).addClass(jQuery.selectdrug.f.sc);
          }
          
          // Selection goes from bottom to top and also inbetween elements are being selected
          else if ((this.r < jQuery.firstselected.r && this.t == jQuery.firstselected.t && this.t > jQuery.lastselected.t) || (this.r > jQuery.lastselected.r && this.t == jQuery.lastselected.t && this.t < jQuery.firstselected.t) || (this.t > jQuery.lastselected.t && this.t < jQuery.firstselected.t)) {
            this.s = true;
            jQuery(this).addClass(jQuery.selectdrug.f.sc);
          }
          
          // Selection goes on a single row
          else if ((this.r > jQuery.firstselected.r && this.r < jQuery.lastselected.r && this.t == jQuery.firstselected.t && this.t == jQuery.lastselected.t) || (this.r < jQuery.firstselected.r && this.r > jQuery.lastselected.r && this.t == jQuery.firstselected.t && this.t == jQuery.lastselected.t)) {
            this.s = true;
            jQuery(this).addClass(jQuery.selectdrug.f.sc);
          }
        }
    });
  }
  
  // Classic selection (any elements in the rubberband selection are selected)
  else {
    this.f.el.each(
      function () {
        // Locate the current element in the current selection
        iIndex = jQuery.selectCurrent.indexOf(jQuery.attr(this, 'id'));
        // In case we are currently OVER an item
        if (
          ! ( this.pos.x > jQuery.selectHelper.r
            || (this.pos.x + this.pos.wb) < jQuery.selectHelper.l
            || this.pos.y > jQuery.selectHelper.b
            || (this.pos.y + this.pos.hb) < jQuery.selectHelper.t
            )
          )
        {
          jQuery.selectedone = true;
          if (this.s != true) {
            this.s = true;
            jQuery(this).addClass(jQuery.selectdrug.f.sc);
          }
          
          // Check to see if this item was previously selected, if so, unselect it
          if (iIndex != -1) {
            this.s = false;
            jQuery(this).removeClass(jQuery.selectdrug.f.sc);
          }
        } else if (
          (this.s == true) &&
          (iIndex == -1)
					) {
				// If the item was marked as selected, but it was not selected when you started dragging unselect it.
				this.s = false;
				jQuery(this).removeClass(jQuery.selectdrug.f.sc);
          } else if (
						(!this.s) &&
						(jQuery.selectKeyHelper == true) &&
						(iIndex != -1)
            ) {
          // Reselect the item if:
          // - we ARE multiselecting,
          // - dragged over an allready selected object (so it got unselected)
          // - But then dragged the selection out of it again.
          this.s = true;
          jQuery(this).addClass(jQuery.selectdrug.f.sc);
            }
      }
      );
  }
	return false;
};

jQuery.selectstop = function(e)
{
	if(!jQuery.selectdrug)
		return;
	jQuery.selectstopApply.apply(jQuery.selectdrug, [e]);
};
jQuery.selectstopApply = function(e)
{
	jQuery(document)
  .unbind('mousemove', jQuery.selectcheck)
  .unbind('mouseup', jQuery.selectstop);
	if(!jQuery.selectdrug)
		return;
	jQuery.selectHelper.css('display','none');
	if (this.f.hc)
		jQuery.selectHelper.removeClass(this.f.hc);
	jQuery.selectdrug = false;
	jQuery('body').append(jQuery.selectHelper.get(0));
	//
	// In case we have selected some new items..
	if (jQuery.selectedone == true) {
		if (this.f.onselect)
			this.f.onselect(jQuery.Selectserialize(jQuery.attr(this,'id')));
	} else {
		if (this.f.onselectstop)
			this.f.onselectstop(jQuery.Selectserialize(jQuery.attr(this,'id')));
	}
	// Reset current selection
	jQuery.selectCurrent = [];
};

jQuery.Selectserialize = function(s)
{
	var h = '';
	var o = [];
	if (a = jQuery('#' + s)) {
		a.get(0).f.el.each(
			function ()
			{
				if (this.s == true) {
					if (h.length > 0) {
						h += '&';
					}
					h += s + '[]=' + jQuery.attr(this,'id');
					o[o.length] = jQuery.attr(this,'id');
				}
			}
      );
	}
	return {hash:h, o:o};
};
jQuery.fn.Selectable = function(o)
{
  // Enable(default)/Disable control-key behaviour
  jQuery.keycontrolSelect = typeof o.keycontrol === 'boolean' ? o.keycontrol : true;
  
	if (!jQuery.selectHelper) {
		jQuery('body',document).append('<div id="selectHelper"></div>').bind('keydown', jQuery.selectKeyDown).bind('keyup', jQuery.selectKeyUp);
		jQuery.selectHelper = jQuery('#selectHelper');
		jQuery.selectHelper.css(
			{
				position:	'absolute',
				display:	'none'
			}
      );
    if (window.event) {
      jQuery('body',document).bind('keydown', jQuery.selectKeyDown).bind('keyup', jQuery.selectKeyUp);
    } else {
      jQuery(document).bind('keydown', jQuery.selectKeyDown).bind('keyup', jQuery.selectKeyUp);
    }
	}
  
  if (!o) {
		o = {};
	}
  return this.each(
		function()
		{
			if (this.isSelectable)
				return;
			this.isSelectable = true;
			this.f = {
				a : o.accept,
				o : o.opacity ? parseFloat(o.opacity) : false,
				sc : o.selectedclass ? o.selectedclass : false,
				hc : o.helperclass ? o.helperclass : false,
        os : o.ordered ? o.ordered : false,
				onselect : o.onselect ? o.onselect : false,
				onselectstop : o.onselectstop ? o.onselectstop : false
			};
			this.f.el = jQuery('.' + o.accept);
			jQuery(this).bind('mousedown', jQuery.selectstart).css('position', 'relative');
		}
    );
};