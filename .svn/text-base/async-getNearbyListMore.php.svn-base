<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $locationId = $_POST['locationId'];
    $loadedLength = $_POST['loadedLength'];
    $userId = UA_getCookie("UA_USER");
    $currentTime = $_POST['currentTime'];
    
    $sql = "select t1.*, (ifnull( t2.ua_score, 0) + t1.ua_location_score) as ua_location_like_score, ifnull( t3.ua_like, 0) as ua_like_type
				 , hour(timediff( t1.ua_top_last_time, now())) as ua_hour
    			 , minute(timediff( t1.ua_top_last_time, now())) as ua_minute
    			 , second(timediff( t1.ua_top_last_time, now())) as ua_second
    			 , if(t1.ua_top_last_time > now(), 1, 0 ) as ua_highlight    
			  from ua_location t1
			  left join ( select sum( ua_like ) ua_score, ua_location from ua_user_location_like group by ua_location ) t2
			    on t1.ua_location = t2.ua_location
			  left join ua_user_location_like t3
			    on t1.ua_location = t3.ua_location and t3.ua_user = '$userId'
    		 where t1.ua_location = $locationId";
    $dataLocation = $db->queryArray( $sql );
    $dataLocation = $dataLocation[0];
    
    $locationType = $dataLocation['ua_location_type'];    
    // moved by jeni from detail == 1 : 2013-11-21
    
    $lat = $dataLocation['ua_location_lat'];
    $lon = $dataLocation['ua_location_lon'];
    
    $sql = "
    select distance( $lat, $lon, ua_location_lat, ua_location_lon ) distance, ua_location, ua_location_title, ua_location_subtitle, ua_location_photo
      from ua_location
     where ua_location_type = $locationType
       and ua_created_time < '$currentTime'
       and ua_valid_yn = 'Y'
       and ua_location != $locationId";
    if( $locationType == 1 ){
    	$sql.= " and ua_place_subcategory = ".$dataLocation['ua_place_subcategory'];
    	$tempLocationType = "locations";
    }else if( $locationType == 4 ){
    	$sql.= " and ua_news_category = ".$dataLocation['ua_news_category'];
    	$tempLocationType = "news";
    }else if( $locationType == 5 ){
    	$sql.= " and ua_eye_category = ".$dataLocation['ua_eye_category'];
    	$tempLocationType = "eye";
    }
    $sql.= "
     order by distance * 1 asc";
    $sql = "select *
    		  from (
    				select t.*, @rownum := @rownum + 1 AS rownum
    				  from (
    						$sql
    						) t, (select @rownum := 0 ) r
    				) tt
    		 where tt.rownum > $loadedLength
    		 limit 6";    
    $dataNearbyList = $db->queryArray( $sql );
    if( $dataNearbyList == null )
    	$dataNearbyList = array( );
    
    // comment rate calculate
    $data['locationType'] = $tempLocationType;
    $data['nearbyList'] = $dataNearbyList;    
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
