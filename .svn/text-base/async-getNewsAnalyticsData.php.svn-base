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
	$region = $_POST['region'];
	
	$subSql = "
			select date( ua_created_time ) as ua_created_date
			  from ua_location
			 where ua_location_type = 4";
	if( $region != "" )
		$subSql.=" and ua_region = $region";
	if( $startDate != "" )
		$subSql.=" and date(ua_created_time) >= '$startDate'";
	if( $endDate != "" )
		$subSql.=" and date(ua_created_time) <= '$endDate'";
	
	$subSql.=" group by date( ua_created_time )";
	
	
	$sql = "
		select t1.ua_created_date, t1.ua_news_title, ifnull( t2.cnt, 0) cnt
		  from (
			select t1.ua_created_date, t2.ua_news_category, t2.ua_title as ua_news_title
			  from (
				$subSql
				) t1, ua_news_category t2
			) t1
		  left join (
			select count(*) cnt, date( ua_created_time ) as ua_created_date, ua_news_category
			  from ua_location
			 where ua_location_type = 4";
	
	if( $region != "" )
		$sql.=" and ua_region = $region";
	if( $startDate != "" )
		$sql.=" and date(ua_created_time) >= '$startDate'";
	if( $endDate != "" )
		$sql.=" and date(ua_created_time) <= '$endDate'";		
	
	$sql.= " group by date( ua_created_time ), ua_news_category ) t2 on t1.ua_created_date = t2.ua_created_date and t1.ua_news_category = t2.ua_news_category
			order by t1.ua_news_title, t1.ua_created_date";

	$dataList = $db->queryArray( $sql );	
	$dateList = $db->queryArray( $subSql );
	
	if( $dataList == null ) $dataList = array( );
	if( $dateList == null ) $dateList = array( );
	$newDateList = array( );
	for( $i = 0; $i < count( $dateList ); $i ++ ){
		$newDateList[$i] = substr($dateList[$i]['ua_created_date'], 5 );
	}
	$data['dateList'] = $newDateList;
	$data['dataList'] = $dataList;
	$data['result'] = $result;
	$data['error'] = $error;
	header('Content-Type: application/json');
	echo json_encode($data);
?>
