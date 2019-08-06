<?php

	session_start();

    require_once("./common/DB_Connection.php");

    require_once("./common/functions.php");

    require_once("./common/dataLog.php");    



    $result = "success";

    $error = "";

    $data = array();

    

    $userId = UA_getCookie( "UA_USER" );

    $locationId = $_POST['locationId'];    

    $locationTitle = $_POST['locationTitle'];

    $locationSubtitle = $_POST['locationSubtitle'];

    $locationAddress = $_POST['locationAddress'];

    $locationLat = $_POST['locationLat'];

    $locationLon = $_POST['locationLon'];

    $locationSubCategory = $_POST['locationSubCategory'];

    $locationPhoto = $_POST['locationPhoto'];

    $locationCity = $_POST['locationCity'];

    $locationZipCode = $_POST['locationZipCode'];

    $locationCountry = $_POST['locationCountry'];

    $locationState = $_POST['locationState'];

    $locationPhone = $_POST['locationPhone'];

    $locationEmail = $_POST['locationEmail'];

    $locationWebsite = $_POST['locationWebsite'];

    $locationKeywords = $_POST['locationKeywords'];

    $locationDescription = $_POST['locationDescription'];

    $locationType = $_POST['locationType'];

    $actionType = "";

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

        

    if( $locationId == "" ){

    	// Get Current Balance

    	$sql = "select * from ua_user where ua_user = $userId";

    	$dataUser = $db->queryArray( $sql );

    	$dataUser = $dataUser[0];

    	$validYn = "";

    	$actionType = "add";

    	if( $dataUser['ua_balance_amount'] >= PRICE_ADD_LOCATION ){

    		$validYn = "Y";

		}else{

			$validYn = "N";

		}

		$sql = "insert into ua_location( ua_location_title, ua_location_lat, ua_location_lon, ua_location_street_address, ua_location_photo, ua_location_city,

					ua_location_email, ua_location_zip, ua_location_country, ua_location_state, ua_location_phone, ua_location_website, ua_location_subtitle,

					ua_location_description, ua_location_type, ua_region, ua_keywords, ua_place_subcategory, ua_valid_yn, ua_created_by, ua_created_time, ua_updated_by, ua_updated_time )

				values( '".addslashes($locationTitle)."', $locationLat, $locationLon, '".addslashes($locationAddress)."', '$locationPhoto[0]', '$locationCity',

					'$locationEmail', '$locationZipCode', '$locationCountry','$locationState', '$locationPhone', '$locationWebsite', '".addslashes($locationSubtitle)."',

					'".addslashes($locationDescription)."', $locationType, $regionId, '$locationKeywords', $locationSubCategory, '$validYn', $userId, now(), $userId, now() )";

		$db->queryInsert( $sql );

		$locationId = $db->getPrevInsertId();


		if( $validYn == "Y" ){

			$sql = "update ua_user set ua_balance_amount = ua_balance_amount - ".PRICE_ADD_LOCATION." where ua_user = $userId";

			$db->query( $sql );

			

			$sql = "insert into ua_notification( ua_content, ua_description, ua_notification_type, ua_created_by, ua_created_time, ua_updated_time )

					value('Place( $locationTitle ) is added!', $locationId, 2, $userId, now(), now())";

			$db->queryInsert( $sql );			

		}

		

    }else{

    	$sql = "select ua_created_by from ua_location where ua_location = $locationId";

    	$createdBy = $db->queryArray( $sql );

    	$createdBy = $createdBy[0]['ua_created_by'];

    	if( $userId == $createdBy ){    	

	    	$sql = "update ua_location

	    			   set ua_location_title = '$locationTitle' , ua_location_lat = $locationLat , ua_location_lon = $locationLon

	    			     , ua_location_street_address = '".addslashes($locationAddress)."', ua_location_photo = '$locationPhoto[0]'

	    			     , ua_location_city = '$locationCity', ua_location_email = '$locationEmail', ua_location_zip = '$locationZipCode' 

	    			     , ua_location_country = '$locationCountry', ua_location_state = '$locationState', ua_location_phone = '$locationPhone'

	    			     , ua_location_website = '$locationWebsite', ua_location_subtitle = '$locationSubtitle'

	    			     , ua_region = $regionId

	    			     , ua_location_description = '".addslashes($locationDescription)."', ua_keywords= '$locationKeywords'

	    			     , ua_place_subcategory = '$locationSubCategory', ua_updated_by = $userId, ua_updated_time = now()

	    			 where ua_location = $locationId";

	    	$db->query( $sql );

	    	$actionType = "edit";

	    	

 	    	/* $sql = "insert into ua_notification( ua_content, ua_description, ua_notification_type, ua_created_by, ua_created_time, ua_updated_time )

	    			value('Place( $locationTitle ) is updated!', $locationId, 2, $userId, now(), now())";

	    	$db->queryInsert( $sql ); */

	    	

    	}else{

    		$result = "failed";

    		$error = "ERROR_UPDATE";    		

    	}	    	

    }
    $sql = "DELETE FROM ua_location_photo WHERE ua_location = '$locationId'";
    $db->query( $sql );
    if(count($locationPhoto) > 1){
        for( $i = 1 ; $i < count($locationPhoto) ; $i ++ ){
            $sql = "INSERT INTO ua_location_photo(ua_location, ua_photo)
            VALUES('$locationId', '".$locationPhoto[$i]."')";
            $db->queryInsert( $sql );
        }
    }
    
    $data['priceAddLocation'] = PRICE_ADD_LOCATION;

    $data['validYn'] = $validYn;

    $data['locationId'] = $locationId;

    $data['actionType'] = $actionType;

    $data['result'] = $result;

    $data['error'] = $error;

    header('Content-Type: application/json');

    echo json_encode($data);    

?>

