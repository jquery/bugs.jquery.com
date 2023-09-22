

embed_test = function() {

    var embed_html = "<object width=\"425\" height=\"344\"><param name=\"movie\" value=\"http://www.youtube.com/v/DvdfO0lq4rQ&hl=en&fs=1\"></param><param name=\"allowFullScreen\" value=\"true\"></param><embed src=\"http://www.youtube.com/v/DvdfO0lq4rQ&hl=en&fs=1\" type=\"application/x-shockwave-flash\" allowfullscreen=\"true\" width=\"425\" height=\"344\"></embed></object>";
    var elem = $(embed_html);
    var embed = elem.find("embed");
    $("#debug").append("test embed html...");
    $("#debug").append(embed.length);
    $("#debug").append("<br/>");
    $("#debug").append(embed.get(0));
    $("#debug").append("<br/>");
    if(embed.get(0))
    {
	$("#debug").append(embed.get(0).tagName); //undefined in IE
    }
    else
    {
	$("#debug").append("Error finding embed tag.");
	$("#debug").append("<br/>");
    }
    $("#debug").append("<br/>");
    $.each(elem.find("*").get(), function(i,el) {
	//embed doesn't show up
	$("#debug").append(el.tagName);
	$("#debug").append("<br/>");
    });

}
