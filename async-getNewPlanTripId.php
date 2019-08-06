<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $sql = "insert into ua_plan_trip( ua_created_time, ua_updated_time)
    		 value( now(), now() )";
    $db->queryInsert( $sql );
    $planTripId = $db->getPrevInsertId();
    
	
	$data['planTripId'] = $planTripId;
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
