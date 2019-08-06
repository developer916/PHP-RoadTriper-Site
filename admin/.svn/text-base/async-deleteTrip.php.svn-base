<?php
	//by panda
	session_start();
require_once("../common/DB_Connection.php");
require_once("../common/functions.php");
require_once("../common/dataLog.php");
	    

    $result = "success";
    $error = "";
    $data = array();
    
    $strGuideIds = $_POST['strGuideIds'];
   
     $sql="delete from ua_guide_trip where ua_guide_trip in ($strGuideIds)";
     $db->query($sql);
     
     $sql1="delete from ua_trip_location where ua_trip in ($strGuideIds)";
     $db->query($sql1);
     
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
