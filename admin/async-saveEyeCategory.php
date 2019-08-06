<?php
	session_start();
    require_once("../common/DB_Connection.php");
    require_once("../common/functions.php");
    require_once("../common/dataLog.php");    
    $result = "success";
    $error = "";
    $data = array();
    $eyeCategoryId = $_POST['eyeCategoryId'];
    $eyeCategoryTitle = $_POST['eyeCategoryTitle'];
    $eyeCategoryDescription = $_POST['eyeCategoryDescription'];
	$eyeCategoryImage = $_POST['eyeCategoryImage'];
	$eyeMarkerImage = $_POST['eyeMarkerImage'];
	$metaDescription = $_POST['metaDescription'];
	
    if( $eyeCategoryId == ""){
    	$sql = "insert into ua_eye_category( ua_title, ua_description, ua_category_image, ua_category_marker, ua_meta_description, ua_created_time, ua_updated_time)
    		value('$eyeCategoryTitle', '$eyeCategoryDescription', '$eyeCategoryImage', '$eyeMarkerImage', '$metaDescription', now(), now() )";
    	$db->queryInsert( $sql );    	
    }else{
    	$sql = "update ua_eye_category
    			   set ua_title = '$eyeCategoryTitle'
    			   	 , ua_description = '$eyeCategoryDescription'
    			   	 , ua_category_image = '$eyeCategoryImage'
    			   	 , ua_category_marker = '$eyeMarkerImage'	
    			   	 , ua_meta_description = '$metaDescription'
    			     , ua_updated_time = now() 
    			 where ua_eye_category = $eyeCategoryId";
    	$db->query( $sql );
    }

    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
