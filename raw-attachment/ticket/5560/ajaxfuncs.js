/*!
 * ajax support functions
 * http://forums.sgc-clan.com/
 *
 * Copyright (c) 2009 SGC-clan.com
 * licensed under GPLv2 license.
 * www.gnu.org/licenses/gpl-2.0.txt
 *
 * Date: 2009-11-1 (Sun, 1 Nov 2009)
 * Revision: 5
 */
var currentAnchor = null;
function checkAnchor()
{
	if(currentAnchor == document.location.hash)
		return;
	
	currentAnchor = document.location.hash;

	var anchor = currentAnchor.substring(1)
	if ( !anchor ) anchor = "home";
	
	getPage( anchor );
}

$(document).ready( function () {
	
	checkAnchor();
	setInterval( "checkAnchor()", 500 );
	
});

function getPage(page) {
	currentAnchor = document.location.hash = "#" + page;
	document.getElementById("content").innerHTML = " ";
	$("#content").load("http://www.kalloritis.net/" + page + ".html");
};

$("form").submit( function () { return false; } );
