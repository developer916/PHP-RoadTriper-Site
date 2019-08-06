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
    <?php $pageType = "1";?>
    <?php UA_isPermission( $pageType ); ?>
    <link rel="stylesheet" type="text/css" href="http://www.datatables.net/media/blog/bootstrap_2/DT_bootstrap.css">
    <script src="/js/jquery.dataTables.js"></script>
    <script src="/js/DT_bootstrap.js"></script>
    
    <script src="/js/admin/userList.js"></script>        
</head>
<body>
	<div id="container">
		<?php require_once("top.php"); ?>
		<?php require_once("leftMenu.php"); ?>
		<div id="content" class="floatleft">
			<h3 class="pageHeader"><?php echo _lang("User Management")?></h3>
			<div id="divContent">
				<div id="divActionButton" style="float:right;margin-bottom:20px;">
					<a href = "userDetail.php" class="btn btn-primary"><?php echo _lang("Add");?></a>
					<a class="btn btn-danger" onclick="onDeleteUser()"><?php echo _lang("Delete");?></a>
				</div>
				<div class="clearboth"></div>			
				<table class="table table-striped table-bordered table-hover" id="example">
					<thead>
						<tr>
							<th></th>
							<th><Br>No</th>
							<th><Br>Username</th>
							<th><Br>Email</th>
							<th><Br>Photo</th>
							<!-- th>User<Br>Type</th -->
							<th>Admin<Br>Y/N</th>
							<th>Created<br>Date</th>
						</tr>
					</thead>
					<tbody>
						<?php
						$sql = "select * from ua_user";
						$result = $db->queryArray( $sql );
						for( $i = 0; $i < count($result); $i ++ ){
							echo "<tr>";
							echo "<td><input type='checkbox' value='".$result[$i]['ua_user']."'/></td>";
							echo "<td><a href='userDetail.php?id=".$result[$i]['ua_user']."'>".($i + 1)."</a></td>";
							echo "<td><a href='userDetail.php?id=".$result[$i]['ua_user']."'>".$result[$i]['ua_username']."</a></td>";
							echo "<td><a href='userDetail.php?id=".$result[$i]['ua_user']."'>".$result[$i]['ua_email']."</a></td>";
							echo "<td><img style='width:50px; height: 50px;' src='".$result[$i]['ua_photo']."'/></td>";
							// echo "<td>".($result[$i]['ua_user_type']=="N"?"Normal<br>User":"Business")."</td>";
							echo "<td>".($result[$i]['ua_admin']=="Y"?"Yes":"No")."</td>";
							echo "<td>".substr($result[$i]['ua_created_time'], 0, 10)."</td>";
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