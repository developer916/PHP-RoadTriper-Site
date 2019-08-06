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
    $planTripTitle = $_POST['planTripTitle'];
    $planTripDescription = $_POST['planTripDescription'];
    $planTripPageTitle = addslashes($_POST['planTripPageTitle']);
    
    $sql = "delete from ua_user_trip where ua_plan_trip = $planTripId";
    $db->query( $sql );
    
    $sql = "insert into ua_user_trip( ua_user, ua_plan_trip, ua_trip_title, ua_page_title, ua_description, ua_created_time, ua_updated_time)
    		values( $userId, $planTripId, '".addslashes($planTripTitle)."', '$planTripPageTitle', '".addslashes($planTripDescription)."', now(), now())";
    $db->queryInsert( $sql );
    
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
