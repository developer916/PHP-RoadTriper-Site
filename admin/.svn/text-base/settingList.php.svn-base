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
    <!-- link rel="stylesheet" type="text/css" href="http://www.datatables.net/media/blog/bootstrap_2/DT_bootstrap.css">
    <script src="/js/jquery.dataTables.js"></script>
    <script src="/js/DT_bootstrap.js"></script  -->
    
    <script src="/js/admin/settingList.js"></script>
        
</head>
<body>
	<div id="container">
		<?php require_once("top.php"); ?>
		<?php require_once("leftMenu.php"); ?>
		<div id="content" class="floatleft">
			<h3 class="pageHeader"><?php echo _lang("Setting Management")?></h3>
			<div id="divContent">
				<div id="divActionButton" style="float:right;margin-bottom:20px;">
					<a href = "settingDetail.php" class="btn btn-primary">Add</a>
					<a class="btn btn-danger" onclick="onDeleteSetting()">Delete</a>
				</div>
				<div class="clearboth"></div>			
				<table class="table table-striped table-bordered table-hover" id="example">
					<thead>
						<tr>
							<th style="width:20px;"></th>
							<th style="width:30px;">No</th>
							<th style="width:50px;">Code</th>
							<th style="width:300px;">Value</th>
							<th>Description</th>
							<th  style="width:70px;">Created Time</th>
						</tr>
					</thead>
					<tbody>
						<?php
						$sql = "select * from ua_setting order by ua_code";
						$settingList = $db->queryArray( $sql );
						for( $i = 0; $i < count($settingList); $i ++ ){
							echo "<tr>";
							echo "<td><input type='checkbox' value='".$settingList[$i]['ua_setting']."'/></td>";
							echo "<td><a href='settingDetail.php?id=".$settingList[$i]['ua_setting']."'>".($i + 1)."</a></td>";
							echo "<td><a href='settingDetail.php?id=".$settingList[$i]['ua_setting']."'>".$settingList[$i]['ua_code']."</a></td>";
							echo "<td><a href='settingDetail.php?id=".$settingList[$i]['ua_setting']."'>".$settingList[$i]['ua_code_value']."</a></td>";
							echo "<td>".$settingList[$i]['ua_code_description']."</td>";
							echo "<td>".$settingList[$i]['ua_created_time']."</td>";
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