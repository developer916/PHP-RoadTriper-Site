<?php
	session_start();
require_once("../common/DB_Connection.php");
    require_once("../common/functions.php");
require_once("../common/dataLog.php");
	
    $result = "success";
    $error = "";
    $data = array();
    
    $guidetripId= $_POST['guidetripId'];
    $guidetripLocationId = $_POST['guidetripLocationId'];
    $triplocationtype = $_POST['triplocationtype'];
    $location = $_POST['location'];
    $locationind=$_POST['locationind'];
    $locationId=$_POST['locationId'];
    $previousind=$_POST['previousind'];
   
    $sql="select ua_location_ind from ua_trip_location where ua_trip='".$guidetripId."'";
    $insertLocation=$db->queryArray($sql);
     
  if($previousind=="") 
 	{
			
			for( $i = 0; $i < count($insertLocation); $i ++ )
				{
					if($insertLocation[$i]['ua_location_ind'] == $locationind)
		
					{
						$sql="update ua_trip_location
						   set  ua_location_ind=ua_location_ind+1
						    where ua_location_ind >= '$locationind'";
						$db->query($sql);
					
					}	
				}	
					
				 $sql = "insert into ua_trip_location( ua_trip , ua_trip_type , ua_location,ua_location_ind, ua_created_time, ua_updated_time)
					values('$guidetripId' , 'G', '$locationId', '$locationind', now(), now() )";
					
					$db->queryInsert( $sql );
		 	
 	}
   
   else 
   {
		   
		    for( $i = 0; $i < count($insertLocation); $i ++ )
		    {	 
			    	if($insertLocation[$i]['ua_location_ind'] == $locationind)
			    	{
	    				if($previousind > $locationind)
					    		{
					    			$sql="delete from ua_trip_location where ua_location_ind='$previousind' ";
					    			$db->query($sql);
					    			
					    			$sql="update ua_trip_location
					    			     set  ua_location_ind=ua_location_ind+1
					    			     where ua_location_ind >= '$locationind' and ua_location_ind <'$previousind'";
					    			  $db->query($sql);
					    			 
					    			  $sql = "insert into ua_trip_location( ua_trip , ua_trip_type , ua_location,ua_location_ind, ua_created_time, ua_updated_time)
					    			  values('$guidetripId' , 'G', '$locationId', '$locationind', now(), now() )";
					    			  $db->queryInsert( $sql );
					    		}
			    	 if($previousind < $locationind)
			    				{
						    			$sql="delete from ua_trip_location where ua_location_ind='$previousind' ";
						    			$db->query($sql);
						    			
						    			$sql="update ua_trip_location
						    					set  ua_location_ind=ua_location_ind-1
						    					where ua_location_ind > '$previousind' and ua_location_ind <= '$locationind'";
						    			$db->query($sql);
						    			
						    			$sql = "insert into ua_trip_location( ua_trip , ua_trip_type , ua_location,ua_location_ind, ua_created_time, ua_updated_time)
						    			values('$guidetripId' , 'G', '$locationId', '$locationind', now(), now() )";
						    			$db->queryInsert( $sql );
			    			 
			    			}
					if($previousind == $locationind)
			    	 { 
			    	 	$sql = "update ua_trip_location
			    				   set ua_trip = '$guidetripId'
			    			   		 , ua_trip_type = 'G'
			    			     	, ua_location = '$locationId'
			    			     	, ua_location_ind = '$locationind'
			      			     	, ua_updated_time = now() 
			    			 	where ua_trip_location = $guidetripLocationId";
			    	       $db->query( $sql );
    				}
			  }
  		}
  }
  
    
 
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
