<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $eyeCategory = $_POST['eyeCategory'];
    
	$sql = "select ua_location_title, ua_location from ua_location where ua_eye_category = $eyeCategory";
    $eyeCategoryList = $db->queryArray( $sql );
    
    if( $eyeCategoryList == null )
    	$eyeCategoryList = array( );
    
    $sql = "select ua_title from ua_eye_category where ua_eye_category = $eyeCategory";
    $eyeCategoryTitle = $db->queryArray( $sql );
    $eyeCategoryTitle = $eyeCategoryTitle[0]['ua_title'];
    $data['eyeCategoryTitle'] = _lang($eyeCategoryTitle);
    $data['eyeCategoryList'] = $eyeCategoryList;
    
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
