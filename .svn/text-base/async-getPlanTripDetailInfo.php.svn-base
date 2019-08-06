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
    $pos = $_POST['pos'];
    $pos ++;

    $url = "http://maps.googleapis.com/maps/api/directions/json?";
    $url.= "origin=$departure";
    $url.= "&destination=$destination";
    $url.= "&sensor=false";
    $url.= "&mode=driving";
    $url.= "&language=".SITE_LANGUAGE;

    $json = file_get_contents( $url );
    $info = json_decode( $json, true );
        
    $data['info'] = $info;
    $data['pos'] = $pos;
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);
?>
