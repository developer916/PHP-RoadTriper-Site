<?php
	session_start();
    require_once("../common/DB_Connection.php");
    require_once("../common/functions.php");
    require_once("../common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $userid = $_POST['userid'];
    $password = $_POST['password'];    

    $sql = "select * 
              from ua_user 
     	     where ua_username = '$userid'
               and ua_password = md5('$password')
               and ua_admin = 'Y'";
    $row = $db->queryArray( $sql );
    if( $row == null ){
    	$result = "failed";
    	$error = "INVALID_LOGIN_INFO";
    }else{
    	$_SESSION['UA_ADMIN_USER'] = $row[0]['ua_user'];
    	$_SESSION['UA_ADMIN_USERNAME'] = $row[0]['ua_username'];
    	$_SESSION['UA_ADMIN_ADMIN'] = $row[0]['ua_admin'];
    	
    	$_SESSION['UA_ADMIN_EMAIL'] = $row[0]['ua_email'];
    	$_SESSION['UA_ADMIN_PHOTO'] = $row[0]['ua_photo'];
    	$_SESSION['UA_ADMIN_USER_SNS'] = $row[0]['ua_user_sns'];
    	
    }
    
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
