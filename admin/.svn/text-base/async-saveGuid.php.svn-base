<?php  session_start();
require_once("../common/DB_Connection.php");
require_once("../common/functions.php");
require_once("../common/dataLog.php");

$result = "success";
$error = "";
$data = array();

$guideId = $_POST['guideId'];
$guideName = $_POST['guideName'];

if( $guideId == ""){
	$sql = "insert into ua_guide( ua_guide, ua_guide_title,ua_created_time, ua_updated_time)
	value('$guideId', '$guideName',now(), now() )";
	$db->queryInsert( $sql );
}else{
	$sql = "update ua_guide
	set ua_guide_title = '$guideName'
	, ua_updated_time = now()
	where ua_guide = $guideId";
	$db->query( $sql );
}


$data['result'] = $result;
$data['error'] = $error;
header('Content-Type: application/json');
echo json_encode($data);
?>
