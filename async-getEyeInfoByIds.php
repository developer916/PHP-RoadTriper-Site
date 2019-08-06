<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $eyeIds = $_POST['eyeIds'];
    $cntEyeLoaded = $_POST['cntEyeLoaded'];
    $cntLazyLoad = CNT_LAZY_RIGHTBAR;
    
    $sql = "
    	select p1.*, ifnull( p2.cnt, 0) ua_comment_cnt, ifnull( p3.score, 0) ua_score
    	  from (	
			select t1.*, t2.ua_title as ua_category_title
			  from ua_location t1, ua_eye_category t2 
			 where t1.ua_location_type = 5
			   and t1.ua_location in ( $eyeIds )
			   and t1.ua_eye_category = t2.ua_eye_category ) p1
			  left join (
			  	select count(*) cnt, ua_location
			  	  from ua_location_comment
			  	 group by ua_location
			   ) p2 on p1.ua_location = p2.ua_location
			  left join (
			  	select sum(ua_like) score, ua_location
			  	  from ua_user_location_like
			  	 group by ua_location
			   ) p3 on p1.ua_location = p3.ua_location			    
		 order by ifnull(p3.score,0) desc, p1.ua_created_time desc";
	$sql = "
		select *
		  from(
			select t.*, @rownum := @rownum + 1 AS rownum
			  from (
				$sql
			) t, (select @rownum := 0 ) r
		) tt
		 where tt.rownum > $cntEyeLoaded
		 limit $cntLazyLoad";
    $eyeList = $db->queryArray( $sql );
    if( $eyeList == null )
    	$eyeList = array( );
    
    $data['eyeList'] = $eyeList;
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>