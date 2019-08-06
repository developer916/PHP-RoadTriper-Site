<?php
	session_start();
    require_once("../common/DB_Connection.php");
    require_once("../common/functions.php");
    require_once("../common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
	unset($_SESSION['UA_ADMIN_USER']);
	unset($_SESSION['UA_ADMIN_USERNAME']);
	unset($_SESSION['UA_ADMIN_ADMIN']);
	unset($_SESSION['UA_ADMIN_EMAIL']);
	unset($_SESSION['UA_ADMIN_PHOTO']);
	unset($_SESSION['UA_ADMIN_USER_SNS']);
	unset($_SESSION['UA_ADMIN_BALANCE_AMOUNT']);

    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
