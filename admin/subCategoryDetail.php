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
    	$pageType = "2";
    	UA_isPermission( $pageType );
    	$categoryId = $_GET['id'];
    	if( isset($_GET['sid']) ){
			
			$subcategoryId = $_GET['sid'];
			$sql = "select * from ua_place_subcategory where ua_place_subcategory = '$subcategoryId' ";
			$datasubCategory = $db->queryArray( $sql );
			$datasubCategory = $datasubCategory[0];
		
		}else{
			$subcategoryId = "";
		}
    ?>
    <link rel="stylesheet" type="text/css" href="http://www.datatables.net/media/blog/bootstrap_2/DT_bootstrap.css">
    <script src="/js/jquery.dataTables.js"></script>
    <script src="/js/DT_bootstrap.js"></script>
    
    <script src="/js/admin/subCategoryDetail.js"></script>        
</head>
<body>
	<div id="container">
		<?php require_once("top.php"); ?>
		<?php require_once("leftMenu.php"); ?>
		<div id="content" class="floatleft">
			<h3 class="pageHeader"><?php echo _lang("Sub Category ");?></h3>
			<div id="divContent" class="form-horizontal">
				<input type = "hidden" id="categoryId" value="<?php echo $categoryId?>" />
				<input type = "hidden" id="subcategoryId" value="<?php echo $subcategoryId?>"/>
				<div class="control-group">
				    <label class="control-label"><?php echo _lang("Subcategory Name");?><span class="required">*</span></label>
				    <div class="controls"><input type="text" id="subcategoryName" placeholder="Subcategory Name" value="<?php echo $datasubCategory['ua_name']?>"></div>
				</div>
				<input type="hidden" id="subcategoryCode"  value="<?php echo $datasubCategory['ua_subcategory_code']?>">					
				<div class="control-group">
				    <label class="control-label" style="margin-top:25px;"><?php echo _lang("Subcategory Image");?><span class="required">*</span></label>
				    <div class="controls">		    	
						<form id="imageForm" method="post" enctype="multipart/form-data" action='/async-uploadImage.php'>
							<input type="file" name="imageUpload" id="imageUpload"/>						
							<input type="hidden" name="uploadType" value="category">
							<input type="hidden" id="imagePrevDiv" value="previewSubCategoryImage">
							<div id="previewSubCategoryImage" class="previewImage">
								<img src="<?php echo $datasubCategory['ua_subcategory_image']?>" style="width:100%;height: 100%;"/>
							</div>
						</form>				    	
				    </div>
				</div>
				<div class="control-group" style="width: 100%;">
				    <label class="control-label"><?php echo _lang("Meta Description");?><span class="required">*</span></label>
				    <div class="controls"><textarea class="span7" style="height: 120px;" id="metaDescription" placeholder="Meta Description"><?php echo $datasubCategory['ua_meta_description']?></textarea></div>
				</div>
				<div style="margin-left: 230px;">
					<a href="#" onclick="onsubCategorySave()" class="btn btn-primary">Save</a>&nbsp;&nbsp;&nbsp;
					<a href="categoryDetail.php?id=<?php echo $categoryId?>" class="btn btn-danger">List</a>				
				</div>
			</div>
		</div>		
		<div class="clearboth"></div>
		<?php require_once("footer.php"); ?>
	</div>
</body>
</html>