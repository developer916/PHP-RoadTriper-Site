<?php
	session_start();
    require_once("../common/DB_Connection.php");
    require_once("../common/functions.php");
    require_once("../common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $newsCategoryId = $_POST['newsCategoryId'];
    $newsCategoryTitle = $_POST['newsCategoryTitle'];
    $newsCategoryDescription = $_POST['newsCategoryDescription'];
	$newsCategoryImage = $_POST['newsCategoryImage'];
	$newsMarkerImage = $_POST['newsMarkerImage'];
	$metaDescription = $_POST['metaDescription'];
	
    if( $newsCategoryId == ""){
    	$sql = "insert into ua_news_category( ua_title, ua_description, ua_category_image, ua_category_marker, ua_meta_description, ua_created_time, ua_updated_time)
    	value('$newsCategoryTitle', '$newsCategoryDescription', '$newsCategoryImage', '$newsMarkerImage', '$metaDescription', now(), now() )";
    	$db->queryInsert( $sql );    	
    }else{
    	$sql = "update ua_news_category
    			   set ua_title = '$newsCategoryTitle'
    			   	 , ua_description = '$newsCategoryDescription'
    			   	 , ua_category_image = '$newsCategoryImage'
    			   	 , ua_category_marker = '$newsMarkerImage'
    			   	 , ua_meta_description = '$metaDescription'	
    			     , ua_updated_time = now() 
    			 where ua_news_category = $newsCategoryId";
    	$db->query( $sql );
    }

 
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
