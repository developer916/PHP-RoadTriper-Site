<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $reference = $_POST['reference'];


    $url = "https://maps.googleapis.com/maps/api/place/details/json?";
    $url.= "reference=".$reference;
    $url.= "&sensor=false";
    $url.= "&key=".GOOGLE_API_KEY;
    
    $json = file_get_contents( $url );
    $locationInfo = json_decode( $json, true );
    
    $data['locationInfo'] = $locationInfo;
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);
?>
