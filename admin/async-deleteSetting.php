<?php
	session_start();
	require_once("../common/dataLog.php");
    require_once("../common/DB_Connection.php");   
    require_once("../common/functions.php");

    $result = "success";
    $error = "";
    $data = array();
    
    $strSettingIds = $_POST['strSettingIds'];
   
    $sql = " delete from ua_setting where ua_setting in ($strSettingIds) ";
    $db->query($sql);

    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
