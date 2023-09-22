<?php
  if (isset($_REQUEST['t'])) {
    sleep($_REQUEST['t']);
  }
  header("Content-Type: text/css");
?>

#tester { width:100px; background:yellow; }
