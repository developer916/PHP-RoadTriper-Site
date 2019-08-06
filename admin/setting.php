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
    	$pageType = "7";
    	UA_isPermission( $pageType );
    ?>
    <link rel="stylesheet" type="text/css" href="http://www.datatables.net/media/blog/bootstrap_2/DT_bootstrap.css">
    <script src="/js/jquery.dataTables.js"></script>
    <script src="/js/DT_bootstrap.js"></script>
    
    <script src="/js/admin/setting.js"></script>
</head>
<body>
	<div id="container">
		<?php require_once("top.php"); ?>
		<?php require_once("leftMenu.php"); ?>
		<div id="content" class="floatleft">
			<h3 class="pageHeader"><?php echo _lang("Setting management");?></h3>
			<div id="divContent" class="form-horizontal">
				<?php
					$sql = "select * from ua_setting ";
					$setting = $db->queryArray($sql);
					for ( $i = 0 ; $i < count( $setting ) ; $i ++)
					{
				?>
				<div class="control-group">
				    <label class="control-label" id="settingLabel"><?php echo $setting[$i]['ua_code_label'];?><span class="required">*</span></label>
				    <div class="controls">
				    	<input type="text" id="settingCodeValue"  placeholder="Blog Title" value="<?php echo $setting[$i]['ua_code_value']?>">
				    	<input type="text" id="settingDescription" style="margin-left:20px;width:280px;" placeholder="Setting Description" value="<?php echo $setting[$i]['ua_code_description'];?>">
						<input type="hidden" id="settingCode" value="<?php echo $setting[$i]['ua_code']?>">
					</div>
				</div>				
				<?php 
					}
				?>
				<div style="text-align:center;">
					<a href="#" onclick="onUaSettingSave()" class="btn btn-primary"><?php echo _lang("Save")?></a>&nbsp;&nbsp;&nbsp;									
				</div>
			</div>
		</div>		
		<div class="clearboth"></div>
		<?php require_once("footer.php"); ?>
	</div>
</body>
</html>