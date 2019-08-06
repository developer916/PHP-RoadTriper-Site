<?php
	session_start();
    require_once("../common/DB_Connection.php");
    require_once("../common/functions.php");
    require_once("../common/dataLog.php");

    $result = "success";
    $error = "";
    $data = array();
    
    $pageId = $_POST['pageId'];
    $pageTitle = $_POST['pageTitle'];
    $pageContent = $_POST['pageContent'];
  	$userId = $_SESSION['UA_ADMIN_USER'];
  	
    if( $pageId == ""){
    	$uniqueLink = str_replace(" ", "-", strtolower($pageTitle) );
    	$uniqueLink = "/pages/".$uniqueLink;
    	$sql = "
			select *
			  from ua_page
			 where ua_unique_link like '$uniqueLink%'
			   and length( ua_unique_link ) <= length( '$uniqueLink' ) + 2    			
    			";
    	$dataResult = $db->queryArray( $sql );
    	if( count( $dataResult ) > 0 )
    		$uniqueLink .= count( $dataResult );
    	
    	$sql = "insert into ua_page( ua_title, ua_user,ua_content, ua_unique_link, ua_created_time, ua_updated_time)
    			 value( '$pageTitle', $userId, '".addslashes($pageContent)."', '', now(), now() )";
    	$db->queryInsert( $sql );
    	$pageId = $db->getPrevInsertId();
    	$uniqueLink .= "/".base64_encode( $pageId );
    	
    	$sql = "update ua_page set ua_unique_link = '$uniqueLink' where ua_page = $pageId";
    	$db->query( $sql );
    }else{
    	$sql = "update ua_page
    			   set ua_title = '$pageTitle'
    			     , ua_content = '".addslashes($pageContent)."'
    			     , ua_updated_time = now() 
    			 where ua_page = $pageId";
    	$db->query( $sql );
    }
    
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
