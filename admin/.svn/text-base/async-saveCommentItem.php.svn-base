<?php
	session_start();
	require_once("../common/dataLog.php");
    require_once("../common/DB_Connection.php");   
    require_once("../common/functions.php");

    $result = "success";
    $error = "";
    $data = array();
    
    $commentId = $_POST['commentId'];
    $commentType = $_POST['commentType'];
    $commentText = $_POST['commentText'];
    $sql = "";
    
    if( $commentType == 1 )
    	$sql = "update ua_location_comment set ua_comment = '$commentText' where ua_location_comment = $commentId";
    else
    	$sql = "update ua_blog_comment set ua_comment = '$commentText' where ua_blog_comment = $commentId";
    
    $db->query( $sql );
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
