<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    $pageId = $_POST['pageId'];
    
    $sql = "
			select t1.*, t2.ua_username, datediff( now(), t1.ua_created_time ) as ua_day_ago
			  from ua_page t1, ua_user t2
			 where t1.ua_page = $pageId
			   and t1.ua_user = t2.ua_user";
    $dataPage = $db->queryArray( $sql );
    
    $data['page'] = $dataPage[0];
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>