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
    	if( isset($_GET['id']) ){
			$guideId = $_GET['id'];
			
			$sql = "select * from ua_guide where ua_guide = $guideId";
			$dataguide = $db->queryArray( $sql );
			$dataguide = $dataguide[0];
			
			$sql = "select * from ua_guide_trip where ua_guide = $guideId";
			$dataguidetrip = $db->queryArray( $sql );
			
			$sql = "select * from ua_guide_bucket where ua_guide = $guideId";
			$dataguidebucket = $db->queryArray( $sql );
			
			
		}else{
			$guideId = "";
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
				<input type="hidden" id="guideId" value="<?php echo $guideId?>" />
				<div class="control-group">
				    <label class="control-label"><?php echo _lang("Guide Name")?><span class="required">*</span></label>
				    <div class="controls"><input type="text" id="guideName" placeholder="Guide Name" value="<?php echo $dataguide['ua_guide_title']?>"></div>
				</div>
				
				<div style="margin-left: 230px;">
					<a href="#" onclick="onGuidesave()" class="btn btn-primary"><?php echo _lang("Save")?></a>&nbsp;&nbsp;&nbsp;
					<a href="guideList.php" class="btn btn-danger"><?php echo _lang("List")?></a>				
				</div>
			</div>
			
			<?php if($guideId !="") {?>
			<h3 class="pageHeader" ><?php echo _lang("Trip List");?></h3>
			<div id="divContent" class="guide_trip ">
				<div id="divActionButton" style="float:right; margin-bottom:20px;">
					<a href = "guideTripListDetail.php?id=<?php echo $guideId?>" class="btn btn-primary"><?php echo _lang("Add");?></a>
					<a class="btn btn-danger" onclick="onDeleteTrip()"><?php echo _lang("Delete");?></a>
				</div>
				<div class="clearboth"></div>
				<table class="table table-striped table-bordered table-hover" id="example">
						<thead>
							<tr>
								<th></th>
								<th><?php echo _lang("No")?></th>
								<th><?php echo _lang("Name")?></th>
							    <th><?php echo _lang("Created Time")?></th>
							    <th><?php echo _lang("Updated Time")?></th>
							</tr>				
						</thead>
						<tbody>
							<?php
							
							for( $i = 0; $i < count($dataguidetrip); $i ++ ){
								echo "<tr>";
								echo "<td><input type='checkbox' value='".$dataguidetrip[$i]['ua_guide_trip']."'/></td>";
								echo "<td>".($i + 1)."</a></td>";
								echo "	<td><a href='guideTripListDetail.php?id=".$dataguidetrip[$i]['ua_guide']."&sid=".$dataguidetrip[$i]['ua_guide_trip']."'>".$dataguidetrip[$i]['ua_trip_title']."</a></td>";
								echo "	<td><a href='guideTripListDetail.php?id=".$dataguidetrip[$i]['ua_guide']."&sid=".$dataguidetrip[$i]['ua_guide_trip']."'>".$dataguidetrip[$i]['ua_created_time']."</a></td>";
								echo "	<td><a href='guideTripListDetail.php?id=".$dataguidetrip[$i]['ua_guide']."&sid=".$dataguidetrip[$i]['ua_guide_trip']."'>".$dataguidetrip[$i]['ua_updated_time']."</a></td>";
								echo "</tr>";
							}				 
							?>
						</tbody>
					</table>			
				
			</div>
			
		
			<h3 class="pageHeader" style="margin-top:100px;"><?php echo _lang("Bucket List");?></h3>
			<div id="divContent" class="guid_bucket ">
				<div id="divActionButton" style="float:right;margin-bottom:20px;">
					<a href = "guideBucketListDetail.php?id=<?php echo $guideId?>" class="btn btn-primary"><?php echo _lang("Add");?></a>
					<a class="btn btn-danger" onclick="onDeleteBucket()"><?php echo _lang("Delete");?></a>
				</div>
				<div class="clearboth"></div>
				<table class="table table-striped table-bordered table-hover" id="example1">
						<thead>
							<tr>
								<th></th>
								<th><?php echo _lang("No")?></th>
								<th><?php echo _lang("Name")?></th>
							    <th><?php echo _lang("Created Time")?></th>
							    <th><?php echo _lang("Updated Time")?></th>
							</tr>				
						</thead>
						<tbody>
							<?php
							
							for( $i = 0; $i < count($dataguidebucket); $i ++ ){
								echo "<tr>";
								echo "<td><input type='checkbox' value='".$dataguidebucket[$i]['ua_guide_bucket']."'/></td>";
								echo "<td>".($i + 1)."</a></td>";
								echo "	<td><a href='guideBucketListDetail.php?id=".$dataguidebucket[$i]['ua_guide']."&sid=".$dataguidebucket[$i]['ua_guide_bucket']."'>".$dataguidebucket[$i]['ua_bucket_title']."</a></td>";
								echo "	<td><a href='guideBucketListDetail.php?id=".$dataguidebucket[$i]['ua_guide']."&sid=".$dataguidebucket[$i]['ua_guide_bucket']."'>".$dataguidebucket[$i]['ua_created_time']."</a></td>";
								echo "	<td><a href='guideBucketListDetail.php?id=".$dataguidebucket[$i]['ua_guide']."&sid=".$dataguidebucket[$i]['ua_guide_bucket']."'>".$dataguidebucket[$i]['ua_updated_time']."</a></td>";
								echo "</tr>";
							}				 
							?>
						</tbody>
					</table>			
				
			</div>
		
		<?php }?>
		</div>
		
		
		<div class="clearboth"></div>
		<?php require_once("footer.php"); ?>
	</div>
</body>
</html>