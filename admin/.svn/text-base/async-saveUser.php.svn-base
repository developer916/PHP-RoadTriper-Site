<?php

	session_start();

    require_once("../common/DB_Connection.php");

    require_once("../common/functions.php");

    require_once("../common/dataLog.php");    



    $result = "success";

    $error = "";

    $data = array();

    

    $userId = $_POST['userId'];

    $userName = $_POST['userName'];

    $email = $_POST['email'];

    $userType = $_POST['userType'];

    $photo = $_POST['photo'];

    $admin = $_POST['admin'];

    $currentPassword = $_POST['currentPassword'];

    $newPassword = $_POST['newPassword'];

    
    if( $userId == ""){

    	$sql = "insert into ua_user( ua_username, ua_email, ua_password, ua_photo, ua_user_type, ua_balance_amount, ua_admin, ua_created_time, ua_updated_time)

    	value( '$userName', '$email', md5('$newPassword'), '$photo', '$userType', 0, '$admin', now(), now() )";


    	$db->queryInsert( $sql );

		$userId = $db->getPrevInsertId();

    	UA_MkDir( BLOG_UPLOAD_PATH."/".$userId );

    	UA_MkDir( PAGE_UPLOAD_PATH."/".$userId );

    	UA_MkDir( NEWS_UPLOAD_PATH."/".$userId );

    	UA_MkDir( LOCATION_UPLOAD_PATH."/".$userId );

    }else{

    	if( $currentPassword != "" ){

    		$sql = "select * from ua_user where ua_user = $userId and ua_password = md5('$currentPassword')";

    		$dataUser = $db->queryArray( $sql );

    		if( count( $dataUser ) == 0 ){

    			$result = "error";

    		}

    	}

    	if( $result == "success" ){

	    	$sql = "update ua_user

	    			   set ua_username = '$userName'

	    			     , ua_email = '$email'";

	    	if( $newPassword != "" ){

	    		$sql.= "     , ua_password = md5('$newPassword')";

	    	}

	    	$sql.= "     , ua_photo = '$photo'

	    			     , ua_user_type = '$userType'

	    			     , ua_admin = '$admin'

	    			     , ua_updated_time = now() 

	    			 where ua_user = $userId";

	    	$db->query( $sql );

    	}

    }

    $data['result'] = $result;

    $data['error'] = $error;

    header('Content-Type: application/json');
    echo json_encode($data);    

?>

