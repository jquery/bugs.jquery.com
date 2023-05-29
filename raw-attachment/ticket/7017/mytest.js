$(document).ready(function() {
  jQuery('body').ajaxStart(function(){
    alert( "ajaxStart" );
  }).ajaxStop(function(){
    alert( "ajaxStop" );
  }).ajaxSend(function(){
    alert( "ajaxSend" );
  }).ajaxComplete(function(){
    alert( "ajaxComplete" );
  }).ajaxError(function(){
    alert( "ajaxError" );
  }).ajaxSuccess(function(){
    alert( "ajaxSuccess" );
  });
  
  $('#AjaxTestButton').click(function() {
    var TestObj = new AjaxTest('ajaxtest.html');
    TestObj.send();
  });
});

AjaxTest = function(url) {
  this.url = url;
}

AjaxTest.prototype = {
  send: function() {
    jQuery.ajax({
      url: this.url,
      beforeSend: function(){ alert("beforeSend"); },
      success: function(data){
        alert("success");
        $('#AjaxResponse').html(data);
      },
      error: function(){ alert("error"); },
      complete: function(){ alert("complete"); },
      context: this
    });
  }
}