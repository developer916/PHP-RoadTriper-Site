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
    	$pageType = "1";
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
    <script src="/js/admin/userDetail.js"></script>        
</head>
<body>
	<div id="container">
		<?php require_once("top.php"); ?>
		<?php require_once("leftMenu.php"); ?>
		<div id="content" class="floatleft">
			<h3 class="pageHeader"><?php echo _lang("User Management")?></h3>
			<div id="divContent" class="form-horizontal">
				<input type="hidden" id="userId" value="<?php echo $userId?>" />
				<div class="control-group">
				    <label class="control-label">User Name<span class="required">*</span></label>
				    <div class="controls"><input type="text" id="userName" placeholder="User Name" value="<?php echo $dataUser['ua_username']?>"></div>
				</div>
				<?php if( $userId != "" ){?>
				<div class="control-group" style="display:block">
				    <label class="control-label">&nbsp;</label>
				    <label class="checkbox">
      					<input type="checkbox" id="chkPassword" onclick="onClickPasswordChange( this )"> Password Change
    				</label>
				</div>
				
				<div class="control-group hide" id="divPassword">
				    <label class="control-label">Current Password<span class="required">*</span></label>
				    <div class="controls"><input type="password" id="currentPassword" placeholder="Current Password"></div>
				</div>
				
				<div class="control-group hide" id="divPassword">
				    <label class="control-label">New Password<span class="required">*</span></label>
				    <div class="controls"><input type="password" id="newPassword" placeholder="New Password"></div>
				</div>

				<div class="control-group hide" id="divPassword">
				    <label class="control-label">Confirm Password<span class="required">*</span></label>
				    <div class="controls"><input type="password" id="confirmPassword" placeholder="Confirm Password"></div>
				</div>				
				<?php }else{ ?>
				<div class="control-group" id="divPassword">
				    <label class="control-label">New Password<span class="required">*</span></label>
				    <div class="controls"><input type="password" id="newPassword" placeholder="New Password"></div>
				</div>
				<?php }?>
				<div class="control-group">
				    <label class="control-label">Email Address<span class="required">*</span></label>
				    <div class="controls"><input type="text" id="email" placeholder="Email Address" value="<?php echo $dataUser['ua_email']?>"></div>
				</div>
				
				<div class="control-group" style="display:block">
				    <label class="control-label">Photo</label>
				    <div class="controls">
						<form id="imageForm" method="post" enctype="multipart/form-data" action='/async-uploadImage.php'>
							<input type="file" name="imageUpload" id="imageUpload"/>
							<input type="hidden" name="uploadType" value="profile">
							<input type="hidden" id="imagePrevDiv" value="previewProfileImage">
							<div id="previewProfileImage" class="previewImage">
								<img src="<?php echo $dataUser['ua_photo'];?>" style="width:100%;height: 100%;"/>
							</div>
						</form>
				    </div>
				</div>
				
				<!-- div class="control-group">
				    <label class="control-label">User Type<span class="required">*</span></label>
				    <div class="controls">
				    	<select id="userType">
				    		<option value="">Please Select</option>
				    		<option value="N" <?php if( $dataUser['ua_user_type'] == "N" ) echo "selected"?>>Normal User</option>
				    		<option value="B" <?php if( $dataUser['ua_user_type'] == "B" ) echo "selected"?>>Bussiness</option>
				    	</select>
				    </div>
				</div -->
				<input type="hidden" id="userType" value="N">
				<?php if( $userId != ""){?>
				<div class="control-group" style="display:block">
				    <label class="control-label">Balance Amount</label>
				    <div class="controls">
				    	<input type="text" id="balanceAmount" placeholder="Balance Amount" value="<?php echo $dataUser['ua_balance_amount']?>" readonly style="background: #fff;">
				    </div>
				</div>
				<?php }?>
				
				<div class="control-group">
				    <label class="control-label">Admin Y/N<span class="required">*</span></label>
				    <div class="controls">
				    	<select id="adminYn">
				    		<option value="">Please Select</option>
				    		<option value="Y" <?php if( $dataUser['ua_admin'] == "Y" ) echo "selected"?>>Yes</option>
				    		<option value="N" <?php if( $dataUser['ua_admin'] == "N" ) echo "selected"?>>No</option>
				    	</select>
				    </div>
				</div>
				
				<div style="margin-left: 230px;">
					<a href="#" onclick="onUserSave()" class="btn btn-primary">Save</a>&nbsp;&nbsp;&nbsp;
					<a href="userList.php" class="btn btn-danger">List</a>				
				</div>
			</div>
		</div>
		<div class="clearboth"></div>
		<?php require_once("footer.php"); ?>
	</div>
</body>
</html>