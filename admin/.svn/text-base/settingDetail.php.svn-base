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
    	if( isset($_GET['id']) ){
			$settingId = $_GET['id'];
			$sql = "select * from ua_setting where ua_setting = $settingId";
			$dataSetting = $db->queryArray( $sql );
			$dataSetting = $dataSetting[0];
		}else{
			$settingId = "";
		}
    ?>
    <link rel="stylesheet" type="text/css" href="http://www.datatables.net/media/blog/bootstrap_2/DT_bootstrap.css">
    <script src="/js/jquery.dataTables.js"></script>
    <script src="/js/DT_bootstrap.js"></script>
    <script src="/js/admin/settingDetail.js"></script>        
</head>
<body>
	<div id="container">
		<?php require_once("top.php"); ?>
		<?php require_once("leftMenu.php"); ?>
		<div id="content" class="floatleft">
			<h3 class="pageHeader"><?php echo _lang("Setting Management")?></h3>
			<div id="divContent" class="form-horizontal">
				<input type="hidden" id="settingId" value="<?php echo $settingId?>" />
				
				<div class="control-group" style="display:block;">
				    <label class="control-label">Code<span class="required">*</span></label>
				    <div class="controls">
				    	<input type="text" id="code" placeholder="Code" value="<?php echo $dataSetting['ua_code']?>" style="width:90%;">
				    </div>
				</div>

				<div class="control-group" style="display:block;">
				    <label class="control-label">Value<span class="required">*</span></label>
				    <div class="controls">
				    	<input type="text" id="value" placeholder="Value" value="<?php echo $dataSetting['ua_code_value']?>" style="width:90%;">
				    </div>
				</div>				

				<div class="control-group" style="display:block;">
				    <label class="control-label">Description</label>
				    <div class="controls">
				    	<textarea id="description" placeholder="Description" style="width:90%;" rows="4"><?php echo $dataSetting['ua_code_description']?></textarea>
				    </div>
				</div>
				<div class="control-group" style="display:block;">
				    <label class="control-label"></label>
				    <div class="controls" style="text-align:center;">
				    	<a href="#" onclick="onSettingSave()" class="btn btn-primary">Save</a>&nbsp;&nbsp;&nbsp;
						<a href="settingList.php" class="btn btn-danger">List</a>
				    </div>
				</div>				

			</div>
		</div>
		<div class="clearboth"></div>
		<?php require_once("footer.php"); ?>
	</div>
</body>
</html>