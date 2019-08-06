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
    $firstItemId = $_POST['firstItemId'];
		$sql="
			select t1.*, ifnull(t2.ua_like, 0) ua_like_count, ifnull(t2.ua_unlike, 0) ua_unlike_count, ifnull( t3.ua_like, 0) ua_liked
			  from
				(
				select t1.*, t2.ua_photo, t2.ua_username
				  from ua_location_comment t1, ua_user t2
				 where t1.ua_location = $locationId
				   and t1.ua_user = t2.ua_user
				   and t1.ua_created_time < '$currentTime'
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
			";
		$sql = "select *
				  from (
						select t.*, @rownum := @rownum + 1 AS rownum
						  from (
								$sql
								) t, (select @rownum := 0 ) r
						) tt
				 where tt.rownum > $loadedLength
				 limit 10";
		
    	$dataComment = $db->queryArray( $sql );
    	if( $dataComment == null )
    		$dataComment = array( );
    	$data['commentList'] = $dataComment;
    	
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
