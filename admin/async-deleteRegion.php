<?php
	//by panda
	session_start();
    require_once("../common/DB_Connection.php");
    require_once("../common/functions.php");
    require_once("../common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $strRegionIds = $_POST['strRegionIds'];
    
	$sql = " delete from ua_region where ua_region in ($strRegionIds) ";
    $db->query($sql);
    
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
