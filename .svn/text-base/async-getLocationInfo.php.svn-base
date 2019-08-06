<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $locationId = $_POST['locationId'];
    $detail = $_POST['detail'];
    $userId = UA_getCookie("UA_USER");
    
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
    
    $data['location'] = $dataLocation;
    
    if( $detail == '1' ){
    	
	    $sql = "SELECT r1.*, (r1.ua_like_count - r1.ua_unlike_count) AS result 
		          FROM (
			        select t1.*, ifnull(t2.ua_like, 0) ua_like_count, ifnull(t2.ua_unlike, 0) ua_unlike_count, ifnull( t3.ua_like, 0) ua_liked
					  from
						(
						select t1.*, t2.ua_photo, t2.ua_username
						  from ua_location_comment t1, ua_user t2
						 where t1.ua_location = $locationId
						   and t1.ua_user = t2.ua_user
						   and if(t1.ua_comment != '', true, false) 
						   order by t1.ua_created_time desc
						) t1 left join
						(
						select sum(if(ua_like = 1, 1, 0)) ua_like, sum(if(ua_like = -1, 1, 0)) ua_unlike, ua_comment
						  from ua_user_comment_like
						 where ua_comment_type = 1
						group by ua_comment
						) t2 on t1.ua_location_comment = t2.ua_comment
						left join
						(
					   select ua_like, ua_comment
						 from ua_user_comment_like
					 	where ua_comment_type = 1
						  and ua_user = '$userId'
						) t3
						on t1.ua_location_comment = t3.ua_comment
					order by t1.ua_created_time desc
				)r1 ORDER BY result DESC LIMIT 1";
	    $dataCommentFirstItem = $db->queryArray( $sql );
	    if( $dataCommentFirstItem == null )
	    	$dataCommentFirstItem = array( );
	    else{
	    	$commentFirstItemId = $dataCommentFirstItem[0]['ua_comment_rate'];
	    }
	    $data['commentFirstItem'] = $dataCommentFirstItem[0];
	    
		$sql="
			select t1.*, ifnull(t2.ua_like, 0) ua_like_count, ifnull(t2.ua_unlike, 0) ua_unlike_count, ifnull( t3.ua_like, 0) ua_liked
			  from
				(
				select t1.*, t2.ua_photo, t2.ua_username
				  from ua_location_comment t1, ua_user t2
				 where t1.ua_location = $locationId
				   and t1.ua_user = t2.ua_user
				   and if(t1.ua_comment != '', true, false) 
				 order by t1.ua_created_time desc
				) t1 left join
				(
				select sum(if(ua_like = 1, 1, 0)) ua_like, sum(if(ua_like = -1, 1, 0)) ua_unlike, ua_comment
				  from ua_user_comment_like
				 where ua_comment_type = 1
				 group by ua_comment
				) t2 on t1.ua_location_comment = t2.ua_comment 
				left join 
				(
				select ua_like, ua_comment
			          from ua_user_comment_like
				 where ua_comment_type = 1
				   and ua_user = '$userId'
				) t3
				on t1.ua_location_comment = t3.ua_comment
			 order by t1.ua_created_time desc limit 10";
    	$dataComment = $db->queryArray( $sql );
    	if( $dataComment == null )
    		$dataComment = array( );
    	$data['commentList'] = $dataComment;
    	
    	$sql = "SELECT IFNULL(t2.ua_like, 0) ua_like_count, IFNULL(t2.ua_unlike, 0) ua_unlike_count, IFNULL( t3.ua_like, 0) ua_liked
                  FROM
                	(
                	SELECT SUM(IF(ua_like = 1, 1, 0)) ua_like, SUM(IF(ua_like = -1, 1, 0)) ua_unlike, ua_comment, ua_location
                	  FROM ua_user_comment_like
                	 WHERE ua_comment_type = 1
                	   AND ua_location = '$locationId'
                	 GROUP BY ua_location
                	) t2
                	LEFT JOIN
                	(
                	SELECT ua_like, ua_comment, ua_location, ua_created_time
                	  FROM ua_user_comment_like
                	 WHERE ua_comment_type = 1
                	   AND ua_user = '$userId'
                	) t3
                	ON t3.ua_location = '$locationId'
                	ORDER BY t3.ua_created_time DESC";
    	$dataMainDescriptionRating = $db->queryArray( $sql );
    	if( $dataMainDescriptionRating == null )
    	    $dataMainDescriptionRating = array( );
    	else{
    	    $dataMainDescriptionRating = $dataMainDescriptionRating[0];
    	}
    	$data['mainDescriptionRating'] = $dataMainDescriptionRating;
    }
    $locationType = $dataLocation['ua_location_type'];    
    // moved by jeni from detail == 1 : 2013-11-21
    if( $locationType == 1 ){
    	$placeCategoryId = $dataLocation['ua_place_subcategory'];
    	$sql = "select t1.ua_place_subcategory, t1.ua_name, t2.ua_category_marker, t2.ua_category_image
    			  from ua_place_subcategory t1, ua_place_category t2
    			 where t1.ua_place_subcategory = $placeCategoryId
    	  		   and t1.ua_place_category = t2.ua_place_category";
    }else if( $locationType == 4 ){
    	$newsCategoryId = $dataLocation['ua_news_category'];
    	$sql = "select ua_news_category as ua_place_subcategory, ua_title as ua_name, ua_category_marker, ua_category_image
    	          from ua_news_category
			  	 where ua_news_category = $newsCategoryId";
    }else if( $locationType == 5 ){
    	$eyeCategoryId = $dataLocation['ua_eye_category'];
    	$sql = "select ua_eye_category as ua_place_subcategory, ua_title as ua_name, ua_category_marker, ua_category_image
    	          from ua_eye_category
			  	 where ua_eye_category = $eyeCategoryId";
    }
    $dataCategory = $db->queryArray( $sql );
    if( $dataCategory == null )
    	$dataCategory = array( );
    $data['categoryList'] = $dataCategory;
    
    $lat = $dataLocation['ua_location_lat'];
    $lon = $dataLocation['ua_location_lon'];
    
    $sql = "
    select distance( $lat, $lon, ua_location_lat, ua_location_lon ) distance, ua_location, ua_location_title, ua_location_subtitle, ua_location_photo
      from ua_location
     where ua_location_type = $locationType
       and ua_valid_yn = 'Y'
       and ua_location != $locationId";
    if( $locationType == 1 ){
    	$sql.= " and ua_place_subcategory = ".$dataLocation['ua_place_subcategory'];
    }else if( $locationType == 4 ){
    	$sql.= " and ua_news_category = ".$dataLocation['ua_news_category'];
    }else if( $locationType == 5 ){
    	$sql.= " and ua_eye_category = ".$dataLocation['ua_eye_category'];
    }
    $sql.= "
     order by distance * 1 asc
     limit 6";
    
    $dataNearbyList = $db->queryArray( $sql );
    if( $dataNearbyList == null )
    	$dataNearbyList = array( );
    
    // comment rate calculate
    $sql = "SELECT COUNT(ua_comment_rate) AS cntRates, ROUND(AVG(ua_comment_rate), 1) AS avgRates 
    		  FROM ua_location_comment 
             WHERE ua_created_time IN ( SELECT MAX(ua_created_time) FROM ua_location_comment WHERE ua_comment_rate > 0 AND ua_location = $locationId GROUP BY ua_user )
             ORDER BY ua_created_time DESC";
    $avgUserCommentRate = $db->queryArray($sql);
    if( $avgUserCommentRate == null )
        $avgUserCommentRate = array( );
    $avgUserCommentRate = $avgUserCommentRate[0];
//     foreach ($avgUserCommentRate as $k => $v) {
//         $commentTotalRate += $v['avgRates'];
//     }
//     $commentCntRates = count($avgUserCommentRate);
//     $commentAvgRate = round(($commentTotalRate / $commentCntRates), 1);
//     if ($commentCntRates == "1" && $avgUserCommentRate[0]['cntRates'] == "0") {
//         $commentCntRates = 0;
//     }
    //get location attached images
    $sql = "SELECT * FROM ua_location_photo WHERE ua_location = $locationId";
	$locationPhoto = $db->queryArray($sql);
    if( $locationPhoto == null )
    	$locationPhoto = array( );
    
    $data['nearbyList'] = $dataNearbyList;    
	$data['avgCommentRates'] = $avgUserCommentRate;
	$data['cntCommentRates'] = $commentCntRates;
	$data['locationSmallThumb'] = $locationPhoto;
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
