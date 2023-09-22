$(document).ready( function() {
    webKit();
    dothis("info","Settings on open: ");
});

var wheight = 240;
var wwidth = 800;
var ttop=10;

var note = "This problem occurs in web kit browsers - google chrome v1.0.154.43 and safari v3.2.1 (525.271.1) on windows XP,and safari 3.2.1 (4525.27.1) on mac OSX 10.4.11. Same behavior exists in jquery 1.2.6, 1.3, and 1.3.1<BR/><br/>Changing the height or width of a div through .animate will cause web kit browsers to lose their overflow property. 'open, close, grow,shrink, squeeze, expand' are all examples of this. Click 'info' after each to see 'overflow' is not in the properties list. You can see this in the element inspector in chrome / safari. To fix this you must reset the overflow property using .css after the animation finishes. The 'Webkit Fix' button demonstrates that with an instant change - fixshrink and fixgrow have timeouts that automatically reset the overflow after the animation delay.<BR/><br/>Instant height changes via CSS as shown by the insta grow / shrink buttons do not cause any problems if you're starting with a properly rendered div, but if the div is improperly rendered, it will remain broken because the insta grow / shrink functions do not reset overflow:auto.";

function addTool() {
    for(var i = 0; i<arguments.length; i++) {
	$('body').append('<div class=tool id='+arguments[i]+' style="top:'+ttop+'px;left:1px;position:absolute;border:1px solid black;">'+arguments[i]+'</div>');
	ttop += 25;
    }
};

function webKit() {
    addTool("info","grow","shrink","open","close","squeeze","expand","instagrow","instashrink","fixgrow","fixshrink");
    $('body').append('<div id=fix style="top:'+ttop+'px;left:1px;position:absolute;background-color:yellow;border:1px solid black;">Webkit Fix</div>');
    $('body').append('<div id=note style="height:150px; width:'+wwidth+'px;left:150px;overflow:auto;position:absolute;font-size:small;top:1px;">'+note+'</div>');
    $('body').append('<div id=holder class=wk style="height:'+wheight+'px; width:'+wwidth+'px;left:150px;background-color:#FFFFCC;overflow:auto;position:absolute;padding:0px;margin:0px;border:1px solid black;top:160px;"></div>'); 
    $('.tool').click(
        function(wk1){
            wk1.stopPropagation();
            dothis($(this).attr("id"),"");
        }
    );
    $('#fix').click(function(fix) {
        fix.stopPropagation();
	webkitWorkaround();
    });
}; 

function dothis(command,msg) {
    if (command == "info") {
	$(".msg").css("background-color","white");
	$('#holder')
            .append('<div class="msg" style="border-bottom:1px solid gray;background-color:pink;padding:0px;margin:0px;font-size:small;">'+msg+$("#holder").attr("style")+'</div>')
	    .animate({scrollTop: $("#holder div:last-child").offset().top},100);
    }
    if (command == "close") {
	$('#holder').animate({"height":0},250);
    }
    if (command == "open") {
        $('#holder').animate({"height":wheight},250);
    }
    if (command == "instagrow") {
        wheight += 80;
        $('#holder').css({height:wheight});
    }
    if (command == "instashrink") {
        wheight -= 80;
        $('#holder').css({height:wheight});
    }
    if (command == "grow") {
	wheight += 80;
 	$('#holder').animate({height:wheight},250);
    }
    if (command == "shrink") {
 	if (wheight > 0) {
            wheight -= 80;
            $('#holder').animate({height:wheight},250);
	}
    }
    if (command == "fixgrow") {
        wheight += 80;
        $('#holder').animate({height:wheight},250);
	setTimeout(function(){webkitWorkaround()},450);
    }
    if (command == "fixshrink") {
        if (wheight > 0) {
            wheight -= 80;
            $('#holder').animate({height:wheight},250);
	    setTimeout(function(){webkitWorkaround()},450);
        }
    }
    if (command == "squeeze") {
        if (wwidth > 0) {
            wwidth -= 100;
            $('#holder').animate({width:wwidth},250);
        }
    }
    if (command == "expand") {
        wwidth += 100;
        $('#holder').animate({width:wwidth},250);
    }
};

function webkitWorkaround(){
    $('#holder').css({overflow:'auto'});
    dothis("info","<B>Reset overflow to auto-</B> ");
};

