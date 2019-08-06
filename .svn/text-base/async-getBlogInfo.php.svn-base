<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $blogId = $_POST['blogId'];
    $userId = UA_getCookie("UA_USER");
    
    $sql = "
		select t1.*, t2.ua_title ua_blog_title, datediff( now(), t1.ua_created_time ) as ua_day_ago, t3.ua_username as ua_username
		  from ua_blog t1, ua_blog_category t2, ua_user t3
		 where t1.ua_blog_category = t2.ua_blog_category
		   and t1.ua_user = t3.ua_user
		   and t1.ua_blog = $blogId";
    $dataBlog = $db->queryArray( $sql );
    
    $sql="
    select t1.*, ifnull(t2.ua_like, 0) ua_like_count, ifnull(t2.ua_unlike, 0) ua_unlike_count, ifnull( t3.ua_like, 0) ua_liked
      from
	    (
	    select t1.*, t2.ua_photo, t2.ua_username
	    from ua_blog_comment t1, ua_user t2
	    where t1.ua_blog = $blogId
	    and t1.ua_user = t2.ua_user
	    ) t1 
	  left join
	    (
	    select sum(if(ua_like = 1, 1, 0)) ua_like, sum(if(ua_like = -1, 1, 0)) ua_unlike, ua_comment
	    from ua_user_comment_like
	    where ua_comment_type = 2
	    group by ua_comment
	    ) t2 on t1.ua_blog_comment = t2.ua_comment
      left join
	    (
	    select ua_like, ua_comment
	    from ua_user_comment_like
	    where ua_comment_type = 2
	    and ua_user = '$userId'
	    ) t3 on t1.ua_blog_comment = t3.ua_comment
     order by t1.ua_created_time
    ";    
    
    $dataComment = $db->queryArray( $sql );
    if( $dataComment == null )
    	$dataComment = array( );
    $data['commentList'] = $dataComment;
    
    $data['blog'] = $dataBlog[0];
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>