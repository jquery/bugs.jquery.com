var carr_options = {  
	visible: '100%',  
	auto: false,
	circular: false,
	mouseWheel: false,
	speed: 4000,
	eltByElt: true  
};
var content_cache = {
	cache: new Array(),
	has: function(section, id, sort) {
			for(var i = 0; i < this.cache.length; i++) {
				if((this.cache[i].section == section) &&
				   (this.cache[i].id == id) &&
				   (this.cache[i].sort == sort)) {
					return true;	
				}
			}
			return false;
		},
	get: function(section, id, sort) {
			if(this.has(section, id, sort)) {
				var index = this.getIndex(section, id, sort);
				return this.cache[index].data;
			}
			return null;
		},
	getIndex: function(section, id, sort) {
			for(var i = 0; i < this.cache.length; i++) {
				if((this.cache[i].section == section) &&
				   (this.cache[i].id == id) &&
				   (this.cache[i].sort == sort)) {
					return i;	
				}
			}
			return -1;
		},
	set: function(section, id, sort, data) {
		this.cache.push({"section":section.toString(), "id":id, "data":data.toString(), "sort":sort.toString()});
	}
};
$(function() {
	$.preload(['arrow-white-down','arrow-white-left'], { ext: '.png', base: 'scripts/' });
	$.preload(['1x1_80w'], { ext: '.png', base: 'styles/' });
	
	var getcontent = function(handler, section, id, sort, force_no_cache) {
		var json = null;
		var no_cache = (force_no_cache==true)?true:false;
		
		var id_arr = (id.constructor.toString().indexOf("Array")>-1);
		var id_str = "";
		if(id_arr) {
			for(var idi = 0; idi < id.length; idi++) {
				id_str += "&id[]=" + id[idi];
			}
		} else {
			id_str += "&id=" + id;	
		}
		
		if(window.content_cache && !no_cache) {
			if(window.content_cache.has(section, id_str, sort)) {
				json = window.content_cache.get(section, id_str, sort);
			} else {
				json = $.ajax({
					url:'json.php?s=' + section + id_str + '&sort=' + sort,
					async: false
					}).responseText;
				window.content_cache.set(section, id_str, sort, json);
			}
		} else {
			json = $.ajax({
				url:'json.php?s=' + section + id_str + '&sort=' + sort,
				async: false
				}).responseText;
		}
		eval(handler + '(' + json + ');');
	}
	window.getcontent = getcontent;
	var checkdata = function(data) {
		if(data.error) {
			alert("Error: " + data.error + "\nQuery: " + data.query);
			return false;
		} else {
			return true;
		}
	};
	window.checkdata = checkdata;
	
	var closeBox = function() {
		$('#boxframe').hide("scale", { direction: "both", percent: 0 }, 1500);
		$('#sidebar').hide("drop", { direction: "left" }, 1000);
	};
	var handleClick = function() {
		if($('#boxframe').is(':hidden')) {
			$('#boxframe').show("scale", { direction: "both", percent: 100 }, 1500);
		}
		if($('#sidebar').is(':hidden')) {
			$('#sidebar').show("drop", { direction: "left" }, 1000);
		}
		
		if($(this).attr('href')=='#schotland') {
			window.location='http://schotland.motoerit.nl/';
			return false;
		}
		
		if(!($(this).attr('href').toString().indexOf('javascript:')>-1)) {
			//alert($(this).attr('href'));
		}
		
		return ($(this).attr('href').toString().indexOf('javascript:')>-1);
	};
	window.handleClick = handleClick;
	
	$('a[href]:not(.submenuheader)').bind('click', handleClick);
	
	$('#content ul li a[href]').unbind('click').click(function() {
		$('#content .content-tab').hide();
		$($(this).attr('href')).show();
	});
	
	$('#closeicon').bind('click', closeBox);
	
	$(document).ready(function() {
		window.getcontent('handleCat','categorie',-1,'volgorde,naam');
		window.getcontent('handleContent','content',1,'id');
		window.getcontent('handleTopMenu','content',-1,'menutitel');
		
		if($('#fotoslider ul li').length > 0) {
			$("#fotoslider").jMyCarousel(window.carr_options);
		}
	});
});
function handleCat(data) {
	if(checkdata(data)) {
		$('#sidebar .glossymenu').empty();
		for(var i = 0; i < data.result.length; i++) {
			var str = '';
			if(data.result[i].id == '2') {
				str = '<a href="#schotland" class="menuitem' + ((data.result[i].sub)?' submenuheader':'') + '">' + data.result[i].naam + '</a>';
			} else {
				str = '<a href="#sub' + data.result[i].id + '" class="menuitem' + ((data.result[i].sub)?' submenuheader':'') + '">' + data.result[i].naam + '</a>';
			}
			if(data.result[i].sub) {
				var d = '<div id="sub' + data.result[i].id + '" class="submenu" style="display:none;"><ul>';
				for(var j = 0; j < data.result[i].sub.length; j++) {
					d += '<li><a href="javascript:getcontent(\'handleReizen\',\'reizen\',' + data.result[i].sub[j].id + ',\'id\')">' + data.result[i].sub[j].menutitel + '</a></li>';
				}
				d += '</ul></div>';
				str += d;
			}
			$('#sidebar .glossymenu').append(str);
		}
		acc_refresh();
	}
}
function handleContent(data) {
	if(checkdata(data)) {
		$('#boxframe h2:first').text('Motoerit - ' + data.result[0].menutitel);
		$('#content-sidebar').hide();
		$('#content-content').css('margin-left','10px');
		
		$('#tab1').empty().append('<h3>' + data.result[0].kop + '</h3>').append(data.result[0].content);
		
		$('#content .content-tab').hide();
		$('#tab1').show();
		
		$('#content-content a').bind('click', handleClick);
		
		$('#content ul li a[href]').unbind('click').click(function() {
			$('#content .content-tab').hide();
			$($(this).attr('href')).show();
		});
		
		try {
			window.getcontent('handleFotoBoek','fotoboek',-1,'id');
		} catch (e) { alert(e.message.toString()); } // to fool IE
	}
};
function handleReizen(data) {
	if(checkdata(data)) {
		$('#boxframe h2:first').text('Motoerit - Reis : ' + data.result[0].menutitel);
		$('#tab1').empty().append('<h3>Reis : ' + data.result[0].menutitel + '</h3>').append(data.result[0].omschrijving);
		$('#tab2').empty().append('<h3>Reisschema</h3>').append(data.result[0].inbegrepen);
		$('#tab3').empty().append('<h3>Kosten</h3>').append(data.result[0].prijs);
		$('#tab4').empty().append('<h3>Boeken</h3>');
		
		$('#content-sidebar').show();
		$('#content-content').css('margin-left','110px');
		
		$('#content-content a').bind('click', handleClick);
		
		$('#content ul li a[href]').unbind('click').click(function() {
			$('#content .content-tab').hide();
			$($(this).attr('href')).show();
		});
		
		if(data.result[0].fotoboek) {
			try {
				window.getcontent('handleFotoBoek','fotoboek', data.result[0].fotoboek ,'id');
			} catch (e) { alert(e.message.toString()); } // to fool IE
		} else {
			$('#fotoslider ul').jMyCarousel = null;
			$('#fotoslider').removeAttr('style');
			$('#fotoslider').empty();
		}
	}
};
function handleTopMenu(data) {
	if(checkdata(data)) {
		$('#menubar ul').empty().append('<li><a href="javascript:getcontent(\'handleCat\',\'categorie\',-1,\'volgorde,naam\')">Programma</a></li>'+
			'<li><a href="#">Fotoboek</a></li>');
		for(var i = 0; i < data.result.length; i++) {
			$('#menubar ul').append('<li><a href="javascript:getcontent(\'handleContent\',\'content\',' +
																		data.result[i].id +
																		',\'id\')">' + data.result[i].menutitel + '</a></li>');
		}
	}
	$('a[href]:not(.submenuheader)').bind('click', handleClick);
};
function handleFotoBoek(data) {
	if(checkdata(data)) {
		// Cleaning up the carousel
		for(var t = 0; t < $.timers.length; t++) {
			if($.timers[t].elem.tagName=="UL" && $.timers[t].elem.parentNode.id == "fotoslider") {
				$.timers.splice(t);
			}
		}
		$('#fotoslider ul').jMyCarousel = null;
		$('#fotoslider').removeAttr('style');
		$('#fotoslider').empty();
		$('#fotoslider').append('<ul></ul>');
		
		// Adding Images
		for(var i = 0; i < data.result.length; i++) {
			if(data.result[i].sub) {
				for(var j = 0; j < data.result[i].sub.length; j++) {
					$('#fotoslider ul').append('<li><img src="uploads/' +
											   data.result[i].sub[j].filename + 
											   '" width="' +
											   data.result[i].sub[j].breedte + 
											   '" height="' +
											   data.result[i].sub[j].hoogte + 
											   '" /></li>');
				}
			}
		}
		
		// Running the carousel again
		if($('#fotoslider ul li').length > 0) {
			$("#fotoslider").jMyCarousel(window.carr_options);
		}
	}
};
function acc_refresh() {
	$('#sidebar a').unbind('click');
	$('#sidebar a.submenuheader').click(function() {
		$($(this).attr('href')).toggle();
		if($($(this).attr('href')).is(":hidden")) {
			$(this).find('img').attr('src','scripts/arrow-white-left.png');
		} else {
			$('div.submenu:visible:not(' + $(this).attr('href').toString() + ')').hide();
			$('a.submenuheader img').attr('src','scripts/arrow-white-left.png');
			$(this).find('img').attr('src','scripts/arrow-white-down.png');
		}
		return false;
	}).each(function() {
		if($($(this).attr('href')).is(':hidden')) {
			$(this).append('<span class="statusicon"><img src="scripts/arrow-white-left.png" border="0"/></span>');
		} else {
			$(this).append('<span class="statusicon"><img src="scripts/arrow-white-down.png" border="0"/></span>');
		}
	});

	$('#sidebar a:not(.submenuheader)').bind('click', handleClick);
};