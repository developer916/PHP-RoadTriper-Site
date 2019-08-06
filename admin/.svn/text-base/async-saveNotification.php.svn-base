<?php
	session_start();
    require_once("../common/DB_Connection.php");
    require_once("../common/functions.php");
    require_once("../common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $userId = $_SESSION['UA_ADMIN_USER'];
    $notificationContent = $_POST['notificationContent'];
    $notificationDescription = $_POST['notificationDescription'];
   	
    	$sql = "insert into ua_notification ( ua_content, ua_description, ua_created_by, ua_created_time, ua_updated_time)
				 value ('$notificationContent','$notificationDescription', $userId, now(), now())";
    	$db->queryInsert( $sql );    	
   
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
