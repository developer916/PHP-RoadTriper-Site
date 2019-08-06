<?php
	session_start();
    require_once("../common/DB_Connection.php");
    require_once("../common/functions.php");
    require_once("../common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $userId = $_POST['userId'];
    $menuId = $_POST['menuId'];
    
    $sql = "delete from ua_user_menu where ua_user = $userId";
    $db->query( $sql );
    
    for( $i = 0; $i < count($menuId); $i ++ ){
    	$sql = "insert into ua_user_menu( ua_user, ua_menu, ua_created_time, ua_updated_time)
    			values( $userId, ".$menuId[$i].", now(), now() )";
    	$db->queryInsert( $sql );
    }

    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
