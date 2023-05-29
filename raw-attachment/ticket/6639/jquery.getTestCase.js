/**
 * Created by Alexander Trefz
 * Date: 06.06.2010
 * Time: 13:01:49
 * Description: Testcase for a Bug in jQuery.get in Chrome.
 */

$.get("test.xml", function(data){
    $(".result").eq(0).text($(data).text());
});

$.get("test.xml", "xml", function(data){
    $(".result").eq(1).text($(data).text());
});

$.get("test.xml", function(data){
    $(".result").eq(2).text($(data).text());
}, "xml");

$.get("test.xml", function(data){
    $(".result").eq(3).text($(data).text());
}, "text");

$.get("test.xml", "xml", function(data){
    $(".result").eq(4).text($(data).text());
}, "xml");
