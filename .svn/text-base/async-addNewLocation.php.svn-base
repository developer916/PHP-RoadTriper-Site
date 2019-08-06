<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    
    $createBy = UA_getCookie("UA_USER");
    $lat = $_POST['lat'];
    $lon = $_POST['lon'];
    $locationType = $_POST['locationType'];
    $title = addslashes($_POST['title']);

    $sql = "insert into ua_location( ua_location_title, ua_location_lat, ua_location_lon, ua_location_type, ua_created_by, ua_created_time, ua_updated_by, ua_updated_time)
    		 value( '$title', $lat, $lon, $locationType, $createBy, now(), $createBy, now() )";
    $db->queryInsert( $sql );
    $locationId = $db->getPrevInsertId();
    $data['locationId'] = $locationId;
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
