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
    	$pageType = "8";
    	UA_isPermission( $pageType );
    	if( isset($_GET['id']) ){
			$pageId = $_GET['id'];
			$sql = "select * from ua_page where ua_page = $pageId";
			$dataPage = $db->queryArray( $sql );
			$dataPage = $dataPage[0];
		}else{
			$pageId = "";
		}
    ?>
    <link rel="stylesheet" type="text/css" href="http://www.datatables.net/media/blog/bootstrap_2/DT_bootstrap.css">
    <script src="/js/jquery.dataTables.js"></script>
    <script src="/js/DT_bootstrap.js"></script>
    <script src="/js/admin/pageDetail.js"></script>
    
    <script src="/texteditor/scripts/innovaeditor.js" type="text/javascript"></script>
	<script src="/texteditor/scripts/innovamanager.js" type="text/javascript"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js" type="text/javascript"></script>
	<script src="/texteditor/scripts/common/webfont.js" type="text/javascript"></script>
	    
</head>
<body>
	<div id="container">
		<?php require_once("top.php"); ?>
		<?php require_once("leftMenu.php"); ?>
		<div id="content" class="floatleft">
			<h3 class="pageHeader"><?php echo _lang("Page Management")?></h3>
			<input id="userId" type="hidden" value="<?php echo $_SESSION['UA_ADMIN_USER'];?>" />
			<div id="divContent" class="form-horizontal">
				<input type="hidden" id="pageId" value="<?php echo $pageId?>" />
				<textarea id="txtContent" style="display:none;"><?php echo $dataPage['ua_content']; ?></textarea>
				<div class="control-group">
				    <label class="control-label" style="width: 70px;">Title</label>
				    <div class="controls" style="margin-left: 80px;">
				    	<input type="text" id="pageTitle" placeholder="Page Title" value="<?php echo $dataPage['ua_title']?>" style="width: 600px;">
				    </div>
				</div>
				
				<div class="control-group">
				    <label class="control-label" style="width: 70px;">Content</label>
				    <div class="controls" style="margin-left: 80px;">
				    	<textarea style="width: 600px;" id="pageContent"></textarea>
				    </div>
				</div>
				<?php if( $pageId != "" ){?>
				<div class="control-group">
				    <div class="controls" style="margin-left: 80px; color: #aaa; font-size:12px;text-align:right;">
				    	Page Link : 
				    	<?php $pageLink = "http://".HOST_SERVER.$dataPage['ua_unique_link']; ?>
				    	<a href="<?php echo $pageLink?>"><?php echo $pageLink?></a>
				    </div>
				</div>				
				<?php }?>
				
				<div style="margin-left: 320px;">
					<a href="#" onclick="onPageSave()" class="btn btn-primary">Save</a>&nbsp;&nbsp;&nbsp;
					<a href="pageList.php" class="btn btn-danger">List</a>
				</div>
			</div>
		</div>
		<div class="clearboth"></div>
		<?php require_once("footer.php"); ?>
	</div>
</body>
</html>