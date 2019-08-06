<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $bucketId = $_POST['bucketId'];
    
    $sql = "delete from ua_bucket_location where ua_bucket = $bucketId and ua_bucket_type = 'U'";
    $db->query( $sql );
    
    $sql = "delete from ua_user_bucket where ua_user_bucket = $bucketId";
    $db->query( $sql );   
    
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
