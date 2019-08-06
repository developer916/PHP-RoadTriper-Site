<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $address = $_POST['address'];
    
    $url = "http://maps.googleapis.com/maps/api/geocode/json?";
    $url.= "address=".urlencode($address);
    $url.= "&sensor=false";

    $json = file_get_contents( $url );
    $location = json_decode( $json, true );
    if( $location['status'] == "OK")
    	$location = $location['results'];
    else{
    	$result = "failed";
    }
        
    $data['location'] = $location; 
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
