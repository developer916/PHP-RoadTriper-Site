<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $bucketItemId = $_POST['bucketItemId'];
    $locationId = $_POST['locationId'];
    $mode = $_POST['mode'];
    
    if( $mode == "add" ){
    	$sql = "insert into ua_bucket_location( ua_bucket, ua_location, ua_bucket_type, ua_created_time, ua_updated_time )
    			value( $bucketItemId, $locationId, 'U', now(), now() )";    	
    	$db->queryInsert( $sql );
    }else if( $mode == "delete" ){
    	$sql = "delete from ua_bucket_location where ua_bucket = $bucketItemId and ua_location = $locationId and ua_bucket_type = 'U'";    	
    	$db->query( $sql );

    }
    
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
