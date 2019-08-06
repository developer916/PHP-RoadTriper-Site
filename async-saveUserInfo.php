<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $UA_USER = UA_getCookie( "UA_USER" );
    $username = $_POST['username'];
    $password = $_POST['password'];
    $email = $_POST['email'];
    $photo = $_POST['photo'];
    
    UA_setCookie( "UA_USERNAME", $username );
    UA_setCookie( "UA_EMAIL", $email );
    UA_setCookie( "UA_PHOTO", $photo );    
    
    $sql = "update ua_user
    		   set ua_username = '$username'
                 , ua_email = '$email'
                 , ua_password = md5('$password')
                 , ua_photo = '$photo' 
             where ua_user = $UA_USER";
    $db->query( $sql );
    
	$data['user'] = $dataUser;   
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
