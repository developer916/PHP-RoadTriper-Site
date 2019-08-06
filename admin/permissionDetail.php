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
    	if( isset($_GET['id']) ){
			$userId = $_GET['id'];
			$sql = "select * from ua_user where ua_user = $userId";
			$dataUser = $db->queryArray( $sql );
			$dataUser = $dataUser[0];
		}else{
			$userId = "";
		}
    ?>
    <link rel="stylesheet" type="text/css" href="http://www.datatables.net/media/blog/bootstrap_2/DT_bootstrap.css">
    <script src="/js/jquery.dataTables.js"></script>
    <script src="/js/DT_bootstrap.js"></script>
    <script src="/js/admin/permissionDetail.js"></script>        
</head>
<body>
	<div id="container">
		<?php require_once("top.php"); ?>
		<?php require_once("leftMenu.php"); ?>
		<div id="content" class="floatleft">
			<h3 class="pageHeader">Permission Management</h3>
			<div id="divContent" class="form-horizontal">
				<input type="hidden" id="userId" value="<?php echo $userId?>" />
				<div class="control-group">
				    <label class="control-label">User Name</label>
				    <div class="controls"><input type="text" value="<?php echo $dataUser['ua_username']?>" readonly style="background:#FDFDFD; cursor:pointer;"></div>
				</div>
				<div class="control-group">
				    <label class="control-label">Email Address</label>
				    <div class="controls"><input type="text" value="<?php echo $dataUser['ua_email']?>" readonly style="background:#FDFDFD; cursor:pointer;"></div>
				</div>				
				<hr>
				<h4>Select Menus to Grant the Permission</h4>
				<table id="menuList" class="table table-striped table-bordered table-hover">
					<tr>
						<th style="text-align:center;"><input type="checkbox" onclick="onCheckAll(this)"></th>
						<th style="text-align:center;">No</th>
						<th style="text-align:center;">Title</th>
					</tr>
					<?php
					$sql = "
						select t1.ua_menu, t1.ua_title, t1.ua_order, if( ifnull( t2.ua_menu, 0) = 0, 0, 1) ua_selected
						  from ua_menu t1
						  left join ua_user_menu t2 on t1.ua_menu = t2.ua_menu and t2.ua_user = $userId
						 order by t1.ua_order";
					$menuList = $db->queryArray( $sql );
					for( $i = 0 ; $i < count( $menuList ); $i++ ){ ?>
					<tr>
						<td style="text-align:center;"><input type="checkbox" id="menuId" value="<?php echo $menuList[$i]['ua_menu']?>" <?php if( $menuList[$i]['ua_selected'] == '1') echo "checked"; ?>/></td>
						<td style="text-align:center;"><?php echo $i + 1;?></td>
						<td><?php echo $menuList[$i]['ua_title']?></td>
					</tr>
						
					<?php } ?>
				</table>
				<div style="text-align:center;">
					<a href="#" onclick="onPermissionSave()" class="btn btn-primary">Save</a>&nbsp;&nbsp;&nbsp;
					<a href="permissionList.php" class="btn btn-danger">List</a>				
				</div>
			</div>
		</div>
		<div class="clearboth"></div>
		<?php require_once("footer.php"); ?>
	</div>
</body>
</html>