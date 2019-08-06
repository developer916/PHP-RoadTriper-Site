<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $UA_USER = UA_getCookie( "UA_USER" );
	$bucketName = $_POST['bucketName'];
	if( $_POST['userId']){
		$userId = $_POST['userId'];
		$sql = "";
		$sq1= "insert into ua_user_bucket( ua_user, ua_bucket_title, ua_created_time, ua_updated_time)";
		$sq1.= " value( $UA_USER, '$bucketName', now(), now() )";
		$sql.= $userId;
		$db->queryInsert( $sql );
	}
	
	$sql = "insert into ua_user_bucket( ua_user, ua_bucket_title, ua_created_time, ua_updated_time)
			value( $UA_USER, '$bucketName', now(), now() )";
	$db->queryInsert( $sql );
	$bucketId = $db->getPrevInsertId();
	logToFile("data.log", "SQL : ".$sql);
		
	$sql = "select * from ua_user_bucket where ua_user_bucket = $bucketId";
	$dataBucket = $db->queryArray( $sql );
	$data['bucket'] = $dataBucket[0];
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
