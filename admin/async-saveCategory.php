<?php
	session_start();
    require_once("../common/DB_Connection.php");
    require_once("../common/functions.php");
    require_once("../common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $categoryId = $_POST['categoryId'];
    $categoryName = $_POST['categoryName'];
    $categoryCode = $_POST['categoryCode'];
    $categoryImage = $_POST['categoryImage'];
    $markerImage = $_POST['markerImage'];
    $metaDescription = $_POST['metaDescription'];
    
    if( $categoryId == ""){
    	$sql = "insert into ua_place_category( ua_name, ua_category_code, ua_category_image, ua_category_marker, ua_meta_description, ua_created_time, ua_updated_time)
    	value('$categoryName', '$categoryCode', '$categoryImage', '$markerImage', '$metaDescription', now(), now() )";
    	$db->queryInsert( $sql );    	
    }else{
    	$sql = "update ua_place_category
    			   set ua_name = '$categoryName'
    			     , ua_category_code = '$categoryCode'
    			     , ua_category_image = '$categoryImage'
    			     , ua_category_marker = '$markerImage'
    			     , ua_meta_description = '$metaDescription' 
    			     , ua_updated_time = now() 
    			 where ua_place_category = $categoryId";
    	$db->query( $sql );
    }

 
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
