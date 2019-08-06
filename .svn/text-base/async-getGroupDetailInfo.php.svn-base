<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $groupId = $_POST['groupId'];
    
    $sql = "select t1.* from ua_place_subcategory t1 where t1.ua_place_category = $groupId";
    $categoryList = $db->queryArray( $sql );
    if( $categoryList == null )
    	$categoryList = array( );
    $sql = "select * from ua_place_category where ua_place_category = $groupId";
    $categoryTitle = $db->queryArray( $sql );
    $categoryMeta = $categoryTitle[0]['ua_meta_description'];
    $categoryTitle = $categoryTitle[0]['ua_name'];
    
    $data['categoryMeta'] = $categoryMeta;
    $data['categoryTitle'] = $categoryTitle;
    $data['categoryList'] = $categoryList;
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
