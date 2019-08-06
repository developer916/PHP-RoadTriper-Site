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
    	if( isset($_GET['id']) ){
			$categoryId = $_GET['id'];
			
			$sql = "select * from ua_place_category where ua_place_category = $categoryId";
			$dataCategory = $db->queryArray( $sql );
			$dataCategory = $dataCategory[0];
			
			$sql = "select * from ua_place_subcategory where ua_place_category = $categoryId order by ua_name";
			$datasubCategory = $db->queryArray( $sql );
						
		}else{
			$categoryId = "";
		}
    ?>
    <link rel="stylesheet" type="text/css" href="http://www.datatables.net/media/blog/bootstrap_2/DT_bootstrap.css">
    <script src="/js/jquery.dataTables.js"></script>
    <script src="/js/DT_bootstrap.js"></script>
    
    <script src="/js/admin/categoryDetail.js"></script>        
</head>
<body>
	<div id="container">
		<?php require_once("top.php"); ?>
		<?php require_once("leftMenu.php"); ?>
		<div id="content" class="floatleft">
			<h3 class="pageHeader"><?php echo _lang("Place Category Management");?></h3>
			<div id="divContent" class="form-horizontal">
				<input type="hidden" id="categoryId" value="<?php echo $categoryId?>" />
				<div class="control-group">
				    <label class="control-label"><?php echo _lang("Category Name");?><span class="required">*</span></label>
				    <div class="controls"><input type="text" id="categoryName" placeholder="Category Name" value="<?php echo $dataCategory['ua_name']?>"></div>
				</div>
				<input type="hidden" id="categoryCode"  value="<?php echo $dataCategory['ua_category_code']?>">		
				<div class="control-group">
				    <label class="control-label" style="margin-top:25px;"><?php echo _lang("Category Image");?><span class="required">*</span></label>
				    <div class="controls">		    	
						<form id="imageForm" method="post" enctype="multipart/form-data" action='/async-uploadImage.php'>
							<input type="file" name="imageUpload" id="imageUpload"/>						
							<input type="hidden" name="uploadType" value="category">
							<input type="hidden" id="imagePrevDiv" value="previewCategoryImage">
							<div id="previewCategoryImage" class="previewImage">
								<img src="<?php echo $dataCategory['ua_category_image']?>" style="width:100%;height: 100%;"/>
							</div>
						</form>				    	
				    </div>
				</div>
				<div class="control-group">
				    <label class="control-label" style="margin-top:25px;"><?php echo _lang("Marker Image");?><span class="required">*</span></label>
				    <div class="controls">
						<form id="imageForm" method="post" enctype="multipart/form-data" action='/async-uploadImage.php'>
							<input type="file" name="imageUpload" id="imageUpload"/>						
							<input type="hidden" name="uploadType" value="category">
							<input type="hidden" id="imagePrevDiv" value="previewCategoryMarker">
							<div id="previewCategoryMarker" class="previewImage">
								<img src="<?php echo $dataCategory['ua_category_marker']?>" style="width:100%;height: 100%;"/>
							</div>
						</form>					    
				    </div>
				</div>
				<div class="control-group" style="width: 100%;">
				    <label class="control-label"><?php echo _lang("Meta Description");?><span class="required">*</span></label>
				    <div class="controls"><textarea class="span7" style="height: 120px;" id="metaDescription" placeholder="Meta Description"><?php echo $dataCategory['ua_meta_description']?></textarea></div>
				</div>
				<div style="margin-left: 230px;">
					<a href="#" onclick="onCategorySave()" class="btn btn-primary"><?php echo _lang("Save");?></a>&nbsp;&nbsp;&nbsp;
					<a href="categoryList.php" class="btn btn-danger"><?php echo _lang("List");?></a>				
				</div>
			<?php if( $categoryId != ""){?>
				<h3 class="pageHeader"><?php echo _lang("Sub Category");?></h3>
				<div id="divActionButton" style="float:right;margin-bottom:20px;">
					<a href = "subCategoryDetail.php?id=<?php echo $categoryId?>" class="btn btn-primary"><?php echo _lang("Add");?></a>
					<a class="btn btn-danger" onclick="onDeleteSubCategory()"><?php echo _lang("Delete");?></a>
				</div>
				<div class="clearboth"></div>
				<table class="table table-striped table-bordered table-hover" id="example">
						<thead>
							<tr>
								<th></th>
								<th><?php echo _lang("No");?></th>
								<th><?php echo _lang("Subcategory Name");?></th>
								<th><?php echo _lang("Subcategory Image");?></th>
								<th><?php echo _lang("Created Time");?></th>
							</tr>				
						</thead>
						<tbody>
							<?php						
							for( $i = 0; $i < count($datasubCategory); $i ++ )
								{
									echo "<tr>";
									echo "  <td><input type='checkbox' value='".$datasubCategory[$i]['ua_place_subcategory']."'></td> ";
									echo "  <td><a href='subCategoryDetail.php?id=".$datasubCategory[$i]['ua_place_category']."&sid=".$datasubCategory[$i]['ua_place_subcategory']."'>".($i + 1)."</a></td>";
									echo "	<td><a href='subCategoryDetail.php?id=".$datasubCategory[$i]['ua_place_category']."&sid=".$datasubCategory[$i]['ua_place_subcategory']."'>".$datasubCategory[$i]['ua_name']."</a></td>";
									echo "  <td><img src='".$datasubCategory[$i]['ua_subcategory_image']."' style='width:50px;height:50px;'/></td>";
									echo "	<td>".$datasubCategory[$i]['ua_created_time']."</td>";
									echo "</tr>";
								}				 
							?>
						</tbody>
					</table>			
				<?php }?>
			</div>
		</div>
		<div class="clearboth"></div>
		<?php require_once("footer.php"); ?>
	</div>
</body>
</html>