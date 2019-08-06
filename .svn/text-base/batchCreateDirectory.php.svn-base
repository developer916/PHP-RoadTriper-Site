<?php
    require_once("./common/DB_Connection.php");
    require_once("./common/functions.php");
    require_once("./common/dataLog.php");    

    $sql = "select * from ua_user";
    $dataResult = $db->queryArray( $sql );
    for( $i = 0 ; $i < count( $dataResult ); $i ++ ){
    	UA_createImageDirectory( $dataResult[$i]['ua_user'] );
    }
?>
