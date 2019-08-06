<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $locationId = $_POST['locationId'];
    $likeType = $_POST['likeType'];
    $userId = UA_getCookie("UA_USER");
    
    $sql = "select * from ua_user_location_like where ua_user = $userId and ua_location = $locationId";
    $dataLike = $db->queryArray( $sql );
    if( $dataLike == null ){
    	$sql = "insert into ua_user_location_like( ua_user, ua_location, ua_like, ua_created_time, ua_updated_time)
    			values( $userId, $locationId, $likeType, now(), now())";
    	$db->queryInsert( $sql );
    }else{
    	$sql = "update ua_user_location_like
    			   set ua_like = $likeType
    			 where ua_user = $userId
    	           and ua_location = $locationId";
    	$db->query( $sql );
    }
	
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
