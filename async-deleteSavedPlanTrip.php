<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
	$planTripId = $_POST['planTripId'];
	$userId = UA_getCookie("UA_USER");
	$sql = "delete from ua_user_trip where ua_user = $userId and ua_plan_trip = $planTripId";
	$db->query( $sql );

	$sql = "delete from ua_plan_trip where ua_plan_trip = $planTripId";
	$db->query( $sql );
	
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
