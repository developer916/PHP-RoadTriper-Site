<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $locationIds = $_POST['locationIds'];
    $cntPlacesLoaded = $_POST['cntPlacesLoaded'];
    $cntLazyLoad = CNT_LAZY_RIGHTBAR;    
    
    $sql = "
		select t1.*, ifnull( t2.cnt, 0) ua_comment_cnt, (ifnull( t3.score, 0) + t1.ua_location_score) as ua_score
		  from ( select t1.*, t2.ua_name as ua_category_title
		  		   from ua_location t1 , ua_place_subcategory t2
		  		  where t1.ua_place_subcategory = t2.ua_place_subcategory
		  		  	and t1.ua_location in ( $locationIds )
		  		  	and t1.ua_location_type = 1 ) t1
		  left join (
		  	select count(*) cnt, ua_location
		  	  from ua_location_comment
		  	 group by ua_location
		  ) t2 on t1.ua_location = t2.ua_location
		  left join (
		  	select sum(ua_like) score, ua_location
		  	  from ua_user_location_like
		  	 group by ua_location
		  ) t3 on t1.ua_location = t3.ua_location";

    $sql = "select t1.*, t2.ua_place_category, t2.ua_name, t2.ua_subcategory_code, t2.ua_subcategory_image, t2.ua_subcategory_marker
    			 , hour(timediff( t1.ua_top_last_time, now())) as ua_hour
    			 , minute(timediff( t1.ua_top_last_time, now())) as ua_minute
    			 , second(timediff( t1.ua_top_last_time, now())) as ua_second
    			 , if(t1.ua_top_last_time > now(), 1, 0 ) as ua_highlight
    		  from ( $sql ) t1, ua_place_subcategory t2
             where t1.ua_place_subcategory = t2.ua_place_subcategory";
    
    $sql = "select t1.*
              from (
    		select t1.*
    		  from ( $sql ) t1
    		 where ifnull(t1.ua_top_last_time,'2013-01-01 00:00:00') >= now()
    		 order by t1.ua_top_time desc, t1.ua_created_time desc ) t1
    		 union all
    		select t2.*
    		  from (
    		select t2.*
    		  from ( $sql ) t2
    		 where ifnull(t2.ua_top_last_time,'2013-01-01 00:00:00') < now()
    		 order by t2.ua_score desc, t2.ua_created_time desc ) t2";
    $sql = "
   		select *
    	  from(
    		select t.*, @rownum := @rownum + 1 AS rownum
    		  from (
    			$sql
    		) t, (select @rownum := 0 ) r
    	) tt
    	 where tt.rownum > $cntPlacesLoaded
    	 limit $cntLazyLoad";
    $locationList = $db->queryArray( $sql );
    if( $locationList == null )
    	$locationList = array( );
    
    $data['locationList'] = $locationList;
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>