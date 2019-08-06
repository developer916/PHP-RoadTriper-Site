<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    $placeCategory = $_POST['placeCategory'];
    $placeSubCategory = $_POST['placeSubCategory'];
    $findPlacesUaBucketId = $_POST['findPlacesUaBucketId'];
    $cntLoaded = $_POST['cntLoaded'];
    $cntLazyLoad = CNT_LAZY_PIN;
    if( isset($findPlacesUaBucketId) ){
    	$sql ="
    		   select r3.*
    		     from ua_user_bucket r1, ua_bucket_location r2, ua_location r3 
    			where r1.ua_user_bucket = $findPlacesUaBucketId
    			  and r1.ua_user_bucket = r2.ua_bucket
    			  and r2.ua_location = r3.ua_location
    			  and r2.ua_bucket_type = 'U'
    			  and r3.ua_valid_yn = 'Y'";
    	$sql = "
    		select *
    		  from(
    		 	select t.*, @rownum := @rownum + 1 AS rownum
    			  from (
    				$sql
    				) t, (select @rownum := 0 ) r
    			) tt
    		 where tt.rownum > $cntLoaded
    		 limit $cntLazyLoad";	    	
	}else{
	    $sql = "
			select t2.*, t4.ua_category_image, t4.ua_category_marker
			  from ua_location t2, ua_place_subcategory t3, ua_place_category t4
			 where t2.ua_place_subcategory = $placeSubCategory
			   and t2.ua_place_subcategory = t3.ua_place_subcategory
			   and t4.ua_place_category = t3.ua_place_category
			   and t2.ua_valid_yn = 'Y'
	         order by t2.ua_location";
	    
	    $sql = "
	    	select *
	    	  from(
	    		select t.*, @rownum := @rownum + 1 AS rownum
	    		  from (
	    			$sql
	    		) t, (select @rownum := 0 ) r
	    	) tt
	    	 where tt.rownum > $cntLoaded
	    	 limit $cntLazyLoad";	    	    
    }
    $dataSubCategoryLocation = $db->queryArray($sql);
    if( $dataSubCategoryLocation == null )
    	$dataSubCategoryLocation = array( );
    $data['locationInfo'] = $dataSubCategoryLocation;
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
