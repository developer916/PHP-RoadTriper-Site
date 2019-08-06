<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $username = $_POST['username'];
    $password = $_POST['password'];
    $email = $_POST['email'];
    
    $sql = "select * from ua_user where ua_email = '$email' or ua_username = '$username'";
    $dataResult = $db->queryArray( $sql );
    if( $dataResult == null ){
	    $sql = "insert into ua_user( ua_username, ua_email, ua_password, ua_user_type, ua_photo, ua_balance_amount, ua_admin, ua_created_time, ua_updated_time)
	    		values( '$username', '$email', md5('$password'), 'N', '".NO_PROFILE_PHOTO."', 0, 'N', now(), now() )";
	    $db->queryInsert( $sql );
	    $userId = $db->getPrevInsertId();
	    UA_createImageDirectory( $userId );
	    
	    UA_setCookie( "UA_USER", $userId );
	
	    $sql = "select count(*) cnt from ua_user_trip where ua_user = ".$userId;
	    $dataCnt = $db->queryArray( $sql );
	    
	    $data['cntPlanTrip'] = $dataCnt[0]['cnt'];
	    
	    $sql = "select * from ua_user_bucket where ua_user = $userId";
	    $dataBucket = $db->queryArray( $sql );
	    
	    $data['bucketList'] = $dataBucket;
	    
	    $sql = "select * from ua_user where ua_user = $userId";
	    $dataUser = $db->queryArray( $sql );
	    
	    $data['user'] = $dataUser[0];
	}else{
		$result = "failed";
	}
    
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>