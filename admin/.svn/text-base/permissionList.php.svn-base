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
    	$pageType = "16";
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
			<h3 class="pageHeader"><?php echo _lang("Permission Management")?></h3>
			<div id="divContent">
				<div class="clearboth"></div>			
				<table class="table table-striped table-bordered table-hover" id="example">
					<thead>
						<tr>
							<th><Br>No</th>
							<th><Br>Username</th>
							<th><Br>Email</th>
							<th><Br>Photo</th>
							<th>Permissions</th>
						</tr>
					</thead>
					<tbody>
						<?php
						$sql = "select * from ua_user where ua_admin = 'Y'";
						$result = $db->queryArray( $sql );
						for( $i = 0; $i < count($result); $i ++ ){
							echo "<tr>";
							echo "<td><a href='permissionDetail.php?id=".$result[$i]['ua_user']."'>".($i + 1)."</a></td>";
							echo "<td><a href='permissionDetail.php?id=".$result[$i]['ua_user']."'>".$result[$i]['ua_username']."</a></td>";
							echo "<td><a href='permissionDetail.php?id=".$result[$i]['ua_user']."'>".$result[$i]['ua_email']."</a></td>";
							echo "<td><img style='width:50px; height: 50px;' src='".$result[$i]['ua_photo']."'/></td>";
							echo "<td>";
							$sql = "select *
    								  from ua_user_menu 
    								 where ua_user = ".$result[$i]['ua_user'];
							$permissionList = $db->queryArray( $sql );
							echo count($permissionList)." Menus";
							echo "</td>";
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