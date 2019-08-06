<?php
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");
            
    $sql = "select * from ua_location where ua_location_type in ( 1, 4, 5 ) order by ua_location desc";
    $result = $db->queryArray( $sql );
    for( $i = 0; $i < count( $result ); $i ++ ){
    	$country = "";
    	$region = "";    	
    	$address = $result[$i]['ua_location_lat'].",".$result[$i]['ua_location_lon'];
    	// echo $address."&nbsp;&nbsp;&nbsp;"; 
    	$url = "http://maps.google.com/maps/api/geocode/json?";
    	$url.= "address=".$address;
    	$url.= "&sensor=false";
    	
    	$location = file_get_contents( $url );
    	
    	$location = json_decode( $location );
    	for ( $j = 0; $j < count($location->results[0]->address_components); $j ++){

    		if( $location->results[0]->address_components[$j]->types[0] == "administrative_area_level_1" ){
    			$region = $location->results[0]->address_components[$j]->short_name;
    		}
    		if( $location->results[0]->address_components[$j]->types[0] == "country" ){
    			$country = $location->results[0]->address_components[$j]->short_name;
    		}
    	}
    	if( $country == "UA" ){
    		// echo $country."-".$region."<br>";
    		$sql = 'select * from ua_region where ua_title = "'.$region.'"';
    		 $regionInfo = $db->queryArray( $sql );
    		if( $regionInfo == null ){
	    		$sql = 'insert into ua_region(ua_title, ua_description, ua_code, ua_created_time, ua_updated_time)
	    				values( "'.$region.'", "", "", now(), now() )';
	    		$db->queryInsert( $sql );
	    		$regionId = $db->getPrevInsertId();
    		}else{
    			$regionId = $regionInfo[0]['ua_region'];
    		}
    		$sql = "update ua_location set ua_region = $regionId where ua_location = ".$result[$i]['ua_location'];
    		$db->query( $sql );
    	}else{
    		 
    	}    	
    }
	echo "FINISHED";    
?>
