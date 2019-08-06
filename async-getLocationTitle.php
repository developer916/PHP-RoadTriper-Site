<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $locationId = $_POST['locationId'];
    
    $sql = "select ua_location_title from ua_location where ua_location = $locationId";
    $title = $db->queryArray( $sql );
    $title = $title[0]['ua_location_title'];

    $data['title'] = _lang($title);
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
