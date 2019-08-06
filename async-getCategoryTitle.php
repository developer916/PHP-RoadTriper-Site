<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $type = $_POST['type']; // places, newsCategory, eyeCategory
    $id = $_POST['id'];
    
    if( $type == "newsCategory" ){
    	$sql = "select ua_title from ua_news_category where ua_news_category = $id";
    	$dataResult = $db->queryArray( $sql );
    	$title = $dataResult[0]['ua_title'];    	
    }else if( $type == "eyeCategory" ){
    	$sql = "select ua_title from ua_eye_category where ua_eye_category = $id";
    	$dataResult = $db->queryArray( $sql );
    	$title = $dataResult[0]['ua_title'];   	
    }else if( $type == "places" ){
    	$sql = "select ua_name from ua_place_subcategory where ua_place_subcategory = $id";
    	$dataResult = $db->queryArray( $sql );
    	$title = $dataResult[0]['ua_name'];
    }else if( $type == "group"){
    	$sql = "select ua_name from ua_place_category where ua_place_category = $id";
    	$dataResult = $db->queryArray( $sql );
    	$title = $dataResult[0]['ua_name'];    	
    }

    $data['title'] = $title;
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
