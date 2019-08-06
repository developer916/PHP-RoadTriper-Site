<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $keyword = $_POST['keyword'];
    $maxRows = $_POST['maxRows'];
    
    if( $_POST['locationId'] ){
    	$locationId = $_POST['locationId'];
    	$sql = "";
    	$sq1.= "select * from ua_location where ua_location = ";
    	$sql.= $locationId; 
    	$db->query( $sql );
    }
    $sql = "";
    if( isset($_POST['searchAll']) ){
    	$item['ua_location'] = -1;
    	$item['ua_location_title'] = _lang("Search all for")." '".$keyword."'...";
    	$item['ua_location_lat'] = 0;
    	$item['ua_location_lon'] = 0;
    	
    	$sql = "select -1 as ua_location, '"._lang("Search all for")." \'$keyword\'...' as ua_location_title, 0 as ua_location_lat, 0 as ua_location_lon
    			 union ";
    }
    $sql.= "select ua_location, ua_location_title, ua_location_lat, ua_location_lon 
              from ua_location 
             where ua_location_type = 1
               and lower(ua_location_title) like concat('%',lower('$keyword'),'%')
             limit $maxRows";
    $location = $db->queryArray( $sql );
    $data['location'] = $location;
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);
?>
