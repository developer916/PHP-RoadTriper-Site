<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $userId = UA_getCookie( "UA_USER" );
    $locationId = $_POST['locationId'];
    $commentType = $_POST['commentType'];
    $ratingType = $_POST['ratingType'];
        
    $sql = "select * from ua_user_comment_like where ua_user = $userId and ua_location = $locationId and ua_comment_type = $commentType";
    $ratingList = $db->queryArray( $sql );
    
    if( $ratingList == null ){
    	$sql = "insert into ua_user_comment_like( ua_user, ua_location, ua_like, ua_comment_type, ua_created_time, ua_updated_time)
    			values( $userId, $locationId, $ratingType, $commentType, now(), now() )";    	    	
    	$db->queryInsert( $sql );
    }else{
    	$sql = "update ua_user_comment_like
    			   set ua_like = $ratingType
    			     , ua_updated_time = now()
    			 where ua_user = $userId
    			   and ua_location = $locationId
    			   and ua_comment_type = $commentType
    			";
    	$db->query( $sql );
    }
    
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
