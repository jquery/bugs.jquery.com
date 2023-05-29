<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">



<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>test</title>
  <script src="jquery-1-2-6.js"></script>
  <script>
    jQuery(document).ready(
   function()
   {
     jQuery('#disablebtn').click(
         function()
         {
            jQuery('#mytable input[@type=radio]').attr("disabled","disabled");
            return false;
         }
     )/*click*/
   }/*function*/
)/*ready*/

</script>
</head>

<body>



 <form>
    <table border="1" id = "mytable">
    <tbody>

      <tr>
        <td><input type="radio" id="item" /></td>
        <td><input type="text" id="text11" value="text11" /></td>
        <td><input type="text" id="text12" value="text12" /></td>
      </tr>

      <tr>
        <td><input type="radio" id="item" /></td>
        <td><input type="text" id="text21" value="text21" /></td>
        <td><input type="text" id="text22" value="text22" /></td>
      </tr>

      <tr>
        <td><input type="radio" id="item" /></td>
        <td><input type="text" id="text31" value="text31" /></td>
        <td><input type="text" id="text32" value="text32" /></td>
      </tr>

    </tbody>
    </table>
    <input type="button" id="disablebtn" value="Disable" />
 </form>
</body>

</html>