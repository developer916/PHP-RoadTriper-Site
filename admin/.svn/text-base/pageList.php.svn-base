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
    ?>
    <link rel="stylesheet" type="text/css" href="http://www.datatables.net/media/blog/bootstrap_2/DT_bootstrap.css">
    <script src="/js/jquery.dataTables.js"></script>
    <script src="/js/DT_bootstrap.js"></script>
    
    <script src="/js/admin/pageList.js"></script>
        
</head>
<body>
	<div id="container">
		<?php require_once("top.php"); ?>
		<?php require_once("leftMenu.php"); ?>
		<div id="content" class="floatleft">
			<h3 class="pageHeader"><?php echo _lang("Page Management")?></h3>
			<div id="divContent">
				<div id="divActionButton" style="float:right;margin-bottom:20px;">
					<a href = "pageDetail.php" class="btn btn-primary"><?php echo _lang("Add");?></a>
					<a class="btn btn-danger" onclick="onDeletePage()"><?php echo _lang("Delete");?></a>
				</div>
				<div class="clearboth"></div>			
				<table class="table table-striped table-bordered table-hover" id="example">
					<thead>
						<tr>
							<th style="width: 30px;"></th>
							<th style="width: 40px;">No</th>
							<th>Page</th>
							<th style="width: 90px;">Created Date</th>
						</tr>
					</thead>
					<tbody>
						<?php
						$sql = "select * from ua_page";
						$result = $db->queryArray( $sql );
						for( $i = 0; $i < count($result); $i ++ ){
							echo "<tr>";
							echo "<td><input type='checkbox' value='".$result[$i]['ua_page']."'/></td>";
							echo "<td><a href='pageDetail.php?id=".$result[$i]['ua_page']."'>".($i + 1)."</a></td>";
							/* $content = $result[$i]['ua_content'];
							if( strlen($content) > 85 ){
								$content = substr($content, 0, 85)."...";
							} */
							$pageLink = "http://".HOST_SERVER.$result[$i]['ua_unique_link'];
							echo "<td>
    								<a href='pageDetail.php?id=".$result[$i]['ua_page']."'>".$result[$i]['ua_title']."</a><br>
    								<a href='$pageLink' style='text-decoration:none;'><span style='color:#777;'>".$pageLink."</span></a>
    							  </td>";
							echo "<td>".substr($result[$i]['ua_created_time'], 0, 10)."</td>";
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