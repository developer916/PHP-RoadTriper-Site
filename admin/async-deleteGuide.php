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
   
    $sql = " delete from ua_guide where ua_guide in ($strGuideIds) ";
    $db->query($sql);
    
    $sql = "delete  from ua_guide_trip t1, ua_trip_location t2 where t2.ua_trip=t1.ua_guide_trip  and t1.ua_guide in ($strGuideIds)";
	$db->query($sql);
	   	
	$sql = "delete  from ua_guide_bucket t1, ua_bucket_location t2 where t2.ua_bucket=t1.ua_guide_bucket  and t1.ua_guide in ($strGuideIds)";
	$db->query($sql);
	 	   	 
	    
    $sql = " delete from ua_guide_trip where ua_guide in ($strGuideIds) ";
    $db->query($sql);
    
    $sql = " delete from ua_guide_bucket where ua_guide in ($strGuideIds) ";
    $db->query($sql);
        
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
