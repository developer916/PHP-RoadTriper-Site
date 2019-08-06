<?php
	session_start();
	require_once("../common/DB_Connection.php");
    require_once("../common/functions.php");
	require_once("../common/dataLog.php");
	   

    $result = "success";
    $error = "";
    $data = array();
    
    $guidebucketId= $_POST['guidebucketId'];
    $guidebucketLocationId = $_POST['guidebucketLocationId'];
    $locationId=$_POST['locationId'];
    $location = $_POST['location'];
   
   
    
    
    if( $guidebucketLocationId == ""){
    	$sql = "insert into ua_bucket_location( ua_bucket , ua_bucket_type , ua_location, ua_created_time, ua_updated_time)
    	values('$guidebucketId' , 'G', '$locationId', now(), now() )";
    	$db->queryInsert( $sql );    	
    }else{
    	$sql = "update ua_bucket_location
    			   set ua_bucket = '$guidebucketId'
    			   	 , ua_bucket_type = 'G'
    			     , ua_location = '$locationId'
    			     
      			     , ua_updated_time = now() 
    			 where ua_bucket_location = $guidebucketLocationId";
    	$db->query( $sql );
    }

 
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
