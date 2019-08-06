<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
	$locationId = $_POST['locationId'];
	$comment = $_POST['comment'];
	$user = UA_getCookie("UA_USER");
	$commentRate = $_POST['commentRate'];
	
	$sql = "insert into ua_location_comment( ua_location, ua_user, ua_comment, ua_comment_rate, ua_created_time, ua_updated_time)
			value( $locationId, $user, '".addslashes($comment)."', '$commentRate', now(), now())";
	$db->queryInsert( $sql );
	$commentId = $db->getPrevInsertId();
	if ($commentRate != "") {
	$sql = "update ua_location_comment 
	           set ua_comment_rate = '$commentRate'
	         where ua_user = $user AND ua_location = $locationId";
	$db->query($sql);
	}
	$sql = "select t1.*, t2.ua_username, t2.ua_photo
			  from ua_location_comment t1, ua_user t2
			 where t1.ua_location_comment = $commentId
	           and t1.ua_user = t2.ua_user";
	$dataComment = $db->queryArray( $sql );
    
	$data['comment'] = $dataComment[0];
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
