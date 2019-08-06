<?php
	//by panda
	session_start();
    require_once("../common/DB_Connection.php");
    require_once("../common/functions.php");
    require_once("../common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $strCommentLocationIds = $_POST['strCommentLocationIds'];
    $strCommentBlogIds = $_POST['strCommentBlogIds'];
    
	$sql = "delete from ua_location_comment where ua_location_comment in ($strCommentLocationIds) ";
    $db->query($sql);

    $sql = "delete from ua_location_comment where ua_location_comment in ($strCommentBlogIds) ";
    $db->query($sql);
        
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
