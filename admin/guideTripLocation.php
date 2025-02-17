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
    	$guidetripId = $_GET['sid'];
    	
    		if( isset($_GET['tid']) ){
			
					$guidetripLocationId = $_GET['tid'];
					$sql = "select * from ua_trip_location where ua_trip_location = '$guidetripLocationId' and ua_trip_type='G'";
					$guidetripLocation = $db->queryArray( $sql );
				    $guidetripLocation=$guidetripLocation[0];
				    
				    $sql="select ua_location_title from ua_location where ua_location='".$guidetripLocation['ua_location']."'";
				    $dataLocation=$db->queryArray($sql);
				    $dataLocation=$dataLocation[0];
					}
			else{
			$guidetripLocationId = "";
			
				}
		
			

	 ?>
    <link rel="stylesheet" type="text/css" href="http://www.datatables.net/media/blog/bootstrap_2/DT_bootstrap.css">
    <script src="/js/jquery.dataTables.js"></script>
    <script src="/js/DT_bootstrap.js"></script>
    <script src="/js/admin/guideDetailList.js"></script>        
    <script src="/js/admin/guideTripLocation.js"></script>      

    </head>
<body>
 
		<?php 				 
				 $sql="select ua_location_ind from ua_trip_location where ua_trip='".$guidetripId."' and ua_trip_type='G' order by ua_location_ind DESC";
			
				  $indexLocation=$db->queryArray($sql);
				  
				  $indexLocation=$indexLocation[0]['ua_location_ind'];
				  if($guidetripLocationId=="")
				  {
				  	$maxinput=$indexLocation+1;
				  }
				  else 
				  {$maxinput=$indexLocation;}
				  $previousind=$guidetripLocation['ua_location_ind'];
			?>
	<div id="container">
		<?php require_once("top.php"); ?>
		<?php require_once("leftMenu.php"); ?>
		
		<div id="content" class="floatleft">
			<h3 class="pageHeader"><?php echo _lang("Guide Management");?></h3>
		
			<div id="divContent" class="form-horizontal">
				<input type = "hidden" id="tripId" value="<?php echo $guidetripId?>" />
				<input type = "hidden" id="tripLocationId" value="<?php echo $guidetripLocationId;?>"/>
				<input type = "hidden" id="previousind" value=<?php  echo $previousind;?>>
				<div class="control-group">
				    <label class="control-label" for="location">Trip Location<span class="required">*</span></label>
				    <div class="controls"><input type="text" id="location" placeholder="Trip Location" value="<?php echo $dataLocation['ua_location_title']?>"></div>
				</div>	
				<div class="control-group">
				    <label class="control-label">Trip Location Index<span class="required">*</span></label>
				    <div class="controls"><input type="text" id="locationind" placeholder="Trip Location Index" value="<?php if($guidetripLocationId=="") {echo $maxinput; } else { echo $guidetripLocation['ua_location_ind'];}?>"></div>
				</div>
				<input type="hidden" id="locationId" value="<?php echo $guidetripLocation['ua_location'] ?>"/>	
				<input type = "hidden" id="maxinput" value="<?php echo  $maxinput?>"/>
				
				<div style="margin-left: 230px;">
					<a href="#" onclick="ontriplocationSave()" class="btn btn-primary">Save</a>&nbsp;&nbsp;&nbsp;
					<a href="guideTripListDetail.php?id=<?php echo $guideId?>&sid=<?php echo $guidetripId?>" class="btn btn-danger">List</a>				
				</div>
			</div>
			

		</div>		
	
		
		<div class="clearboth"></div>
		<?php require_once("footer.php"); ?>
	</div>
</body>
</html>
