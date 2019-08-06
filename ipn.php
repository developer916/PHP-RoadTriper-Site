<?php  
	require_once("./common/config.php");
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");
	// read the post from PayPal system and add 'cmd' 
	$req = 'cmd=_notify-validate'; 
	
	foreach ($_POST as $key => $value) { 
	    $value = urlencode(stripslashes($value)); 
	    $req .= "&$key=$value"; 
	} 
	
	//post back to PayPal system to validate 
	$header = "POST /cgi-bin/webscr HTTP/1.1\r\n"; 
	$header .= "Content-Type: application/x-www-form-urlencoded\r\n"; 
	$header .= "Host: ".PAYPAL_SERVER."\r\n"; 
	$header .= "Connection: close\r\n"; 
	$header .= "Content-Length: " . strlen($req) . "\r\n\r\n"; 
	$fp = fsockopen ('ssl://'.PAYPAL_SERVER, 443, $errno, $errstr, 30); 

	//error connecting to paypal 
	if (!$fp) { 
	    // 
	} 
	//successful connection     
	if ($fp) { 
	    fputs ($fp, $header . $req); 
	     
	    while (!feof($fp)) { 
	        $res = fgets ($fp, 1024); 
	        $res = trim($res); //NEW & IMPORTANT 
	                 
	        if (strcmp($res, "VERIFIED") == 0) {
/* 				foreach ($_POST as $key => $value){
	        		logToFile("data.log", "$key => $value");
	        	} */
				
	            //insert order into database	        		            
	            $invoice = $_POST['invoice'];
	            $sql = "select * from ua_payment_history where ua_invoice = '$invoice'";
	            $dataPayment = $db->queryArray( $sql );
	            $dataPayment = $dataPayment[0];
	            
	            $userId = $dataPayment['ua_user'];
	            $amount = $dataPayment['ua_amount'];
	            $txnId = $_POST['txn_id'];
	            $paymentId = $dataPayment['ua_payment_history'];
	            $locationId = $dataPayment['ua_subject_id'];
	            
	            $sql = "update ua_payment_history
	            		   set ua_txn_id = '$txnId'
	            		   	 , ua_paid_yn = 'Y'
	            			 , ua_updated_time = now()
	            		 where ua_payment_history = $paymentId";
	            $db->query( $sql );
	            if( $dataPayment['ua_type'] == 1 ){
	            	$sql = "update ua_user
	            			   set ua_balance_amount = ua_balance_amount + $amount
	            		     where ua_user = $userId";
	            	$db->query( $sql );
	            }else if( $dataPayment['ua_type'] == 2 ){
	            	$sql = "update ua_location
	            			   set ua_valid_yn = 'Y'
	            			 where ua_location = $locationId";
	            	$db->query( $sql );
	            	
	            	$sql = "select * from ua_location where ua_location = $locationId";
	            	$locationTitle = $db->queryArray( $sql );
	            	$locationTitle = $locationTitle[0];
	            	$locationTitle = $locationTitle['ua_location_title'];
	            	
	            	$sql = "insert into ua_notification( ua_content, ua_description, ua_notification_type, ua_created_by, ua_created_time, ua_updated_time )
	            			 value('Place( $locationTitle ) is added!', $locationId, 2, $userId, now(), now())";
	            	$db->queryInsert( $sql );	            		            	
	            }else if( $dataPayment['ua_type'] == 3 ){
	            	$sql = "update ua_location
	            			   set ua_location_score = ua_location_score + 1
	            			 where ua_location = $locationId";
	            	$db->query( $sql );
	            }else if( $dataPayment['ua_type'] == 4 ){
			    	$sql = "update ua_location
			    			   set ua_top_last_time = if( ifnull(ua_top_last_time,'') < now(), date_add( now(), interval ".DURATION_LOCATION_UP_TO_TOP." day ), date_add( ua_top_last_time, interval ".DURATION_LOCATION_UP_TO_TOP." day ) )
			    			   	 , ua_top_time = now() 
			    			 where ua_location = $locationId";
			    	$db->query( $sql );
	            }
	        } 
	     
	        if (strcmp ($res, "INVALID") == 0) { 
	            //insert into DB in a table for bad payments for you to process later 
	        } 
	    } 
	
	    fclose($fp); 
	} 

?> 