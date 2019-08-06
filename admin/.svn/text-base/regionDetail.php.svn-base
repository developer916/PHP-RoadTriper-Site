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
    	$pageType = "12";
    	UA_isPermission( $pageType );

    	if( isset($_GET['id']) ){
			
			$regionId = $_GET['id'];
			$sql = "select * from ua_region where ua_region = '$regionId'";
			$dataRegion = $db->queryArray( $sql );
			$dataRegion = $dataRegion[0];
		
			
		}else{
			$regionId = "";
	
		}
    ?>
    <link rel="stylesheet" type="text/css" href="http://www.datatables.net/media/blog/bootstrap_2/DT_bootstrap.css">
    <script src="/js/jquery.dataTables.js"></script>
    <script src="/js/DT_bootstrap.js"></script>
    
    <script src="/js/admin/regionDetail.js"></script>        
</head>
<body>
	<div id="container">
		<?php require_once("top.php"); ?>
		<?php require_once("leftMenu.php"); ?>
		<div id="content" class="floatleft">
			<h3 class="pageHeader"><?php echo _lang("Region Detail");?></h3>
			<div id="divContent" class="form-horizontal">
				<input type = "hidden" id="regionId" value="<?php echo $regionId?>" />
				<div class="control-group" style="display:block;">
				    <label class="control-label" ><?php echo _lang("Region Title");?><span class="required">*</span></label>
				    <div class="controls" style="margin-left:20px;float:left;"><input type="text" style="width:420px;" id="regionTitle" placeholder="Region Title" value='<?php echo $dataRegion['ua_title'];?>'></div>
				</div>
				<div class="control-group" style="display:block;">
				    <label class="control-label" ><?php echo _lang("Region Description");?></label>
				    <div class="controls" style="margin-left:20px;float:left;"><textarea rows="5" id="regionDescription" placeholder="Region Description" style="width: 420px" ><?php echo $dataRegion['ua_description'];?></textarea></div>
				</div>	
				<div class="control-group" style="display:block;">
				    <label class="control-label"><?php echo _lang("Region Code");?></label>
					<div class="controls" style="margin-left:20px;float:left;"><input type="text" style="width:420px;" id="regionOrder" placeholder="Region Order" value='<?php echo $dataRegion['ua_order'];?>'></div>				    
				</div>
				<div class="control-group" style="display:block;">
				    <label class="control-label">Region Order</label>
					<div class="controls" style="margin-left:20px;float:left;"><textarea rows="7" id="regionCode" placeholder="Region Code" style="width: 420px" ><?php echo $dataRegion['ua_code'];?></textarea></div>				    
				</div>				
				<div style="margin-left: 230px;">
					<a href="#" onclick="onRegionSave()" class="btn btn-primary"><?php echo _lang("Save")?></a>&nbsp;&nbsp;&nbsp;
					<a href="regionList.php" class="btn btn-danger"><?php echo _lang("List"); ?></a>				
				</div>
			</div>
		</div>		
		<div class="clearboth"></div>
		<?php require_once("footer.php"); ?>
	</div>
</body>
</html>