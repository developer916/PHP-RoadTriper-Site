<?php
	session_start();
    require_once("../common/DB_Connection.php");
    require_once("../common/functions.php");
    require_once("../common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $blogCategoryId = $_POST['blogCategoryId'];
    $blogCategoryTitle = $_POST['blogCategoryTitle'];
    $metaDescription = $_POST['metaDescription'];
    
    if( $blogCategoryId == ""){
    	$sql = "insert into ua_blog_category( ua_title, ua_meta_description, ua_created_time, ua_updated_time)
    	value('$blogCategoryTitle', '$metaDescription', now(), now() )";
    	$db->queryInsert( $sql );    	
    }else{
    	$sql = "update ua_blog_category
    			   set ua_title = '$blogCategoryTitle'
    			     , ua_meta_description = '$metaDescription'
    			     , ua_updated_time = now() 
    			 where ua_blog_category = $blogCategoryId";
    	$db->query( $sql );
    }

 
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
