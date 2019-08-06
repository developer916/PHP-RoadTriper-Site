<?php
	session_start();
require_once("../common/DB_Connection.php");
    require_once("../common/functions.php");
require_once("../common/dataLog.php");
	
    $result = "success";
    $error = "";
    $data = array();
    
    $guideId= $_POST['guideId'];
    $guidetripId = $_POST['guidetripId'];
    $tripname = $_POST['tripname'];
 
    
    
    if( $guidetripId == ""){
    	$sql = "insert into ua_guide_trip( ua_guide , ua_trip_title ,  ua_created_time, ua_updated_time)
    	values('$guideId' , '$tripname', now(), now() )";
    	$db->queryInsert( $sql );    	
    }else{
    	$sql = "update ua_guide_trip
    			   set ua_guide = '$guideId'
    			   	 , ua_trip_title = '$tripname'
    			   	 , ua_updated_time = now() 
    			 where ua_guide_trip = $guidetripId";
    	$db->query( $sql );
    }

 
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
