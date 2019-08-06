<?php
	session_start();
	require_once("./common/DB_Connection.php");
	require_once("./common/functions.php");
	require_once("./common/dataLog.php");

	$result = "success";
	$error = "";
	$data = array();

	$guideBucket=$_POST['guideBucket'];
	
	$sql = "select t3.*,t2.ua_bucket_location
	          from ua_guide_bucket t1,ua_bucket_location t2, ua_location t3
	         where t1.ua_guide_bucket ='".$guideBucket."' 
	           and t1.ua_guide_bucket = t2.ua_bucket
	           and t2.ua_location = t3.ua_location
	           and t2.ua_bucket_type = 'G'";
	$row = $db->queryArray( $sql );
	
	if( $row == null )
		$row = array( );
	
	$data['location'] = $row;
	$data['result'] = $result;
	$data['error'] = $error;
	header('Content-Type: application/json');
	echo json_encode($data);
?>
