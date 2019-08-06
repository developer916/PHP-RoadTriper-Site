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
    	$pageType = "15";
    	UA_isPermission( $pageType );
    ?>
    <link rel="stylesheet" type="text/css" href="http://www.datatables.net/media/blog/bootstrap_2/DT_bootstrap.css">
    <script src="/js/jquery.dataTables.js"></script>
    <script src="/js/DT_bootstrap.js"></script>
    <script src="/js/admin/commentDetail.js"></script>
    <?php
    	$type = $_GET['type'];
    	$id = $_GET['id'];
		$sql = "
		select *
		  from
			(select t1.ua_location_comment as ua_comment_id, t1.ua_comment, t1.ua_created_time, t2.ua_username, 1 as ua_comment_type
			  from ua_location_comment t1, ua_user t2
			 where t1.ua_user = t2.ua_user
			 union all
			select t1.ua_blog_comment as ua_comment_id, t1.ua_comment, t1.ua_created_time, t2.ua_username, 2 as ua_comment_type
			  from ua_blog_comment t1, ua_user t2
			 where t1.ua_user = t2.ua_user
			) t1		
		 where t1.ua_comment_type = $type and t1.ua_comment_id = $id";
		$dataComment = $db->queryArray( $sql );
		$dataComment = $dataComment[0];
    ?>
</head>
<body>
   <div id="container" >
   	<?php require_once("top.php"); ?>
	<?php require_once("leftMenu.php"); ?>
	
		<div id="content" class="floatleft">
			<h3 class="pageHeader"><?php echo _lang("Comment Detail");?></h3>
			<div id="divContent" class="form-horizontal">
				<input type = "hidden" id="commentId" value="<?php echo $id?>" />
				<input type = "hidden" id="commentType" value="<?php echo $type?>" />
				
				<div class="control-group" style="display:block;">
				    <label class="control-label" ><?php echo _lang("Comment");?><span class="required">*</span></label>
				    <div class="controls" style="margin-left:20px;float:left;">
				    	<textarea style="width:550px;" rows="7" id="commentTxt"><?php echo $dataComment['ua_comment'];?></textarea>
				    </div>
				</div>

				<div style="margin-left: 370px;">
					<a href="#" onclick="onCommentSave()" class="btn btn-primary"><?php echo _lang("Save")?></a>&nbsp;&nbsp;&nbsp;
					<a href="commentList.php" class="btn btn-danger"><?php echo _lang("List"); ?></a>				
				</div>
			</div>
		</div>			
		 <div class="clearboth"></div>
		 <?php require_once("footer.php"); ?>
	 </div>
</body>
</html>