<?php
	session_start();
    require_once("../common/DB_Connection.php");
    require_once("../common/functions.php");
    require_once("../common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();

    $settingCodeValue = $_POST['settingCodeValue'];
    $settingDescription = $_POST['settingDescription'];
    $settingCode = $_POST['settingCode'];  
    $settingLabel = $_POST['settingLabel'];	
   for( $i = 0 ; $i < count($settingCode) ; $i ++)
   	{
    	$sql = "update ua_setting
    			   set ua_code_label = '$settingLabel[$i]'
    			     , ua_code_value = '$settingCodeValue[$i]'
    			     , ua_code_description = '$settingDescription[$i]'
    			     , ua_updated_time = now() 
    			 where ua_code = '$settingCode[$i]'";
    	$db->query( $sql );
   	}
   
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
