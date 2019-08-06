<?php
	session_start();
    require_once("../common/DB_Connection.php");
    require_once("../common/functions.php");
    require_once("../common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    $categoryId = $_POST['categoryId'];
    $subcategoryId = $_POST['subcategoryId'];
    $subcategoryName = $_POST['subcategoryName'];
    $subcategoryImage = $_POST['subcategoryImage'];
    $subcategoryCode = $_POST['subcategoryCode'];
   	$metaDescription = $_POST['metaDescription'];
    
    
    if( $subcategoryId == ""){
    	$sql = "insert into ua_place_subcategory( ua_place_category , ua_name ,ua_subcategory_image , ua_subcategory_code, ua_meta_description, ua_created_time, ua_updated_time)
    	values('$categoryId' , '$subcategoryName', '$subcategoryImage', '$subcategoryCode', '$metaDescription', now(), now() )";
    	$db->queryInsert( $sql );    	
    }else{
    	$sql = "update ua_place_subcategory
    			   set ua_place_category = '$categoryId'
    			   	 , ua_name = '$subcategoryName'
    			   	 , ua_subcategory_image = '$subcategoryImage'
    			     , ua_subcategory_code = '$subcategoryCode'
    			     , ua_meta_description = '$metaDescription'
      			     , ua_updated_time = now() 
    			 where ua_place_subcategory = $subcategoryId";
    	$db->query( $sql );
    }

 
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
