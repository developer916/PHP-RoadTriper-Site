<?php
	session_start();
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();
    
    $subCategoryId = $_POST['subCategoryId'];
    
	$sql = "select *
  			  from ua_location
			 where ua_place_subcategory = $subCategoryId
			   and ua_valid_yn = 'Y'";
    
    $placesList = $db->queryArray( $sql );
    if( $placesList == null )
    	$placesList = array( );
    
    $sql = "select * from ua_place_subcategory where ua_place_subcategory = $subCategoryId";
    $subCategoryTitle = $db->queryArray( $sql );
    $subCategoryMeta = $subCategoryTitle[0]['ua_meta_description'];
    $subCategoryTitle = $subCategoryTitle[0]['ua_name'];
    $data['subCategoryTitle'] = _lang($subCategoryTitle);
    $data['placesList'] = $placesList;
    $data['subCategoryMeta'] = $subCategoryMeta;
    
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
