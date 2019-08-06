<?php
	session_start();
	require_once("./common/DB_Connection.php");
	require_once("./common/functions.php");
	require_once("./common/dataLog.php");
	
	
	$error = "";
	$data = array();
	$result = "success";
	
	$lastNotificationId = $_POST['lastNotificationId'];
	$sql = "select * from ua_notification where ua_notification > $lastNotificationId order by ua_notification desc";
	$notificationList = $db->queryArray($sql);
	
	if( $notificationList == null )
		$notificationList = array( );
	
	$data['notificationList']=$notificationList;
	$data['result']=$result;
	header('Content-Type: application/json');
	echo json_encode($data);
?>