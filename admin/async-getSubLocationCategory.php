<?php
	session_start();
    require_once("../common/DB_Connection.php");
    require_once("../common/functions.php");
    require_once("../common/dataLog.php");    

    $result = "success";
    $error = "";
    $data = array();

    $locationCategory = $_POST['locationCategory'];
    $sql = "select * from ua_place_subcategory where ua_place_category = '$locationCategory'";
    $subCategoryList = $db->queryArray( $sql );
    if( $subCategoryList == null )
    	$subCategoryList = array( );

    $data['subCategoryList'] = $subCategoryList;
    $data['result'] = $result;
    $data['error'] = $error;
    header('Content-Type: application/json');
    echo json_encode($data);    
?>
