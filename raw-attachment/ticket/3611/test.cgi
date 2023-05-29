#!/usr/bin/perl

print "Content-Type: text/html; charset=Windows-1251\n";
print "Cache-control: private\n";
print "\n";

print << "EOL";
<html>
  <head>
    <script language='javascript' src='jquery-1.2.6.js'></script>
  </head>
  <body>
    <form>
      <input type='text' name='x' id='x'>
      <input type='submit'>
      <a href="javascript:putRussianFLetter()">Put Russian F letter</a>
    </form>
$ENV{'QUERY_STRING'}
    <button onclick='doClick()'>JQ</button>
    <script language='javascript'>
    function doClick() {
      \$.get('test.cgi', {x:\$('#x')[0].value, anticache:Math.random()},
          function( data ){\$('#out').html(data);});
    }
    function putRussianFLetter() {
      \$('#x')[0].value = '\\u0424';
    }
    </script>
    <div id='out'></div>
  </body>
</html>
EOL

