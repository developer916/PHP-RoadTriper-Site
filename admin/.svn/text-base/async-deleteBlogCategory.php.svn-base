<?php
	//by panda
	session_start();
    require_once("../common/DB_Connection.php");
    require_once("../common/functions.php");
    require_once("../common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $strBlogCategoryIds = $_POST['strBlogCategoryIds'];
    
	$sql = " delete from ua_blog_category where ua_blog_category in ($strBlogCategoryIds) ";
    $db->query($sql);
    
    $sql1 = " delete from ua_blog where ua_blog_category in ($strBlogCategoryIds)";
    $db->query($sql1);
    
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
