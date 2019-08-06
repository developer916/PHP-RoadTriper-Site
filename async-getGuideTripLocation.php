<?php
	session_start();
	require_once("./common/DB_Connection.php");
	require_once("./common/functions.php");
	require_once("./common/dataLog.php");

	$result = "success";
	$error = "";
	$data = array();

	$guideTrip=$_POST['guideTrip'];
	
	$sql = "select  t2.ua_location_ind ,t3.*
	  		  from ua_guide_trip t1, ua_trip_location t2, ua_location t3
	 		 where t1.ua_guide_trip ='".$guideTrip."' 
	 		   and t1.ua_guide_trip= t2.ua_trip
	 		   and t2.ua_location = t3.ua_location
	 		   and t2.ua_trip_type = 'G'
	 		 order by t2.ua_location_ind ";
	$row = $db->queryArray( $sql );
	
	if( $row == null )
		$row = array( );
	
	$data['location'] = $row;
	$data['result'] = $result;
	$data['error'] = $error;
	header('Content-Type: application/json');
	echo json_encode($data);
?>
