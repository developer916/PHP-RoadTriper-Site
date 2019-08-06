<?php
	session_start();
    require_once("../common/DB_Connection.php");
    require_once("../common/functions.php");
    require_once("../common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $createdBy = $_SESSION['UA_ADMIN_USER'];
    $newsLocationId = $_POST['newsLocationId'];
    $newsCategoryId = $_POST['newsCategoryId'];
    $newsTitle = $_POST['newsTitle'];
    $newsRegion = $_POST['newsRegion'];
    $newsWhat = $_POST['newsWhat'];
    $newsWhen = $_POST['newsWhen'];
    $newsWho = $_POST['newsWho'];
    $newsWhere = $_POST['newsWhere'];
    $newsBds = $_POST['newsBds'];
    $newsActionTaken = $_POST['newsActionTaken'];
    $newsImage = $_POST['newsImage'];
    $newsContent = $_POST['newsContent'];
    $newsLat = $_POST['newsLat'];
  	$newsLon = $_POST['newsLon'];
  	$newsKeyWords =$_POST['newsKeyWords'];
  	$newsAddress =$_POST['newsAddress'];
  	
  	$createdBy = $_SESSION['UA_ADMIN_USER'];
  	$updatedBy = $_SESSION['UA_ADMIN_USER'];  	

  	// ---- Region Start ----
  	$url = "http://maps.google.com/maps/api/geocode/json?";
  	$url.= "address=".$newsLat.",".$newsLon;
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
  	    	
  	
    if( $newsLocationId == ""){
    	$sql = "insert into ua_location (ua_location_title, ua_keywords, ua_location_lat, ua_location_lon, ua_location_photo, ua_news_category, ua_news_region, ua_news_who, ua_news_what, ua_news_where, ua_news_when, ua_news_bda, ua_news_action_taken, ua_location_description, ua_location_street_address,  ua_location_type, ua_region, ua_valid_yn, ua_created_time, ua_updated_time, ua_created_by, ua_updated_by )
 				 value('$newsTitle', '$newsKeyWords', '$newsLat','$newsLon', '$newsImage', '$newsCategoryId',  '$newsRegion', '$newsWho', '$newsWhat', '$newsWhere', '$newsWhen', '$newsBds', '$newsActionTaken', '".addslashes($newsContent)."', '$newsAddress', '4', $regionId, 'Y', now(), now(), '$createdBy', '$updatedBy')";
    	$db->queryInsert( $sql );
    	$newsLocationId = $db->getPrevInsertId();
    	
    	$sql = "insert into ua_notification( ua_content, ua_description, ua_notification_type, ua_created_by, ua_created_time, ua_updated_time )
    			 value('News( $newsTitle ) is added!', $newsLocationId, 3, $createdBy, now(), now())";
    	$db->queryInsert( $sql );    	
    }else{
    	$sql = "update ua_location
    			   set ua_location_title = '$newsTitle'
    			   	 , ua_keywords= '$newsKeyWords'
    			     , ua_location_lat = '$newsLat'
    			     , ua_location_lon = '$newsLon'
    			     , ua_location_photo = '$newsImage[0]'
    			     , ua_news_category = '$newsCategoryId'
    			     , ua_news_region = '$newsRegion'
    			     , ua_news_who = '$newsWho'
    			     , ua_news_what = '$newsWhat'
    			     , ua_news_where = '$newsWhere'
    			     , ua_news_when = '$newsWhen'
    			     , ua_news_bda = '$newsBds'
    			     , ua_news_action_taken = '$newsActionTaken'
    			     , ua_location_description = '".addslashes($newsContent)."'
    			     , ua_location_street_address = '$newsAddress'
    			     , ua_location_type = '4'
    			     , ua_region = $regionId
    			     , ua_updated_time = now()
    			     , ua_updated_by = '$updatedBy'
    			 where ua_location = $newsLocationId";
    	$db->query( $sql );
    	
    	$sql = "insert into ua_notification( ua_content, ua_description, ua_notification_type, ua_created_by, ua_created_time, ua_updated_time )
    			 value('News( $newsTitle ) is updated!', $newsLocationId, 3, $createdBy, now(), now())";
    	$db->queryInsert( $sql );    	
    }
    $sql = "DELETE FROM ua_location_photo WHERE ua_location = '$newsLocationId'";
    $db->query( $sql );
    if(count($newsImage) > 1){
        for( $i = 1 ; $i < count($newsImage) ; $i ++ ){
            $sql = "INSERT INTO ua_location_photo(ua_location, ua_photo)
            VALUES('$newsLocationId', '".$newsImage[$i]."')";
            $db->queryInsert( $sql );
        }
    }
 
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
