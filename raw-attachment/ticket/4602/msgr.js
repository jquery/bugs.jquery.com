(function($) {
	
	$.fn.moMessenger = function ( opts ) {
		var def = {
			classes : {
				handler : 'top',
				close : 'close',
				msgsCont : 'msgs',
				msg : 'msg',
				author : 'author',
				time : 'datetime',
				cont : 'cont',
				type : 'type',
				send : 'send',
				open : 'open'
			},
			dataType : 'json',
			pos : {
				x : 300,
				y : 100
			},
			source : 'generate',
			archive : false,
			from : 'Arrviasto',
			to : 'mojaosoba.pl',
			interval : 2000
		};
		
		var opts = $.extend( def, opts );
		
		return this.each( function (i) {
			$win = $(this);
			
			$win.Draggable( { 
				handle : '.'+opts.classes.handler,
				frameClass : 'frame'
			} )
				.find( '.'+opts.classes.send ) // Travers
				.bind( 'click', function (e) {
					sendMessage();
				});
			
			bindShow();
			bindHide();
			var timingInterv = setInterval( function () { checkMsgs(); }, 5000 );

			function bindShow() {
				$(document).find('.'+opts.classes.open).one( 'click', function (e) {
					$win.show(500);
					bindShow();
				} );
			} // End of bindShow
   
			function bindHide() {
				$win.find('.'+opts.classes.close).one( 'click', function (e) {
					$win.hide(200);
					bindHide();
				} );
			} // End of bindHide
			
			function sendMessage() {
				var msg = $win
					.find('.'+opts.classes.type)
					.children('textarea')
					.val();
				
				alert("Od: "+opts.from+"\nDo: "+opts.to+"\nTreść: "+msg );
				
				$.post('../ajax.php', { func : 'sendMsg', msg : msg, from : 1, to : 2 }, function(data) {
					alert(data);
					checkMsgs();
				} );
			} // End of sendMessage
			
			function checkMsgs() {
			
				$.post('../ajax.php', { func : 'checkMsgs', from : opts.from, to : opts.to }, function (json, e) { alert(json+"\n"+e);
					if ( json.msg )
					{
						var $msg = $('<div></div>').addClass(opts.classes.msg).clone();
						var $a = $('<span></span>').addClass(opts.classes.author).clone();
						var $t = $('<span></span>').addClass(opts.classes.time).clone();
						var $cont = $('<span></span>').addClass(opts.classes.cont).clone();
   
						$a
							.text( json.from );
						$t
							.text( json.date );
						$cont
							.text( json.text );
   
						$msg
							.append($a)
							.append($t)
							.append($cont)
							.appendTo($win.find('.'+opts.classes.msgsCont));
					}
				}, 'json' );
			} // End of checkMsgs
			
			function getArchiveId() {
				
				return true;
			} // End of getArchiveId
			
		} );
	}
	
})(jQuery);