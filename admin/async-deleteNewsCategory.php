<?php
	//by panda
	session_start();
    require_once("../common/DB_Connection.php");
    require_once("../common/functions.php");
    require_once("../common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $strNewsCategoryIds = $_POST['strNewsCategoryIds'];
    
	$sql = " delete from ua_news_category where ua_news_category in ($strNewsCategoryIds) ";
    $db->query($sql);
    
    $sql1 = " delete from ua_location where ua_location_type = 4 
    			 and ua_news_category in ($strNewsCategoryIds)";
    $db->query($sql1);
    
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
