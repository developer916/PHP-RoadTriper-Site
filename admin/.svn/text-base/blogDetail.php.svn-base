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
    	$pageType = "6";
    	UA_isPermission( $pageType );
    	
    	$sql1 = "select * from ua_blog_category order by ua_title";
    	$blogCategoryContent = $db->queryArray($sql1);
    	
    	if( isset($_GET['id']) ){
			
			$blogId = $_GET['id'];
			$sql = "select * from ua_blog where ua_blog = '$blogId'";
			$dataBlog = $db->queryArray( $sql );
			$dataBlog = $dataBlog[0];
		
			
		}else{
			$blogId = "";
	
		}
    ?>
    <link rel="stylesheet" type="text/css" href="http://www.datatables.net/media/blog/bootstrap_2/DT_bootstrap.css">
    <script src="/js/jquery.dataTables.js"></script>
    <script src="/js/DT_bootstrap.js"></script>
    
    <script src="/js/admin/blogDetail.js"></script>        
    
    <script src="/texteditor/scripts/innovaeditor.js" type="text/javascript"></script>
	<script src="/texteditor/scripts/innovamanager.js" type="text/javascript"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js" type="text/javascript"></script>
	<script src="/texteditor/scripts/common/webfont.js" type="text/javascript"></script>    
</head>
<body>
	<input type="hidden" id="userId" value="<?php echo $_SESSION['UA_ADMIN_USER'];?>"/>
	<div id="container">
		<?php require_once("top.php"); ?>
		<?php require_once("leftMenu.php"); ?>
		<div id="content" class="floatleft">
			<h3 class="pageHeader"><?php echo _lang("Blog Detail");?></h3>
			<div id="divContent" class="form-horizontal">
				<input type = "hidden" id="blogId" value="<?php echo $blogId?>" />
				<input type = "hidden" id="blogCategoryId" value="<?php echo $blogCategoryId?>" />
				<div class="control-group" style="display:block;">
				    <label class="control-label" style="width:100px;"><?php echo _lang("Blog Title");?><span class="required">*</span></label>
				    <div class="controls" style="margin-left:20px;float:left;"><input type="text" style="width:620px;" id="blogTitle" placeholder="Blog Title" value='<?php echo $dataBlog['ua_title'];?>'></div>
				</div>
				<div class="control-group" style="display:block;">
				    <label class="control-label" style="width:100px;"><?php echo _lang("Blog Category");?><span class="required">*</span></label>
					<div class="controls" style="margin-left:20px;float:left;">
					    <select id="choiceBlogCategory">
					    	<option value="">Please select</option>
					    <?php 
						    for($i = 0 ; $i < count($blogCategoryContent) ; $i ++)
						   	{
								echo "<option value='".$blogCategoryContent[$i]['ua_blog_category']."'";
								if( $dataBlog['ua_blog_category'] == $blogCategoryContent[$i]['ua_blog_category'] )
									echo " selected";
								echo ">".$blogCategoryContent[$i]['ua_title']."</option>";
						    }
					    ?>
						</select>
					</div>				    
				</div>
				<div class="control-group" style="display:block;">
				    <label class="control-label" style="margin-top:5px;width:100px;"><?php echo _lang("Blog Image");?><span class="required">*</span></label>
				    <div class="controls" style="margin-left:20px;float:left;">    	
						<form id="imageForm" method="post" enctype="multipart/form-data" action='/async-uploadImage.php'>
							<input type="file" name="imageUpload" id="imageUpload"/>						
							<input type="hidden" name="uploadType" value="blog">
							<input type="hidden" id="imagePrevDiv" value="previewBlogImage">
							<div id="previewBlogImage" class="previewImage">
								<img src="<?php echo $dataBlog['ua_image']?>" style="width:100%;height: 75%;"/>
							</div>
						</form>				    	
				    </div>
				</div>
				<div class="control-group" style="display:block;">
				    <label class="control-label" style="width:100px;"><?php echo _lang("Blog Keywords");?></label>
				    <div class="controls" style="margin-left:20px;float:left;"><input type="text" id="blogKeyWords" placeholder="Blog Keywords" value='<?php echo $dataBlog['ua_keywords'];?>'></div>
				</div>
				<div class="control-group" style="display:block;">
				    <label class="control-label" style="padding-top:12px;width:100px;"><?php echo _lang("Blog Content");?><span class="required">*</span></label>	
				    <div class="controls" style="width:550px;margin-left:20px;float:left;">
				       	<input type="hidden" id="getBlogContent" value='<?php echo $dataBlog['ua_content']?>'>
				    	<textarea rows="10" cols="100"  id="blogContent" placeholder="Blog Content" ><?php echo $dataBlog['ua_content']?></textarea>
				    </div>
				</div>		
				<div style="margin-left: 230px;">
					<a href="#" onclick="onBlogSave()" class="btn btn-primary"><?php echo _lang("Save")?></a>&nbsp;&nbsp;&nbsp;
					<a href="blogList.php" class="btn btn-danger"><?php echo _lang("List"); ?></a>				
				</div>
			</div>
		</div>		
		<div class="clearboth"></div>
		<?php require_once("footer.php"); ?>
	</div>
</body>
</html>