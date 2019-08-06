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
    ?>
    <link rel="stylesheet" type="text/css" href="http://www.datatables.net/media/blog/bootstrap_2/DT_bootstrap.css">
    <script src="/js/jquery.dataTables.js"></script>
    <script src="/js/DT_bootstrap.js"></script> 
    
    <script src="/js/admin/blogList.js"></script>               
</head>
<body>
	<div id="container">
		<?php require_once("top.php"); ?>
		<?php require_once("leftMenu.php"); ?>
		<div id="content" class="floatleft">
			<h3 class="pageHeader"><?php echo _lang("Blog Management");?></h3>
			<div id="divContent">
				<div id="divActionButton" style="float:right;margin-bottom:20px;">
				    <a href = "blogDetail.php" class="btn btn-primary"><?php echo _lang("Add");?></a>
					<a class="btn btn-danger" onclick="onDeleteBlog()"><?php echo _lang("Delete");?></a>
				</div>
				<div class="clearboth"></div>
				<table class="table table-striped table-bordered table-hover" id="example">
					<thead>
						<tr>
							<th></th>
							<th><?php echo _lang("No");?></th>
							<th><?php echo _lang("Blog Title");?></th>
							<th><?php echo _lang("Blog Image");?></th>
							<th><?php echo _lang("Blog category")?></th>
							<th><?php echo _lang("Created Time");?></th>
						</tr>				
					</thead>
					<tbody>
						<?php
							$sql = "select t1.*, t2.ua_title as ua_category_title
									  from ua_blog t1, ua_blog_category t2
									 where t1.ua_blog_category = t2.ua_blog_category";
							$result = $db->queryArray( $sql );
							for( $i = 0; $i < count($result); $i ++ )
							{
								echo "<tr>";
								echo "   <td><input type='checkbox' value='".$result[$i]['ua_blog']."'/></td>";
								echo "   <td><a href='blogDetail.php?id=".$result[$i]['ua_blog']."'>".($i + 1)."</a></td>";
								echo "   <td><a href='blogDetail.php?id=".$result[$i]['ua_blog']."'>".$result[$i]['ua_title']."</a></td>";
								echo "   <td><img src='".$result[$i]['ua_image']."' style='width:50px;height:37px;'/></td>";
								echo "   <td>".$result[$i]['ua_category_title']."</td>";
								echo "   <td>".$result[$i]['ua_created_time']."</td>";
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