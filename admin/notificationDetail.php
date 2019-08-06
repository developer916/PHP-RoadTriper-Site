<?php session_start();?>
<!DOCTYPE html>
<!--[if IE 8]><html lang="en" id="ie8" class="lt-ie9 lt-ie10"> <![endif]-->
<!--[if IE 9]><html lang="en" id="ie9" class="gt-ie8 lt-ie10"> <![endif]-->
<!--[if gt IE 9]><!-->
<html lang="en"> <!--<![endif]-->
<head>
	<?php require("../common/config.php"); ?>    
    <?php require("../common/DB_Connection.php"); ?>
    <?php require("../common/functions.php"); ?>
    <?php require("../common/header.php"); ?>
    <?php require("../common/dataLog.php"); ?>
    <?php UA_isAdmin();?>
    <?php 
    	$pageType = "9";
    	UA_isPermission( $pageType );
    ?>
    <link rel="stylesheet" type="text/css" href="http://www.datatables.net/media/blog/bootstrap_2/DT_bootstrap.css">
    <script src="/js/jquery.dataTables.js"></script>
    <script src="/js/DT_bootstrap.js"></script>
    
    <script src="/js/admin/notificationDetail.js"></script>        
</head>
<body>
	<div id="container">
		<?php require_once("top.php"); ?>
		<?php require_once("leftMenu.php"); ?>
		<div id="content" class="floatleft">
			<h3 class="pageHeader"><?php echo _lang("Notification Detail");?></h3>
			<div id="divContent" class="form-horizontal">
			<?php  
				$notificationId = $_GET['id'];
				if(isset($notificationId))
				{
					$sql = "select * from ua_notification where ua_notification = $notificationId";
						$result = $db->queryArray($sql);
						$result = $result[0];
				?>
					<div class="control-group">
						<label class="control-label"><?php echo _lang("Content")?></label>
						<span class="notificationLabel"><?php echo $result['ua_content']?></span>
					</div>
					<div class="control-group">
						<label class="control-label"><?php echo _lang("Description")?></label>
						<span class="notificationLabel"><?php echo $result['ua_description']?></span>
					</div>
					<div style="text-align:center;">
						<a href="notificationList.php" class="btn btn-danger"><?php echo _lang("List")?></a>
					</div>
			<?php 		
				}
				else{
						$notificationId = "";
			?>
					<div class="control-group">
					    <label class="control-label"><?php echo _lang("Content");?><span class="required">*</span></label>
					    <div class="controls"><textarea rows="5"  style="width:450px" id="notificationContent" placeholder="Notifiction Content"></textarea></div>
					</div>	
					<div class="control-group">
					    <label class="control-label"><?php echo _lang("Description");?></label>
					    <div class="controls"><textarea id="notificationDescription" rows="5" cols="100" style="width:450px" placeholder="Notifiction Description"></textarea></div>
					</div>				
					<div style="margin-left: 230px;">
						<a href="#" onclick="onNotificationSave()" class="btn btn-primary"><?php echo _lang("Save")?></a>&nbsp;&nbsp;&nbsp;
						<a href="notificationList.php" class="btn btn-danger"><?php echo _lang("List")?></a>				
					</div>
			<?php }?>
			</div>
		</div>		
		<div class="clearboth"></div>
		<?php require_once("footer.php"); ?>
	</div>
</body>
</html>