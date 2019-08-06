<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    UA_deleteCookie( "UA_USER" );
    UA_deleteCookie( "UA_USERNAME" );
    UA_deleteCookie( "UA_EMAIL" );
    UA_deleteCookie( "UA_USER_TYPE" );
    UA_deleteCookie( "UA_PHOTO" );
    UA_deleteCookie( "UA_USER_SNS" );
    UA_deleteCookie( "UA_ADMIN" );
    
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
