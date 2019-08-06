<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $eyeCategoryId = $_POST['eyeCategoryId'];
    $cntLoaded = $_POST['cntLoaded'];
    $cntLazyLoad = CNT_LAZY_PIN;
        
	$sql = "select t1.*, t2.ua_category_marker
			  from ua_location t1, ua_eye_category t2
			 where t1.ua_location_type = 5
			   and t1.ua_eye_category = $eyeCategoryId
			   and t1.ua_eye_category = t2.ua_eye_category
			 order by t1.ua_location";

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
	
	$eyeList = $db->queryArray($sql);
	
	if( $eyeList == null )
		$eyeList = array( );
	
    $data['eyeList'] = $eyeList;
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);
?>
