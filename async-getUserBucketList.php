<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $UA_USER = UA_getCookie( "UA_USER" );
    $locationId = $_POST['locationId'];
    
    // $sql = "select ua_user_bucket, ua_bucket_title from ua_user_bucket where ua_user = $UA_USER";
    $sql = "
		select t1.*, ifnull(t2.ua_bucket,0) ua_status
		  from ua_user_bucket t1
		  left join (
			select ua_bucket
			  from ua_bucket_location t1, ua_location t2
			 where t1.ua_location = t2.ua_location
			   and t1.ua_bucket_type = 'U'
			   and t2.ua_location = $locationId
			) t2
		     on t1.ua_user_bucket = t2.ua_bucket
		 where ua_user = $UA_USER";
    
	$dataBucket = $db->queryArray( $sql );
	$data['bucketList'] = $dataBucket;
	
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
