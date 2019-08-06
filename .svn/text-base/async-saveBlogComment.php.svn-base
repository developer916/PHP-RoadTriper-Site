<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");

    $result = "success";
    $error = "";
    $data = array();
    
	$blogId = $_POST['blogId'];
	$comment = $_POST['comment'];
	$user = UA_getCookie("UA_USER");
	
	$sql = "insert into ua_blog_comment( ua_blog, ua_user, ua_comment, ua_created_time, ua_updated_time)
			value( $blogId, $user, '".addslashes($comment)."', now(), now())";
	$db->queryInsert( $sql );
	$commentId = $db->getPrevInsertId();
	
	$sql = "select t1.*, t2.ua_username, t2.ua_photo
			  from ua_blog_comment t1, ua_user t2
			 where t1.ua_blog_comment = $commentId
	           and t1.ua_user = t2.ua_user";
	$dataComment = $db->queryArray( $sql );
    
	$data['comment'] = $dataComment[0];
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
