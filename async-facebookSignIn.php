<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");
        
	$response = $_POST['response'];
	$accessToken = $_POST['accessToken'];

	$facebookID = $response['id'];
	$facebookName = $response['name'];
	$facebookEmail = $response['email'];
	$facebookUsername = $response['username'];
	$result = "success";

	$sql = "select * from ua_user_sns where ua_sns_type = 1 and ua_sns_id = '$facebookID'";
	$row = $db->queryArray( $sql );
	if( $row == null ){

		// Insert into UA_USER
		$sql = "insert into ua_user( ua_username, ua_email, ua_password, ua_photo, ua_balance_amount, ua_admin, ua_created_time, ua_updated_time)
				values('$facebookUsername', '$facebookEmail', '', 'http://graph.facebook.com/".$facebookID."/picture?type=small', 0, 'N', now(), now() )";
		$db->queryInsert($sql);
		$userId = $db->getPrevInsertId();
		UA_createImageDirectory( $userId );
		// Insert into UA_USER_SNS
		$sql = "insert into ua_user_sns( ua_user, ua_sns_type, ua_sns_id, ua_nickname, ua_token, ua_created_time, ua_updated_time )
			    values ( $userId, 1, '$facebookID', '$facebookName', '$accessToken', now(), now())";
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
	
	$sql = "select count(*) cnt from ua_user_trip where ua_user = ".$dataUser[0]['ua_user'];
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
