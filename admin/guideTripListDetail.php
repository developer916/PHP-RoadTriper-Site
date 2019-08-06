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
    	$guideId = $_GET['id'];
        	if( isset($_GET['sid']) ){
    
			$guideTripId = $_GET['sid'];
			
			$sql = "select * from ua_guide_trip where ua_guide_trip = '$guideTripId'";
			$dataguidetrip = $db->queryArray( $sql );
			$dataguidetrip = $dataguidetrip[0];
		
			$sql="select * from ua_trip_location where ua_trip ='$guideTripId' and ua_trip_type= 'G' order by ua_location_ind";
			$dataguidelocation=$db->queryArray($sql);
			
		}else{
			$guideTripId = "";
	
		}
		
    ?>
    <link rel="stylesheet" type="text/css" href="http://www.datatables.net/media/blog/bootstrap_2/DT_bootstrap.css">
    <script src="/js/jquery.dataTables.js"></script>
    <script src="/js/DT_bootstrap.js"></script>
    <script src="/js/admin/guideDetailList.js"></script>
     <script src="/js/admin/guideList.js"></script>
</head>
<body>

	<div id="container">
		<?php require_once("top.php"); ?>
		<?php require_once("leftMenu.php"); ?>
		<div id="content" class="floatleft">
			<h3 class="pageHeader"><?php echo _lang("Guide Management");?></h3>
			<div id="divContent" class="form-horizontal">
				<input type = "hidden" id="guideId" value="<?php echo $guideId?>" />
				<input type = "hidden" id="guidetripId" value="<?php echo $guideTripId?>"/>
				<div class="control-group">
				    <label class="control-label">Trip Name<span class="required">*</span></label>
				    <div class="controls"><input type="text" id="tripname" placeholder="Trip Name" value="<?php echo $dataguidetrip['ua_trip_title']?>"></div>
				</div>
				<div style="margin-left: 230px;">
					<a href="#" onclick="onguidetripSave()" class="btn btn-primary">Save</a>&nbsp;&nbsp;&nbsp;
					<a href="guideListDetail.php?id=<?php echo $guideId?>" class="btn btn-danger">List</a>				
				</div>
				
			</div>
			<?php if ($guideTripId!=""){?>
			 <h3 class="pageHeader" ><?php echo _lang("Trip Location List");?></h3>
			 <div id="divContent" class="guide_trip ">
				<div id="divActionButton" style="float:right; margin-bottom:20px;">
					<a href = "guideTripLocation.php?id=<?php echo $guideId?>&sid=<?php echo $guideTripId?>" class="btn btn-primary"><?php echo _lang("Add");?></a>
					<a class="btn btn-danger" onclick="onDeleteTripLocation()"><?php echo _lang("Delete");?></a>
				</div>
				<div class="clearboth"></div>
						<table class="table table-striped table-bordered table-hover" id="example">
						<thead>
							<tr>
								<th></th>
								<th><?php echo _lang("No")?></th>
							
								<th><?php echo _lang("Trip Location")?></th>
								<th><?php echo _lang("Trip Location Index")?></th>
							    <th><?php echo _lang("Created Time")?></th>
							    <th><?php echo _lang("Updated Time")?></th>
							</tr>				
						</thead>
						<tbody>
							<?php
						
							for( $i = 0; $i < count($dataguidelocation); $i ++ ){
								$sql="select ua_location_title from ua_location where ua_location='".$dataguidelocation[$i]['ua_location']."'";
								$dataLocation=$db->queryArray($sql);
								
										echo "<tr>";
										echo "<td><input type='checkbox' value='".$dataguidelocation[$i]['ua_trip_location']."'/></td>";
										echo "<td>".($i + 1)."</a></td>";
										echo "	<td><a href='guideTripLocation.php?id=".$guideId."&sid=".$guideTripId."&tid=".$dataguidelocation[$i]['ua_trip_location']."'>".$dataLocation[0]['ua_location_title']."</a></td>";
										echo "	<td><a href='guideTripLocation.php?id=".$guideId."&sid=".$guideTripId."&tid=".$dataguidelocation[$i]['ua_trip_location']."'>".$dataguidelocation[$i]['ua_location_ind']."</a></td>";
										echo "	<td><a href='guideTripLocation.php?id=".$guideId."&sid=".$guideTripId."&tid=".$dataguidelocation[$i]['ua_trip_location']."'>".$dataguidelocation[$i]['ua_created_time']."</a></td>";
										echo "	<td><a href='guideTripLocation.php?id=".$guideId."&sid=".$guideTripId."&tid=".$dataguidelocation[$i]['ua_trip_location']."'>".$dataguidelocation[$i]['ua_updated_time']."</a></td>";
										echo "</tr>";
										
							}				 
							?>
						</tbody>
					</table>			
			<?php }?>
				</div>	
			
	</div>
		
		<div class="clearboth"></div>
	<?php require_once("footer.php"); ?>
	</div>
</body>
</html>