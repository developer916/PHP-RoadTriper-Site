<?php
	session_start();
    require_once("../common/DB_Connection.php");
    require_once("../common/functions.php");
    require_once("../common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
        
    $createdBy = UA_getCookie("UA_USER");
    $eyeLocationId = $_POST['eyeLocationId'];
    $eyeCategoryId = $_POST['eyeCategoryId'];
    $eyeTitle = $_POST['eyeTitle'];
    $eyeImage = $_POST['eyeImage'];
    $eyeContent = $_POST['eyeContent'];
    $eyeLat = $_POST['eyeLat'];
  	$eyeLon = $_POST['eyeLon'];
  	$eyeKeyWords =$_POST['eyeKeyWords'];
  	$eyeAddress =$_POST['eyeAddress'];
  	$eyeVideo =$_POST['eyeVideo'];
  	$createdBy = $_SESSION['UA_ADMIN_USER'];
  	$updatedBy = $_SESSION['UA_ADMIN_USER'];
  	
  	// ---- Region Start ----
  	$url = "http://maps.google.com/maps/api/geocode/json?";
  	$url.= "address=".$eyeLat.",".$eyeLon;
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
  	
    if( $eyeLocationId == ""){
    	$sql = "insert into ua_location (ua_location_title, ua_keywords, ua_location_lat, ua_location_lon, ua_location_photo, ua_eye_category, ua_location_description, ua_location_street_address, ua_eye_video, ua_location_type, ua_region, ua_valid_yn, ua_created_time, ua_updated_time, ua_created_by, ua_updated_by )
 				 value('$eyeTitle', '$eyeKeyWords', '$eyeLat','$eyeLon', '$eyeImage', '$eyeCategoryId', '".addslashes($eyeContent)."', '$eyeAddress', '$eyeVideo', '5', $regionId, 'Y', now(), now(), $createdBy, $updatedBy )";
    	$db->queryInsert( $sql );
    	
    	$eyeLocationId = $db->getPrevInsertId();
    	$sql = "insert into ua_notification( ua_content, ua_description, ua_notification_type, ua_created_by, ua_created_time, ua_updated_time )
    		    value('Eye( $eyeTitle ) is added!', $eyeLocationId, 4, $createdBy, now(), now())";
    	$db->queryInsert( $sql );    	    	
    }else{
    	$sql = "update ua_location
    			   set ua_location_title = '$eyeTitle'
    			   	 , ua_keywords= '$eyeKeyWords'
    			     , ua_location_lat = '$eyeLat'
    			     , ua_location_lon = '$eyeLon'
    			     , ua_location_photo = '$eyeImage[0]'
    			     , ua_eye_category = '$eyeCategoryId'
    			     , ua_location_description = '".addslashes($eyeContent)."'
    			     , ua_location_street_address = '$eyeAddress'
    			     , ua_location_type = '5'
    			     , ua_eye_video = '$eyeVideo'
    			     , ua_region = $regionId
    			     , ua_updated_time = now()
    			     , ua_updated_by = $updatedBy
    			 where ua_location = $eyeLocationId";
    	$db->query( $sql );
    	
    	$sql = "insert into ua_notification( ua_content, ua_description, ua_notification_type, ua_created_by, ua_created_time, ua_updated_time )
    			 value('Eye( $eyeTitle ) is updated!', $eyeLocationId, 4, $createdBy, now(), now())";
    	$db->queryInsert( $sql );    	
    }
    $sql = "DELETE FROM ua_location_photo WHERE ua_location = '$eyeLocationId'";
    $db->query( $sql );
    if(count($eyeImage) > 1){
        for( $i = 1 ; $i < count($eyeImage) ; $i ++ ){
            $sql = "INSERT INTO ua_location_photo(ua_location, ua_photo)
            VALUES('$eyeLocationId', '".$eyeImage[$i]."')";
            $db->queryInsert( $sql );
        }
    }
    
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
