<?php

if( isset($_GET['HELLO']) )
    header("Location: http://www.google.com/");
?>
<html>
    <head>
        <script type="text/javascript" src="jquery.js"></script>
        <script type="text/javascript">
            $().ajaxError(
            function (event, xhr, ajaxOptions, thrownError)
            {
                alert(xhr.getAllResponseHeaders());
            }
            );
    
            $(document).ready(
                function()
                {
                    $("#hello").click(
                        function()
                        {
                            $(this).load("test.php?HELLO");
                        }
                    );
                }
            );
        </script>
    </head>
    <body>
        <span id="hello">hello</span>
    </body>
</html>