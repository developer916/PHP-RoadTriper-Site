<?php
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");
            
    $sql = "select * from ua_region";
    $result = $db->queryArray( $sql );
    for( $i = 0; $i < count( $result ); $i ++ ){
    	$address = $result[$i]['ua_title'];
    	// echo $address."&nbsp;&nbsp;&nbsp;"; 
    	$url = "http://maps.google.com/maps/api/geocode/json?";
    	$url.= "address=".urlencode($address);
    	$url.= "&sensor=false";
    	$location = file_get_contents( $url );
    	
    	$location = json_decode( $location );
    	$latLng = $location->results[0]->geometry->location->lat;
    	$latLng = $latLng.",".$location->results[0]->geometry->location->lng;
    	
    	$sql = 'update ua_region set ua_code = "'.$latLng.'" where ua_region = "'.$result[$i]['ua_region'].'"';
    	$db->query( $sql );
    }
	echo "FINISHED-FINISHED";    
?>
