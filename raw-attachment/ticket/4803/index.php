<?php
	include_once("config/config.php");
	require_once(CLASS_DIR_PATH."clients/OsClientsManager.php");
	
	$clientMgr = new OsClientsManager();
	
	try{
		$clientArr = $clientMgr->getAllOsClients(1); //To sort by client name
	}catch(OsClientsException $OsClientsExceptionInfo) {
		$clientArr = 0;
	}
	
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
<title>Clients - OpenSpot</title>

<link rel="stylesheet" type="text/css" media="screen" href="/css/app.css" />

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.1/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/app.js"></script>
<script type="text/javascript" src="/js/jquery.validate.js"></script>
<script type="text/javascript" src="/js/jquery.splitter.js"></script>
<script type="text/javascript" src="/js/jquery.autogrow.js"></script>
<script type="text/javascript" src="/js/jquery.limit-1.1.js"></script>
<script type="text/javascript" src="/js/clients.js"></script>


<link rel="stylesheet" type="text/css" href="/css/jquery-ui.css" />

</head>

<body id="bluebody">

<?php include $_SERVER["DOCUMENT_ROOT"] . "/includes/header.php" ?>

<div class="nav_container" id="nav_one_level">
	<ul id="nav">
		<li><a href="/" title="Overview"><span></span><strong>Overview</strong></a></li>
		<li><a href="/calendar/day.php" title="Calendar"><span></span><strong>Calendar</strong></a></li>
		<li><a href="/clients" title="Clients" class="current"><span></span><strong>Clients</strong></a></li>
		<li><a href="/history" title="History"><span></span><strong>History</strong></a></li>
		<li><a href="/manage/staff-profiles.php" title="Manage"><span></span><strong>Manage</strong></a></li>
		<li><a href="/settings/business-hours.php" title="Settings"><span></span><strong>Settings</strong></a></li>
	</ul>
</div>

<div class="toolbar">
	<table class="clients_toolbar">
		<tr>
			<td>
				<a href="#" class="new_entry"><span class="icon new"></span><span class="text link">New Client</span></a>
			</td>
			<td class="full_width"></td>
			<td>
				<a href="#" class="export"><span class="icon calendar"></span><span class="text link">Export</span></a>
			</td>
			<td>
				<a href="#" onclick="javascript:window.print();" class="print"><span class="icon print"></span><span class="text link">Print</span></a>
			</td>
		</tr>
	</table>
</div>

<div id="mysplitter">
	<div id="contact_list">
				<?php
						if(count($clientArr) == 0){
							$name= "New Client"	;
							$link = "client_profile.html?id=0";
						}else{
							$name= "Example Client"	;
							$link = "example-client.html?id=0";
						}
				?>
				<!--ADDED 12 Testing-->
				<div class="alpha_group" style="display:none;">
					<div class="alphabet_divider"><p>&nbsp;</p></div>
					<ul>
						<li>
							<a href="/clients/people/<?=$link?>" class="client_link" id="0">
								<span class="icon smallperson"></span>
								<span class="name"><?php echo $name;?></span>				
							</a>
							<span class="drop_holder">
								<span class="arrow delete"></span>
							</span>
						</li>
					</ul>
				</div>
				<!-- END -->
				
				<?php	
						//print_r($clientArr);
						$lastAlp = "";
						if(is_array($clientArr)) {
						for($i=0;$i<count($clientArr);$i++) {	
						
						$NewAlp = strtolower(substr($clientArr[$i]->getLastName(),0,1));
						
						if($lastAlp != $NewAlp)	{
						if($i != 0){
						?>
						</ul>
						</div>
						<?
						}
				?>		
						<div class="alpha_group">	
						<div class="alphabet_divider"><p><?php echo ucfirst($NewAlp);?></p></div>
						<ul>
						<? 	
						$lastAlp  = $NewAlp;
						} ?>
						<li>
							<a href="/clients/people/client_profile.html?id=<?=$clientArr[$i]->getClientId();?>" class="client_link" id="<?=$i+1?>">					
								<span class="icon smallperson"></span>
								<span class="name" ><?php echo ucfirst($clientArr[$i]->getLastName());?>&nbsp;<?php echo ucfirst($clientArr[$i]->getFirstName());?></span>				
							</a>
							<span class="drop_holder" id="<?=$clientArr[$i]->getClientId();?>">
								<span class="arrow delete"></span>
							</span>
						</li>
						
				
			<?php 		
						} //end of if
						if($i == count($clientArr)){
						?>
						</ul>
						</div>
						<?
					}	//end of for
				} //end of if
			?>
	
	</div>
	
	<div id="person_info_wrapper" class="clients">
	</div>			
</div>

<div id="dialog_error" style="display:none;">
	<div class="exclamation"></div>
	<h3>Clients</h3>
	<div id="dialog_container"><p></p></div>
	<div class="modal-buttons">
		<div class="button_thick lighter_thick close-trigger"><a href="#" onclick="javascript:close_dialog();"><span></span><strong>Cancel</strong></a></div>
	</div>
</div>

<div id="dialog_export" style="display:none;">
	<h3>Export your client list</h3>
	<p>.csv files can be opened with Microsoft Excel, Google Docs, as well as most text editors.</p>
	<div class="links">
		<a href="people/export_client.php">Download .csv file</a>
	</div>
	<div class="modal-buttons">
		<div class="button_thick lighter_thick close-trigger"><a><span></span><strong>Cancel</strong></a></div>
	</div>
</div>

</body>
</html>