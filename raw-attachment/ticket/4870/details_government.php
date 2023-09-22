<?php
include('include/init.php');
$con=" where  status=1";
$GovernD=$data_func_obj->returnRS("gove_mgmt",$con,$debug=0);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>index</title>
<link href="style/body.css" rel="stylesheet" type="text/css" />
</head>

<body class="body_bg">

<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="78%" valign="top">
    
    <table width="900" border="0" cellspacing="0" cellpadding="0" align="right">
  <tr>
    <td align="right"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td valign="top"><table width="900" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td height="43" colspan="2" >
			<?php include('include/header.php'); ?> 
			
			                </td>
          </tr>
          <tr>
            <td colspan="2"><table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td width="280" style="padding-top:46px;"><img src="images/logo.jpg" width="280" height="77" /></td>
                <td valign="top"><table width="100%" border="0" cellspacing="12" cellpadding="0">
                  <tr>
                    <td align="right" style="padding-right:30px;" ><img src="images/Call_me.jpg" width="276" height="26" /></td>
                    </tr>
                  <tr>
                   <td align="right"><a href="#"><img src="images/banner.jpg" width="594" height="73" border="0" /></a></td>
                  </tr>
                  <tr>                          </tr>
                  
                </table></td>
              </tr>
            </table></td>
          </tr>
          <tr>
            <td width="31%">&nbsp;</td>
            <td width="69%" height="34" valign="top" background="images/login_bg_transperent.jpg" style="background-repeat:no-repeat">
			
			<?php include('include/login.php'); ?> 
			
			            </td>
          </tr>
        </table></td>
      </tr>
     <tr>
        <td align="left" valign="top" style="padding-top:3px">
        
       <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td width="33%" valign="top">
			
			<?php include('include/left.php'); ?> 
			
			</td>
            <td width="67%" valign="top"><table width="100%" border="0" cellspacing="4" cellpadding="0">
			<?php
				while($RowGD=mysql_fetch_array($GovernD))
				 { ?>
              <tr>
			  <td width="17%" rowspan="6"><img src="upload_here/governmet/<?php echo $RowGD[img];?>" /></td>
			  </tr>
			    
				 <tr><td><strong>Title</strong></td></tr>
			  <tr>
			  <td width="83%" valign="top"><?php echo $RowGD[gove_name];?></td>
			  </tr>
			  <tr><td><strong>Description</strong></td></tr>
			  <tr>
			  <td><?php echo $RowGD[gove_dicreption];?></td></tr>
			  <tr><td><strong>Date</strong></td></tr>
			  <tr>
			  <td><?php echo $RowGD[post_date];?></td>
			  </tr>
			  <tr><td align="right" colspan="2" class="more"><a href="government_pro_details.php?goveid=<?php echo $RowGD[gove_id]; ?>" class="more">More</a></td></tr>
			   <tr><td align="right" colspan="2"><hr /></td></tr>
			  <?php }
			  ?>
            </table></td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td><table width="100%" border="0" cellspacing="3" cellpadding="3">
  <tr>
    <td width="52%" class="border_LB_1" align="center"><img src="images/banner1.jpg" /></td>
    <td width="48%" class="border_LB_1" align="center"><img src="images/banner2.jpg" /></td>
  </tr>
</table>
</td>
        </tr>
      
    </table></td>
  </tr>
</table>     </td>
    <td width="22%" valign="top" style="padding-top:247px;">
	<?php include('include/right.php'); ?> 
	</td>
  </tr>
  <tr>
    <td colspan="2" class="footer" height="60">
    <table width="900" border="0" cellspacing="2" cellpadding="2">
  <tr>
    <?php include('include/footer.php'); ?> 
  </tr>
</table>

    </td>
  </tr>
</table>


</body>
</html>
