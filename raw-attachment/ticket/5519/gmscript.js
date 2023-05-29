(function(){
  //boiler plate to wait until jQuery is defined...
  function GM_wait()
  {
    if(typeof unsafeWindow.jQuery == 'undefined') {
      window.setTimeout(GM_wait,100);
    } else {
      var $ = unsafeWindow.jQuery;
      $(function() { letsJQuery($); });
    }
  }
  GM_wait();
  
  function letsJQuery($)
  {
    $('textarea[name=comment]').data('tst', 'abc');
    $('textarea[name=comment]').live('keypress', function(e) {
      if(e.which == 0x20) { //spacebar
        alert("the stored data is: " + $(this).data('tst'));
        return false;
      }
    });
  }
})();
