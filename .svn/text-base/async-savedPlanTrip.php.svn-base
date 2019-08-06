<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");

    $result = "success";
    $error = "";
    $data = array();
    
    $userId = UA_getCookie("UA_USER");
    
    $sql = "select * from ua_user_trip where ua_user = $userId";
    $tripList = $db->queryArray( $sql );
    if( $tripList == null )
    	$tripList = array( );
    $data['tripList'] = $tripList;
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>