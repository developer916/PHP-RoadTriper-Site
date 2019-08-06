<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $userId = UA_getCookie( "UA_USER" );
    $invoice = $_POST['invoice'];
    $amount = $_POST['amount'];
    $type = $_POST['type'];
    $subId = $_POST['subId'];
    $ip = $_SERVER['REMOTE_ADDR'];
    
    
    $sql = "insert into ua_payment_history( ua_user, ua_invoice, ua_amount, ua_type, ua_subject_id, ua_ip, ua_created_time, ua_updated_time)
    		values( $userId, '$invoice', '$amount', '$type', '$subId', '$ip', now(), now())";
    $db->queryInsert( $sql );
       
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
