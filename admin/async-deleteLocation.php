<?php
	//by panda
	session_start();
    require_once("../common/DB_Connection.php");
    require_once("../common/functions.php");
    require_once("../common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    $strLocationIds = $_POST['strLocationIds'];

    $sql = " delete from ua_location where ua_location in ($strLocationIds) ";
    $db->query($sql);
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
