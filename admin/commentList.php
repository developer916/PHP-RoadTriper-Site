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
    <?php UA_isAdmin(); ?>
    <?php 
    	$pageType = "15";
    	UA_isPermission( $pageType );
    ?>
    <link rel="stylesheet" type="text/css" href="http://www.datatables.net/media/blog/bootstrap_2/DT_bootstrap.css">
    <script src="/js/jquery.dataTables.js"></script>
    <script src="/js/DT_bootstrap.js"></script>
    
    <script src="/js/admin/commentList.js"></script>
</head>
<body>
   <div id="container" >
   	<?php require_once("top.php"); ?>
	<?php require_once("leftMenu.php"); ?>
		<div id="content" class="floatleft">
			<h3 class="pageHeader"><?php echo _lang("Comment Management");?></h3>
			<div id="divContent">
				<div id="divActionButton" style="float:right;margin-bottom:20px;">
					<a class="btn btn-danger" onclick="onDeleteComment()"><?php echo _lang("Delete");?></a>
				</div>
				<div class="clearboth"></div>			
				<table class="table table-striped table-bordered table-hover" id="example">
					<thead>
						<tr>
							<th style="width:30px;"></th>
							<th style="width:40px;">No</th>
							<th style="width:100px;">Username</th>			
							<th>Comment</th>
							<th style="width:120px;">Created Time</th>
						</tr>				
					</thead>
					<tbody>
						<?php
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
							 order by t1.ua_created_time desc";
						$result = $db->queryArray( $sql );
						for( $i = 0; $i < count($result); $i ++ ){
							echo "<tr>";
							echo "   <td><input type='checkbox' value='".$result[$i]['ua_comment_id']."|".$result[$i]['ua_comment_type']."' ></td>";
							echo "   <td>".($i + 1)."</td>";
							echo "   <td><a href='commentDetail.php?id=".$result[$i]['ua_comment_id']."&type=".$result[$i]['ua_comment_type']."'>".$result[$i]['ua_username']."</a></td>";
							$strComment = $result[$i]['ua_comment'];
							if( strlen( $strComment ) > 100 )
								$strComment = substr($strComment,0,100)."...";							
							echo "   <td style='word-break:break-all;'><a href='commentDetail.php?id=".$result[$i]['ua_comment_id']."&type=".$result[$i]['ua_comment_type']."'>".$strComment."</a></td>";
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