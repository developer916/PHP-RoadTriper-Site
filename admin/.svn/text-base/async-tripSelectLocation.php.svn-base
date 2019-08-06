<?php
		session_start();
		require_once("../common/DB_Connection.php");
		require_once("../common/functions.php");
		require_once("../common/dataLog.php");
		
		$result = "success";
		$error = "";
		$data = array();
		
		$keyword = $_POST['keyword'];
		$maxRows = $_POST['maxRows'];
		
		
		$sql = "select *
		from ua_location
		where lower(ua_location_title) like concat('%',lower('$keyword'),'%')
		limit $maxRows";
		$location = $db->queryArray( $sql );
		$data['location'] = $location;
		    $data['result'] = $result;
		    $data['error'] = $error;
		    header('Content-Type: application/json');
		    echo json_encode($data);
  ?>
