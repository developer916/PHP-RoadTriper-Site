<?php
	session_start();
	require_once("../common/DB_Connection.php");	
    require_once("../common/functions.php");
    require_once("../common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $keyword = $_POST['keyword'];
    $maxRows = $_POST['maxRows'];
  
    $sql = "select t1.* 
              from ua_place_subcategory t1, ua_place_category t2
             where t1.ua_place_category = t2.ua_place_category
               and lower(t1.ua_name) like concat('%',lower('$keyword'),'%') limit $maxRows";
    $row = $db->queryArray( $sql );
	
	$data['location'] = $row;
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
