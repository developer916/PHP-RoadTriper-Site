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
    $sql = "";
    
    if( $commentType == 1 )
    	$sql = "delete from ua_location_comment where ua_location_comment = $commentId";
    else
    	$sql = "delete from ua_blog_comment where ua_blog_comment = $commentId";
    
    $db->query( $sql );
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
