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
    
			$guideBucketId = $_GET['sid'];
			
			$sql = "select * from ua_guide_bucket where ua_guide_bucket = '$guideBucketId'";
			$dataguidebucket = $db->queryArray( $sql );
			$dataguidebucket = $dataguidebucket[0];
		
			$sql="select * from ua_bucket_location where ua_bucket ='$guideBucketId'  and ua_bucket_type='G'";
			$dataguidelocation=$db->queryArray($sql);
			
		}else{
			$guideBucketId = "";
	
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
				<input type = "hidden" id="guideBucketId" value="<?php echo $guideBucketId?>"/>
				<div class="control-group">
				    <label class="control-label">Bucket Name<span class="required">*</span></label>
				    <div class="controls"><input type="text" id="bucketname" placeholder="Bucket Name" value="<?php echo $dataguidebucket['ua_bucket_title']?>"></div>
				</div>
				<div style="margin-left: 230px;">
					<a href="#" onclick="onguideBucketSave()" class="btn btn-primary">Save</a>&nbsp;&nbsp;&nbsp;
					<a href="guideListDetail.php?id=<?php echo $guideId?>" class="btn btn-danger">List</a>				
				</div>
				
			</div>
			<?php if ($guideBucketId!=""){?>
			 <h3 class="pageHeader" ><?php echo _lang("Bucket Location List");?></h3>
			 <div id="divContent" class="guide_trip ">
				<div id="divActionButton" style="float:right; margin-bottom:20px;">
					<a href = "guideBucketLocation.php?id=<?php echo $guideId?>&sid=<?php echo $guideBucketId?>" class="btn btn-primary"><?php echo _lang("Add");?></a>
					<a class="btn btn-danger" onclick="onDeleteBucketLocation()"><?php echo _lang("Delete");?></a>
				</div>
				<div class="clearboth"></div>
						<table class="table table-striped table-bordered table-hover" id="example">
						<thead>
							<tr>
								<th></th>
								<th><?php echo _lang("No")?></th>
							
								<th><?php echo _lang("Bucket Location")?></th>
								
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
								echo "<td><input type='checkbox' value='".$dataguidelocation[$i]['ua_bucket_location']."'/></td>";
								echo "<td>".($i + 1)."</a></td>";
								
								echo "	<td><a href='guideBucketLocation.php?id=".$guideId."&sid=".$guideBucketId."&tid=".$dataguidelocation[$i]['ua_bucket_location']."'>".$dataLocation[0]['ua_location_title']."</a></td>";
								
								echo "	<td><a href='guideBucketLocation.php?id=".$guideId."&sid=".$guideBucketId."&tid=".$dataguidelocation[$i]['ua_bucket_location']."'>".$dataguidelocation[$i]['ua_created_time']."</a></td>";
								echo "	<td><a href='guideBucketLocation.php?id=".$guideId."&sid=".$guideBucketId."&tid=".$dataguidelocation[$i]['ua_bucket_location']."'>".$dataguidelocation[$i]['ua_updated_time']."</a></td>";
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