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
    
	$sql = "
		select *
		  from
			(
			select ua_title as title, ua_news_category as id, ua_news_category as category, 0 as leaf
			  from ua_news_category
			 union all
			select ua_location_title as title, ua_location as id, ua_news_category as category, 1 as leaf
			  from ua_location
			 where ua_location_type = 4";
	if( $startDate != "" )
		$sql.= " and date(ua_created_time) >= '$startDate'";
	if( $endDate != "" )
		$sql.= " and date(ua_created_time) <= '$endDate'";
	$sql.="
			) as t1
		 order by category, leaf";
	$newsList = $db->queryArray($sql);
	if( $newsList == null )
		$newsList = array( );
	
    $data['newsList'] = $newsList;
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
