
<?php

echo '<SCRIPT type="text/javascript" SRC="../js/jquery.js"> </SCRIPT>';

echo '<script language="javascript" type="text/javascript">';
echo "var xload = \"xload\";";

echo '$("#test_1").click(function(){$(\'#test_1\').load( \'../ajax_http.php\',{variable2:xload});});';

echo '</script >';


//echo '<div id="test_1" class="test_1" OnClick="$(\'#test_1\').load( \'../ajax_http.php\',{variable2:xload});">';

echo '<div id="test_1" name="test_1" class="test_1"  OnClick=" $(\'#test_1\').click(function(){$(\'#test_1\').load( \'../ajax_http.php\',{variable2:xload});});">';
echo 'Original text';
echo '</div>';


?>