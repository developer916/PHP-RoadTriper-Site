<?php
	session_start();
    require_once("../common/DB_Connection.php");
    require_once("../common/functions.php");
    require_once("../common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $blogCategoryId = $_POST['blogCategoryId'];
    $blogId = $_POST['blogId'];
    $blogTitle = $_POST['blogTitle'];
    $blogImage = $_POST['blogImage'];
    $blogContent = $_POST['blogContent'];
  	$userId = $_SESSION['UA_ADMIN_USER'];
  	$blogKeyWords =$_POST['blogKeyWords'];
    if( $blogId == ""){
    	$sql = "insert into ua_blog( ua_user, ua_title, ua_image, ua_content, ua_blog_category, ua_keywords, ua_created_time, ua_updated_time)
    	value( $userId, '$blogTitle', '$blogImage',  '".addslashes($blogContent)."', '$blogCategoryId', '$blogKeyWords', now(), now() )";
    	$db->queryInsert( $sql );    	
    }else{
    	$sql = "update ua_blog
    			   set ua_title = '$blogTitle'
    			     , ua_image = '$blogImage'
    			     , ua_content = '".addslashes($blogContent)."'
    			     , ua_blog_category = '$blogCategoryId'
    			     , ua_keywords = '$blogKeyWords'
    			     , ua_updated_time = now() 
    			 where ua_blog = $blogId";
    	$db->query( $sql );
    }
 
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
