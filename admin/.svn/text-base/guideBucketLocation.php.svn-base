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
    	$pageType = "3";
    	UA_isPermission( $pageType );
    	$guideId=$_GET['id'];
    	$guidebucketId = $_GET['sid'];
    	
    		if( isset($_GET['tid']) ){
			
					$guidebucketLocationId = $_GET['tid'];
					$sql = "select * from ua_bucket_location where ua_bucket_location = '$guidebucketLocationId' and ua_bucket_type='G' ";
					$guideBucketLocation = $db->queryArray( $sql );
				    $guideBucketLocation=$guideBucketLocation[0];
				    
				    $sql="select ua_location_title from ua_location where ua_location='".$guideBucketLocation['ua_location']."'";
				    $dataLocation=$db->queryArray($sql);
				    $dataLocation=$dataLocation[0];
					}
			else{
			$guidebucketLocationId = "";
				}
		
		
    ?>
    <link rel="stylesheet" type="text/css" href="http://www.datatables.net/media/blog/bootstrap_2/DT_bootstrap.css">
    <script src="/js/jquery.dataTables.js"></script>
    <script src="/js/DT_bootstrap.js"></script>
    <script src="/js/admin/guideDetailList.js"></script>    
    <script src="/js/admin/guideTripLocation.js"></script>    
</head>
<body>

	<div id="container">
		<?php require_once("top.php"); ?>
		<?php require_once("leftMenu.php"); ?>
		<div id="content" class="floatleft">
			<h3 class="pageHeader"><?php echo _lang("Guide Management");?></h3>
			<div id="divContent" class="form-horizontal">
				<input type = "hidden" id="bucketId" value="<?php echo $guidebucketId?>" />
				<input type = "hidden" id="bucketLocationId" value="<?php echo $guidebucketLocationId?>"/>
					<input type="hidden" id="locationId" value="<?php echo $guideBucketLocation['ua_location'] ?>"/>	
								
				<div class="control-group">
				    <label class="control-label">Bucket Location<span class="required">*</span></label>
				    <div class="controls"><input type="text" id="location" placeholder="Bucket Location" value="<?php echo $dataLocation['ua_location_title']?>"></div>
				</div>	
				
				
				<div style="margin-left: 230px;">
					<a href="#" onclick="onBucketLocationSave()" class="btn btn-primary">Save</a>&nbsp;&nbsp;&nbsp;
					<a href="guideBucketListDetail.php?id=<?php echo $guideId?>&sid=<?php echo $guidebucketId?>" class="btn btn-danger">List</a>				
				</div>
			</div>
			

		</div>		
	
		
		<div class="clearboth"></div>
		<?php require_once("footer.php"); ?>
	</div>
</body>
</html>
