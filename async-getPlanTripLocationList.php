<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();

    $tripId = $_POST['tripId'];
    $sql = "
		select t2.ua_location_title, t2.ua_location, t2.ua_location_lat, t2.ua_location_lon, t2.ua_location_type
		  from ua_trip_location t1, ua_location t2
		 where t1.ua_trip_type = 'U'
		   and t1.ua_trip = $tripId
		   and t1.ua_location = t2.ua_location
		 order by t1.ua_location_ind";
    $locationList = $db->queryArray( $sql );
    if( $locationList == null )
    	$locationList = array();
    
    $sql = "select * from ua_user_trip where ua_plan_trip = $tripId";

    $pageTitle = $db->queryArray( $sql );
    $savedPlace = "";
    if( $pageTitle != null ){
    	$pageTitle = $pageTitle[0]['ua_page_title'];
    	$savedPlace = "Y";
    }else{
    	$pageTitle = SITE_NAME;
    	$savedPlace = "N";
    } 
    
    $data['savedPlace'] = $savedPlace;
    $data['pageTitle'] = $pageTitle;
    $data['locationList'] = $locationList;
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
