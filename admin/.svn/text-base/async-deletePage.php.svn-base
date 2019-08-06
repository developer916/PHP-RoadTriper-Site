<?php
	//by panda
	session_start();
	require_once("../common/dataLog.php");
    require_once("../common/DB_Connection.php");   
    require_once("../common/functions.php");

    $result = "success";
    $error = "";
    $data = array();
    
    $strPageIds = $_POST['strPageIds'];
   
    $sql = " delete from ua_page where ua_page in ($strPageIds) ";
    $db->query($sql);

    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
