<?php
	session_start();
require_once("../common/DB_Connection.php");
require_once("../common/functions.php");
require_once("../common/dataLog.php");
	    

    $result = "success";
    $error = "";
    $data = array();
    
    $guideId= $_POST['guideId'];
    $guidetripId = $_POST['guidebucketId'];
    $tripname = $_POST['bucketname'];
 
    if( $guidetripId == ""){
    	$sql = "insert into ua_guide_bucket( ua_guide , ua_bucket_title ,  ua_created_time, ua_updated_time)
    	values('$guideId' , '$tripname', now(), now() )";
    	$db->queryInsert( $sql );    	
    }else{
    	$sql = "update ua_guide_bucket
    			   set ua_guide = '$guideId'
    			   	 , ua_bucket_title = '$tripname'
    			   	 , ua_updated_time = now() 
    			 where ua_guide_bucket = $guidetripId";
    	$db->query( $sql );
    }

 
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
