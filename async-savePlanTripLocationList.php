<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    $planTripId = $_POST['planTripId'];
    $locationIds = $_POST['locationIds'];
    
    $sql = "delete from ua_trip_location where ua_trip_type = 'U' and ua_trip = $planTripId";
    $db->query( $sql );
    for( $i = 0; $i < count( $locationIds ); $i ++ ){
    	$sql = "insert into ua_trip_location( ua_trip, ua_trip_type, ua_location, ua_location_ind, ua_created_time, ua_updated_time )
    			 value( $planTripId, 'U', ".$locationIds[$i].", $i, now(), now())";
    	$db->queryInsert( $sql );

    }
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
