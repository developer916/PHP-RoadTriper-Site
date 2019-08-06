<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $startDate = $_POST['startDate'];
    $endDate = $_POST['endDate'];
    $newsCategoryId = $_POST['newsCategoryId'];
    $cntLoaded = $_POST['cntLoaded'];
    $cntLazyLoad = CNT_LAZY_PIN;
        
	$sql = "select t1.*, t2.ua_category_marker
			  from ua_location t1, ua_news_category t2
			 where t1.ua_location_type = 4
			   and t1.ua_news_category = $newsCategoryId
			   and t1.ua_news_category = t2.ua_news_category";
	if( $startDate != "" )
		$sql.= " and date(t1.ua_created_time) >= '$startDate'";
	if( $endDate != "" )
		$sql.= " and date(t1.ua_created_time) <= '$endDate'";
	$sql.= " order by t1.ua_location";

	$sql = "
		select *
		  from (
			select t.*, @rownum := @rownum + 1 AS rownum
			  from (
				$sql
				) t, (select @rownum := 0 ) r
			) tt
		 where tt.rownum > $cntLoaded
	 	 limit $cntLazyLoad";	
	
	$newsList = $db->queryArray($sql);
	
	if( $newsList == null )
		$newsList = array( );
	
    $data['newsList'] = $newsList;
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
