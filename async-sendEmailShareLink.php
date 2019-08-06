<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
	$email = $_POST['email'];
	$message = $_POST['message'];
	$shareLink = $_POST['shareLink'];
	
	$msg = "Please visit this link as following : \r\n".$shareLink."\r\n From ".SITE_NAME." Team";
	if( $message != "" ){
		$msg = $msg."\r\n".$message;
	}
	
	mail($email, SITE_NAME." Share Trip", $msg );
    
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);
?>
