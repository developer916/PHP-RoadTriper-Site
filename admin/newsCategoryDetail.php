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
    	$pageType = "10";
    	UA_isPermission( $pageType );
    	if( isset($_GET['id']) ){
			
			$newsCategoryId = $_GET['id'];
			$sql = "select * from ua_news_category where ua_news_category = '$newsCategoryId' ";
			$dataNewsCategory = $db->queryArray( $sql );
			$dataNewsCategory = $dataNewsCategory[0];
			
		}else{
			$newsCategoryId = "";
		}
    ?>
    <link rel="stylesheet" type="text/css" href="http://www.datatables.net/media/blog/bootstrap_2/DT_bootstrap.css">
    <script src="/js/jquery.dataTables.js"></script>
    <script src="/js/DT_bootstrap.js"></script>
    
    <script src="/js/admin/newsCategoryDetail.js"></script>        
</head>
<body>
	<div id="container">
		<?php require_once("top.php"); ?>
		<?php require_once("leftMenu.php"); ?>
		<div id="content" class="floatleft">
			<h3 class="pageHeader"><?php echo _lang("News Category Management");?></h3>
			<div id="divContent" class="form-horizontal">
				<input type = "hidden" id="newsCategoryId" value="<?php echo $newsCategoryId?>" />
				<div class="control-group">
				    <label class="control-label"><?php echo _lang("News Category Title");?><span class="required">*</span></label>
				    <div class="controls"><input type="text" id="newsCategoryTitle" placeholder="News Category Title" value="<?php echo $dataNewsCategory['ua_title']?>" style="width: 400px;"></div>
				</div>
				<div class="control-group">
				    <label class="control-label" style="margin-top:25px;"><?php echo _lang("News Category Image");?><span class="required">*</span></label>
				    <div class="controls">		    	
						<form id="imageForm" method="post" enctype="multipart/form-data" action='/async-uploadImage.php'>
							<input type="file" name="imageUpload" id="imageUpload"/>						
							<input type="hidden" name="uploadType" value="eye">
							<input type="hidden" id="imagePrevDiv" value="previewNewsCategoryImage">
							<div id="previewNewsCategoryImage" class="previewImage">
								<img src="<?php echo $dataNewsCategory['ua_category_image']?>" style="width:100%;height: 100%;"/>
							</div>
						</form>				    	
				    </div>
				</div>
				<div class="control-group">
				    <label class="control-label" style="margin-top:25px;"><?php echo _lang("News Marker Image");?><span class="required">*</span></label>
				    <div class="controls">
						<form id="imageForm" method="post" enctype="multipart/form-data" action='/async-uploadImage.php'>
							<input type="file" name="imageUpload" id="imageUpload"/>						
							<input type="hidden" name="uploadType" value="eye">
							<input type="hidden" id="imagePrevDiv" value="previewNewsCategoryMarker">
							<div id="previewNewsCategoryMarker" class="previewImage">
								<img src="<?php echo $dataNewsCategory['ua_category_marker']?>" style="width:100%;height: 100%;"/>
							</div>
						</form>					    
				    </div>
				</div>	
				<div class="control-group">
				    <label class="control-label"><?php echo _lang("News Category Content");?></label>
				    <div class="controls"><input type="text" id="newsCategoryDescription" placeholder="News Category Description" value="<?php echo $dataNewsCategory['ua_description']?>" style="width: 400px;"></div>
				</div>
				<div class="control-group" style="width: 100%;">
				    <label class="control-label"><?php echo _lang("Meta Description");?><span class="required">*</span></label>
				    <div class="controls"><textarea class="span7" style="height: 120px;" id="metaDescription" placeholder="Meta Description"><?php echo $dataNewsCategory['ua_meta_description']?></textarea></div>
				</div>			
				<div style="margin-left: 300px;margin-top:20px;">
					<a href="#" onclick="onNewsCategorySave()" class="btn btn-primary"><?php echo _lang("Save")?></a>&nbsp;&nbsp;&nbsp;
					<a href="newsCategoryList.php" class="btn btn-danger"><?php echo _lang("List"); ?></a>				
				</div>
			</div>
		</div>		
		<div class="clearboth"></div>
		<?php require_once("footer.php"); ?>
	</div>
</body>
</html>