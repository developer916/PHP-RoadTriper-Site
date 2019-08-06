<?php
	//by panda
	session_start();
	require_once("../common/dataLog.php");
    require_once("../common/DB_Connection.php");   
    require_once("../common/functions.php");

    $result = "success";
    $error = "";
    $data = array();
    
    $strUserIds = $_POST['strUserIds'];
   
    $sql = " delete from ua_user where ua_user in ($strUserIds) ";
    $db->query($sql);
    
    $sql = " delete from ua_user_sns where ua_user in ($strUserIds) ";
    $db->query($sql);    

    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
