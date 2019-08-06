<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");
        
	$response = $_POST['response'];
	
	$token = $_POST['token'];
	$token2 = $_POST['token2'];
	$vkID = $_POST['uid'];
	
	$vkName = $response['first_name']." ".$response['last_name'];
	$vkUsername = $response['first_name']." ".$response['last_name'];	
	$vkEmail = '';
	$vkNickname = $response['nickname'];
	$vkPhoto = $response['photo_100'];
	$result = "success";
	$sql = "select * from ua_user_sns where ua_sns_type = 3 and ua_sns_id = '$vkID'";
	$row = $db->queryArray( $sql );
	if( $row == null ){
		// Insert into UA_USER
		$sql = "insert into ua_user( ua_username, ua_email, ua_password, ua_photo, ua_balance_amount, ua_admin, ua_created_time, ua_updated_time)
				values('$vkUsername', '$vkEmail', '', '$vkPhoto', 0, 'N', now(), now() )";
		$db->queryInsert($sql);
		$userId = $db->getPrevInsertId();
		UA_createImageDirectory( $userId );
		// Insert into UA_USER_SNS
		$sql = "insert into ua_user_sns( ua_user, ua_sns_type, ua_sns_id, ua_nickname, ua_token, ua_token2, ua_created_time, ua_updated_time )
			    values ( $userId, 3, '$vkID', '$vkNickname', '$token', '$token2', now(), now())";
		$db->queryInsert( $sql );
		UA_setCookie("UA_USER", $userId);
	}else{
		// Already Registered
		$userId = $row[0]['ua_user'];
		UA_setCookie("UA_USER", $userId);
	}
	$sql = "select * from ua_user where ua_user = $userId";
	$dataUser = $db->queryArray( $sql );
	$data['user'] = $dataUser[0];
	
	$sql = "select count(*) cnt from ua_user_trip where ua_user = ".$userId;
	$dataCnt = $db->queryArray( $sql );
	$data['cntPlanTrip'] = $dataCnt[0]['cnt'];
	
	$sql = "select * from ua_user_bucket where ua_user = $userId";
	$dataBucket = $db->queryArray( $sql );
	$data['bucketList'] = $dataBucket;
	
    $data['result'] = $result;
    $data['error'] = $error;
    
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
