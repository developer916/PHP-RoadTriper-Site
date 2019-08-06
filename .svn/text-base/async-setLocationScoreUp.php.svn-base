<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $locationId = $_POST['locationId'];
    $userId = UA_getCookie("UA_USER");

    $sql = "select * from ua_user where ua_user = $userId";
    $dataUser = $db->queryArray( $sql );
    $dataUser = $dataUser[0];
    if( $dataUser['ua_balance_amount'] >= PRICE_LOCATION_SCORE_UP ){
    	$sql = "update ua_user
    		   	   set ua_balance_amount = ua_balance_amount - ".PRICE_LOCATION_SCORE_UP;
    	$sql.= " where ua_user = $userId";
    	$db->query( $sql );
    	
    	$sql = "update ua_location
    			   set ua_location_score = ua_location_score + 1
    			 where ua_location = $locationId";
    	$db->query( $sql );    	    	
    }else{
    	$result = "failed";
    	$error = "ERROR_DEPOSIT";
    }
    
    $data['priceLocationScoreUp'] = PRICE_LOCATION_SCORE_UP;
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
