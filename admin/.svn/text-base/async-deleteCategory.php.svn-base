<?php
	//by panda
	session_start();
	require_once("../common/dataLog.php");
    require_once("../common/DB_Connection.php");   
    require_once("../common/functions.php");

    $result = "success";
    $error = "";
    $data = array();
    
    $strCategoryIds = $_POST['strCategoryIds'];
   
    $sql = " delete from ua_place_category where ua_place_category in ($strCategoryIds) ";
    $db->query($sql);
    
    $sql = " delete from ua_place_subcategory where ua_place_category in ($strCategoryIds) ";
    $db->query($sql);
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
