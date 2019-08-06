<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $keyword = $_POST['keyword'];

    $url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?";
    $url.= "input=".urlencode($keyword);
    $url.= "&sensor=false";
    $url.= "&key=".GOOGLE_API_KEY;
    
    
    
    $json = file_get_contents( $url );
    $location = json_decode( $json, true );
    $location = $location['predictions'];
    
    $data['location'] = $location;
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);
?>
