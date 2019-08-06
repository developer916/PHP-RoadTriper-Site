<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $userId = UA_getCookie("UA_USER");
    $sql = "select * from ua_location where ua_location_type = 1 and ua_created_by = $userId order by ua_updated_time desc";
    $myPlacesList = $db->queryArray( $sql );
    if( $myPlacesList == null )
    	$myPlacesList = array( );
    
    $data['myPlacesList'] = $myPlacesList;
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
