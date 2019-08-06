<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $departure = $_POST['departure'];
    $destination = $_POST['destination'];
    
    $url = "http://maps.googleapis.com/maps/api/distancematrix/json?";
    $url.= "origins=".$departure;
    $url.= "&destinations=".$destination;
    $url.= "&mode=driving";
    $url.= "&sensor=false";
    
    $json = file_get_contents( $url );
	$info = json_decode( $json, true );    
    
    $data['info'] = $info;
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
