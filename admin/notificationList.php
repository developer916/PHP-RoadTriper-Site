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
   
</head>
<body>
	<div id="container">
		<?php require_once("top.php"); ?>
		<?php require_once("leftMenu.php"); ?>
		<div id="content" class="floatleft">
			<h3 class="pageHeader"><?php echo _lang("Notification Management")?></h3>
			<div id="divContent">
				<div id="divActionButton" style="float:right;margin-bottom:20px;">
					<a href = "notificationDetail.php" class="btn btn-primary" style="margin-right: 20px;"><?php echo _lang("Add");?></a>
				</div>
				<div class="clearboth"></div>			
				<table class="table table-striped table-bordered table-hover" id="example">
					<thead>
						<tr>
							<th><?php echo _lang("No")?></th>
							<th><?php echo _lang("Content")?></th>
							<th><?php echo _lang("Created Time")?></th>
						</tr>				
					</thead>
					<tbody>
						<?php
						$sql = "select * from ua_notification order by ua_created_time DESC";
						$result = $db->queryArray( $sql );
						for( $i = 0; $i < count($result); $i ++ ){
							echo "<tr>";
							echo "	<td><a href='notificationDetail.php?id=".$result[$i]['ua_notification']."'>".($i + 1)."</a></td>";
							echo "	<td style='width:70%'><a href='notificationDetail.php?id=".$result[$i]['ua_notification']."'>".$result[$i]['ua_content']."</a></td>";
							echo "	<td>".$result[$i]['ua_created_time']."</td>";
							echo "</tr>";
						}
						?>
					</tbody>
				</table>
			</div>
		</div>		
		<div class="clearboth"></div>
		<?php require_once("footer.php"); ?>
	</div>
</body>
</html>