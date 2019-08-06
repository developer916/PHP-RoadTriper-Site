<?php
	session_start();
    require_once("../common/DB_Connection.php");
    require_once("../common/functions.php");
    require_once("../common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
	
    $settingId = $_POST['settingId'];
    $code = $_POST['code'];
    $value = $_POST['value'];
    $description = $_POST['description'];
    if( $settingId == "" ){
    	$sql = "insert into ua_setting( ua_code, ua_code_value, ua_code_label, ua_code_description, ua_created_time, ua_updated_time)
    			values( '$code', '$value', '', '".addslashes($description)."', now(), now())";
    	$db->queryInsert( $sql );
    	$settingId = $db->getPrevInsertId();
    }else{
    	$sql = "update ua_setting
    			   set ua_code = '$code'
    				 , ua_code_value = '$value'
    				 , ua_code_description = '".addslashes($description)."'
    				 , ua_updated_time = now()
    			 where ua_setting = $settingId";
    	$db->query( $sql );
    }
    
    $data['settingId'] = $settingId;
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
