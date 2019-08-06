<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $UA_USER = UA_getCookie( "UA_USER" );
    $sql = "select * from ua_user where ua_user = $UA_USER";
    $dataUser = $db->queryArray( $sql );
    $dataUser = $dataUser[0];
    
	$data['user'] = $dataUser;   
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
