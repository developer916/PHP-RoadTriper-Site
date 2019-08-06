<?php
	//by panda
	session_start();
	require_once("../common/DB_Connection.php");
    require_once("../common/functions.php");
	require_once("../common/dataLog.php");
	

    $result = "success";
    $error = "";
    $data = array();
    
    $strGuideIds = $_POST['strGuideIds'];
   	$guidetripId=$_POST['guidetripId'];
  
    
			    $sql = " delete from ua_trip_location where ua_trip_location in ($strGuideIds) and ua_trip_type='G'";
			    $db->query($sql);
	   
      
	    $sql="select ua_location_ind from ua_trip_location where ua_trip='".$guidetripId."' and ua_trip_type='G' order by ua_location_ind";
	    $indexLocation=$db->queryArray($sql);
	 	  for($i=0; $i<count($indexLocation); $i++)
		  {
      		  	 $j=$i+1; 
      		  	 $indexLocationind=$indexLocation[$i]['ua_location_ind'];
      		  	
		  		$sql="update ua_trip_location
		  			 set ua_location_ind='".$j."'
		  		     where ua_location_ind ='$indexLocationind' and ua_trip='".$guidetripId."' ";-
		  		$db->query($sql);
		  }
	    
	 $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
