<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");

    $result = "success";
    $error = "";
    $data = array();
    
    $blogCategoryId = $_POST['blogCategoryId'];
    $startDate = $_POST['startDate'];
    $endDate = $_POST['endDate'];
    
    $sql = "
		    select t1.*, t2.ua_title as ua_blog_title, datediff( now(), t1.ua_created_time ) as ua_day_ago
		      from ua_blog t1, ua_blog_category t2
		     where t1.ua_blog_category = t2.ua_blog_category";
    if( !($blogCategoryId == "all" || $blogCategoryId == "") )
    	$sql.= "   and t1.ua_blog_category = $blogCategoryId";
    if( $startDate != "" )
    	$sql.= "   and date(t1.ua_created_time) >= '$startDate'";
    if( $endDate != "" )
    	$sql.= "   and date(t1.ua_created_time) <= '$endDate'";
    $sql.= " order by t1.ua_created_time desc";
    
    $dataBlog = $db->queryArray( $sql );
    if( $dataBlog == null ) $dataBlog = array();

    $data['blogThumbList'] = $dataBlog;
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>