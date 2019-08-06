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
    	$pageType = "5";
    	UA_isPermission( $pageType );
    	if( isset($_GET['id']) ){
			
			$blogCategoryId = $_GET['id'];
			$sql = "select * from ua_blog_category where ua_blog_category = '$blogCategoryId' ";
			$dataBlogCategory = $db->queryArray( $sql );
			$dataBlogCategory = $dataBlogCategory[0];
			
		}else{
			$blogCategoryId = "";
		}
    ?>
    <link rel="stylesheet" type="text/css" href="http://www.datatables.net/media/blog/bootstrap_2/DT_bootstrap.css">
    <script src="/js/jquery.dataTables.js"></script>
    <script src="/js/DT_bootstrap.js"></script>
    
    <script src="/js/admin/blogCategoryDetail.js"></script>        
</head>
<body>
	<div id="container">
		<?php require_once("top.php"); ?>
		<?php require_once("leftMenu.php"); ?>
		<div id="content" class="floatleft">
			<h3 class="pageHeader"><?php echo _lang("Blog Category Management");?></h3>
			<div id="divContent" class="form-horizontal">
				<input type = "hidden" id="blogCategoryId" value="<?php echo $blogCategoryId?>" />
				<div class="control-group">
				    <label class="control-label"><?php echo _lang("Blog Category Name");?><span class="required">*</span></label>
				    <div class="controls"><input type="text" id="blogCategoryTitle" placeholder="Blog Category Name" value="<?php echo $dataBlogCategory['ua_title']?>" style="width: 400px;"></div>
				</div>			
				<div class="control-group" style="width: 100%;">
				    <label class="control-label"><?php echo _lang("Meta Description");?><span class="required">*</span></label>
				    <div class="controls"><textarea class="span7" style="height: 120px;" id="metaDescription" placeholder="Meta Description"><?php echo $dataBlogCategory['ua_meta_description']?></textarea></div>
				</div>
				<div style="margin-left: 300px;margin-top:20px;">
					<a href="#" onclick="onBlogCategorySave()" class="btn btn-primary"><?php echo _lang("Save")?></a>&nbsp;&nbsp;&nbsp;
					<a href="blogCategoryList.php" class="btn btn-danger"><?php echo _lang("List"); ?></a>				
				</div>
			</div>
		</div>		
		<div class="clearboth"></div>
		<?php require_once("footer.php"); ?>
	</div>
</body>
</html>