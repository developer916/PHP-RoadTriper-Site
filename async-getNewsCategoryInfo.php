<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $newsCategory = $_POST['newsCategory'];
    
	$sql = "select ua_location_title, ua_location from ua_location where ua_news_category = $newsCategory";
    $newsCategoryList = $db->queryArray( $sql );
    
    if( $newsCategoryList == null )
    	$newsCategoryList = array( );
    
    $sql = "select ua_title, ua_meta_description from ua_news_category where ua_news_category = $newsCategory";
    $newsCategoryTitle = $db->queryArray( $sql );
    $nCategoryMeta = $newsCategoryTitle[0]['ua_meta_description'];
    $newsCategoryTitle = $newsCategoryTitle[0]['ua_title'];
    $data['newsCategoryTitle'] = _lang($newsCategoryTitle);
    $data['newsCategoryList'] = $newsCategoryList;
    $data['nCategoryMeta'] = $nCategoryMeta;
    
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
