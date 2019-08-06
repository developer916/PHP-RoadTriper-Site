<?php
	session_start();
    require_once("../common/DB_Connection.php");
    require_once("../common/functions.php");
    require_once("../common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $regionId = $_POST['regionId'];
    $regionTitle = $_POST['regionTitle'];
    $regionDescription = $_POST['regionDescription'];
  	$regionCode = $_POST['regionCode'];
  	$regionOrder = $_POST['regionOrder'];
    if( $regionId == ""){
    	$sql = "insert into ua_region( ua_title, ua_description, ua_code, ua_order, ua_created_time, ua_updated_time)
    			value('$regionTitle', '$regionDescription', '$regionCode', '$regionOrder', now(), now() )";
    	$db->queryInsert( $sql );    	
    }else{
    	$sql = "update ua_region
    			   set ua_title = '$regionTitle'
    			     , ua_description = '$regionDescription'
    			     , ua_code = '$regionCode'
    			     , ua_order = '$regionOrder'
    			     , ua_updated_time = now() 
    			 where ua_region = $regionId";
    	$db->query( $sql );
    }

 
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
