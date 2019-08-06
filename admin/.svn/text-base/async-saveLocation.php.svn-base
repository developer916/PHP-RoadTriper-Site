<?php
	session_start();
    require_once("../common/DB_Connection.php");
    require_once("../common/functions.php");
    require_once("../common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
        
    $locationId = $_POST['locationId'];
    $locationInfo = $_POST['locationInfo'];
    $locationTitle = $_POST['locationTitle'];
    $locationLat = $_POST['locationLat'];
    $locationLon = $_POST['locationLon'];
    $locationStreetAddress = $_POST['locationStreetAddress'];
    $locationCity = $_POST['locationCity'];
    $locationZip = $_POST['locationZip'];
    $locationCountry = $_POST['locationCountry'];
    $locationState = $_POST['locationState'];
    $locationPhone = $_POST['locationPhone'];
    $locationEmail = $_POST['locationEmail'];   
    $locationphoto = $_POST['locationImage'];
    $locationWebsite = $_POST['locationWebsite'];
    $locationSubtitle = $_POST['locationSubtitle'];
    $locationDescription = $_POST['locationDescription'];
    $locationKeyWords = $_POST['locationKeyWords'];
    $locationScore = $_POST['locationScore'];
    $locationCategory = $_POST['locationCategory'];
    $locationPaid = $_POST['locationPaid'];
    
    $createdBy = $_SESSION['UA_ADMIN_USER'];
  	$UpdatedBy = $_SESSION['UA_ADMIN_USER'];
  	
  	// ---- Region Start ----
  	$url = "http://maps.google.com/maps/api/geocode/json?";
  	$url.= "address=".$locationLat.",".$locationLon;
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
  		$url = "http://maps.google.com/maps/api/geocode/json?";
  		$url.= "address=".urlencode($region);
  		$url.= "&sensor=false";
  		$location = file_get_contents( $url );
  		$location = json_decode( $location );
  		$latLng = $location->results[0]->geometry->location->lat;
  		$latLng = $latLng.",".$location->results[0]->geometry->location->lng;
  		
  		
  		// echo $country."-".$region."<br>";
  		$sql = 'select * from ua_region where ua_code = "'.$latLng.'"';
  		$regionInfo = $db->queryArray( $sql );
  		if( $regionInfo == null ){
  			$sql = 'insert into ua_region(ua_title, ua_description, ua_code, ua_created_time, ua_updated_time)
	    				values( "'.$region.'", "", "'.$latLng.'", now(), now() )';
  			$db->queryInsert( $sql );
  			$regionId = $db->getPrevInsertId();
  		}else{
  			$regionId = $regionInfo[0]['ua_region'];
  		}
  	}else{
  		$regionId = null;
  	}
  	// ---- Region End ----  	
  	
    if( $locationId == ""){
    	$sql = "insert into ua_location( ua_location_info, ua_location_title, ua_location_lat, ua_location_lon, ua_place_subcategory, ua_location_street_address, ua_location_city , ua_location_zip , ua_location_country , ua_location_state , ua_location_phone , ua_location_email , ua_location_photo , ua_location_website , ua_location_subtitle , ua_location_description , ua_region, ua_keywords , ua_valid_yn, ua_created_by , ua_created_time, ua_updated_by, ua_updated_time)
    		value('$locationInfo', '$locationTitle', '$locationLat', '$locationLon', '$locationCategory', '".addslashes($locationStreetAddress)."', '$locationCity', '$locationZip', '$locationCountry', '$locationState', '$locationPhone', '$locationEmail', '$locationphoto[0]', '$locationWebsite', '$locationSubtitle', '".addslashes($locationDescription)."', $regionId,'$locationKeyWords', '$locationPaid', '$createdBy' , now() , '$UpdatedBy', now() )";
    	$db->queryInsert( $sql );

    	$locationId = $db->getPrevInsertId();
    	if( $locationPaid == "Y" ){    		
	    	$sql = "insert into ua_notification( ua_content, ua_description, ua_notification_type, ua_created_by, ua_created_time, ua_updated_time )
	    		value('Place( $locationTitle ) is added!', $locationId, 2, $createdBy, now(), now())";
	    	$db->queryInsert( $sql );
    	}   
    }else{
    	$sql = "update ua_location
    			   set ua_location_info = '$locationInfo'
    			     , ua_location_title = '$locationTitle'
    			     , ua_location_lat = $locationLat
    			     , ua_location_lon = $locationLon
    			     , ua_location_street_address = '".addslashes($locationStreetAddress)."'
    			     , ua_location_city  = '$locationCity'
    			     , ua_location_zip  = '$locationZip'
    			     , ua_location_country  = '$locationCountry'
    			     , ua_location_state  = '$locationState'
    			     , ua_location_phone  = '$locationPhone'
    			     , ua_location_email  = '$locationEmail'
    			     , ua_location_photo  = '$locationphoto[0]'
    			     , ua_location_website  = '$locationWebsite'
    			     , ua_location_subtitle  = '$locationSubtitle'
    			     , ua_location_description  = '".addslashes($locationDescription)."'
    			     , ua_keywords = '$locationKeyWords'
    			     , ua_place_subcategory = '$locationCategory'
    			     , ua_region = $regionId
    			     , ua_updated_by = '$UpdatedBy'
    			     , ua_updated_time = now() 
    			     , ua_valid_yn = '$locationPaid'
    			 where ua_location = $locationId";
    	$db->query( $sql );
    	/*
    	$sql = "insert into ua_notification( ua_content, ua_description, ua_notification_type, ua_created_by, ua_created_time, ua_updated_time )
    		value('Place( $locationTitle ) is updated!', $locationId, 2, $createdBy, now(), now())";
    	$db->queryInsert( $sql );
    	*/
    }
    $sql = "DELETE FROM ua_location_photo WHERE ua_location = '$locationId'";
    $db->query( $sql );
    if(count($locationphoto) > 1){
      for( $i = 1 ; $i < count($locationphoto) ; $i ++ ){
        $sql = "INSERT INTO ua_location_photo(ua_location, ua_photo)
                     VALUES('$locationId', '".$locationphoto[$i]."')";
        $db->queryInsert( $sql );
      }
    }
    
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
