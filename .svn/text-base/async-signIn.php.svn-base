<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $username = $_POST['username'];
    $password = $_POST['password'];
    $sql = "select * from ua_user where ua_username = '$username' and ua_password = md5('$password')";
    $dataUser = $db->queryArray( $sql );
    if( count( $dataUser ) == 0 ){
    	$result = "failed";
    }else{
    	UA_setCookie( "UA_USER", $dataUser[0]['ua_user'] );
    	UA_setCookie( "UA_USERNAME", $dataUser[0]['ua_username'] );
    	UA_setCookie( "UA_EMAIL", $dataUser[0]['ua_email'] );
    	UA_setCookie( "UA_USER_TYPE", $dataUser[0]['ua_user_type'] );
    	UA_setCookie( "UA_PHOTO", $dataUser[0]['ua_photo'] );
    	UA_setCookie( "UA_USER_SNS", $dataUser[0]['ua_user_sns'] );
    	UA_setCookie( "UA_ADMIN", $dataUser[0]['ua_admin'] );
    	$userId = $dataUser[0]['ua_user'];
    }
    
    $sql = "select count(*) cnt from ua_user_trip where ua_user = ".$dataUser[0]['ua_user'];
    $dataCnt = $db->queryArray( $sql );
    
    $data['cntPlanTrip'] = $dataCnt[0]['cnt'];
    
    $sql = "select * from ua_user_bucket where ua_user = $userId";
    $dataBucket = $db->queryArray( $sql );
    
    $data['bucketList'] = $dataBucket;
    $data['user'] = $dataUser[0];
    
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
